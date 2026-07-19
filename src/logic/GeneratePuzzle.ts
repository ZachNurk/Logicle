import type { ProofNode } from "./ProofNode";
import {
  sameNode,
  ERROR_NODE,
  negateNode,
  createImplicationNode,
  createOrNode,
  createAndNode,
  createIffNode,
  isAtomNode,
  isNotNode,
  isAndNode,
  isOrNode,
  isImplicationNode,
  isIffNode,
} from "./ProofNode";
import type { BinaryNode } from "./ProofNode";
import { conditionalIdentityImplication, Axioms } from "./Axiom";

export type EndlessPuzzlePayload = {
  id?: string;
  nodes: ProofNode[];
  solution: ProofNode;
  /** Forward-order guide for "Give Up" assist: apply step[i].output after
   * highlighting step[i].inputIds, in order, to walk from givens to solution. */
  solutionSteps: SolutionStep[];
};

/** One forward-solving step, derived by reversing the puzzle's generation trace. */
export type SolutionStep = {
  /** Axiom.ts id to highlight (e.g. "MP", "HS"); "" if no direct mapping exists. */
  axiomId: string;
  ruleName: string;
  /** Human-readable rule name for display (e.g. "Disjunctive Syllogism"). */
  ruleLabel: string;
  /** Ids of the node(s) to highlight — the inputs a real solve would select. */
  inputIds: string[];
  /** The resulting node to add to givens (already fully formed). */
  output: ProofNode;
};

/** Rules with no direct Axiom.ts entry (commutativity is applied implicitly
 * elsewhere in the game, not as a selectable button) — spelled out by hand. */
const RULE_LABEL_FALLBACK: Record<string, string> = {
  revComm: "Commutativity",
};

function ruleLabelFor(ruleName: string, axiomId: string): string {
  const axiom = Axioms.find((a) => a.id === axiomId);
  return axiom?.text ?? RULE_LABEL_FALLBACK[ruleName] ?? ruleName;
}

/**
 * Drops steps whose output is never actually used — either as another step's
 * input or as the final solution. The generator sometimes wanders into a
 * round trip (e.g. Addition immediately undone later by Idempotent) that's
 * valid but contributes nothing to reaching the solution; a backward pass
 * over the already topologically-ordered step list removes those in one go.
 */
function pruneDeadSteps(steps: SolutionStep[]): SolutionStep[] {
  if (steps.length === 0) return steps;

  const needed = new Set<string>([steps[steps.length - 1].output.id]);
  const kept: SolutionStep[] = [];

  for (let i = steps.length - 1; i >= 0; i -= 1) {
    const step = steps[i];
    if (!needed.has(step.output.id)) continue;
    kept.push(step);
    for (const id of step.inputIds) needed.add(id);
  }

  return kept.reverse();
}

export type ReverseRule = (node: ProofNode) => boolean;

/** Maps a reverse-generation rule's function name to the forward Axiom.ts id
 * that undoes it, so the "Give Up" assist can highlight the matching button. */
const RULE_TO_AXIOM_ID: Record<string, string> = {
  revMP: "MP",
  revMT: "MT",
  revSimp: "Simp",
  revAbso: "Abs",
  revIndempotent: "Idem",
  revHS: "HS",
  revCD: "CD",
  revImplication: "32",
  revConditionalIdentityImplication: "C (→)",
  revContrapositive: "CP",
  revDS: "DS",
  revConj: "Conj",
  revAndAssociativity: "Asso",
  revOrAssociativity: "Asso",
  revDistributivity: "Dist",
  revDeMorgan: "DM",
  revAdd: "Add",
  revConditionalIdentityOr: "C (→)",
  revConditionalIdentityIff: "CI (↔)",
};

const NODE_CHARACTER_CAP = 18;
const TOTAL_CHARACTER_CAP = NODE_CHARACTER_CAP * 4 * 0.55;
const NEGATION_PROBABILITY = 0.1;
const IF_PROBABILITY = 0.2;
const ATOM_PROBABILITY = 0.35;
const OR_PROBABILITY = 0.15;
const IFF_PROBABILITY = 0.1;
const AND_PROBABILITY = 0.2;
const MAX_STEP_DEPTH = 7;
const MIN_STEP_DEPTH = 4;
const MIN_GIVEN_SIZE = 3;
const MAX_GIVEN_SIZE = 4;
const MAX_GENERATION_STEPS = MAX_STEP_DEPTH + 10;

/** Relative weights for reverse-rule selection (medium difficulty). Higher = more likely. */
const REV_MP_WEIGHT = 2;
const REV_MT_WEIGHT = 2;
const REV_SIMP_WEIGHT = 5;
const REV_ABSO_WEIGHT = 5;
const REV_INDEPENDENT_WEIGHT = 4;
const REV_HS_WEIGHT = 6;
const REV_CD_WEIGHT = 7;
const REV_IMPLICATION_WEIGHT = 6;
const REV_CONDITIONAL_IDENTITY_IMPLICATION_WEIGHT = 5;
const REV_CONTRAPOSITIVE_WEIGHT = 6;
const REV_DS_WEIGHT = 5;
const REV_CONJ_WEIGHT = 6;
const REV_AND_ASSOCIATIVITY_WEIGHT = 5;
const REV_DISTRIBUTIVITY_WEIGHT = 7;
const REV_DE_MORGAN_WEIGHT = 7;
const REV_ADD_WEIGHT = 4;
const REV_OR_ASSOCIATIVITY_WEIGHT = 5;
const REV_CONDITIONAL_IDENTITY_OR_WEIGHT = 5;
const REV_CONDITIONAL_IDENTITY_IFF_WEIGHT = 5;

type WeightedReverseRule = { rule: ReverseRule; weight: number };

const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
] as const;

type NodesSet = Set<ProofNode>;

/** All current premise nodes (final puzzle givens). */
let curNodes: NodesSet = new Set<ProofNode>();
/** Nodes to expand on this step; cleared each step, then filled with children. */
let frontier: NodesSet = new Set<ProofNode>();
/** Incremented after each successful reverse rule during generation. */
let ruleLogIndex = 0;

type RawGenerationStep = { removed: ProofNode; added: ProofNode[]; ruleName: string };
/** Chronological trace of reverse-rule applications this generation; reversed
 * (and remapped) into forward-order `solutionSteps` for the "Give Up" assist. */
let generationSteps: RawGenerationStep[] = [];
/** Set by `replaceNode` on success so `doInvOperation` can record the step. */
let lastReplaceRemoved: ProofNode | null = null;
let lastReplaceAdded: ProofNode[] | null = null;

function totalGivenChars(): number {
  let sum = 0;
  for (const n of curNodes) sum += n.text.length;
  return sum;
}

function collectAtomLetters(node: ProofNode, used: Set<string>): void {
  if (isAtomNode(node)) {
    if (node.text.length === 1) used.add(node.text);
    return;
  }
  if (isNotNode(node)) {
    collectAtomLetters(node.contains, used);
    return;
  }
  if (
    isAndNode(node) ||
    isOrNode(node) ||
    isImplicationNode(node) ||
    isIffNode(node)
  ) {
    collectAtomLetters(node.left, used);
    collectAtomLetters(node.right, used);
  }
}

function getUsedLetters(): Set<string> {
  const used = new Set<string>();
  for (const node of curNodes) collectAtomLetters(node, used);
  return used;
}

function replaceNode(node: ProofNode, ...added: ProofNode[]): boolean {
  if (!added.every((n) => n.text.length <= NODE_CHARACTER_CAP)) return false;

  const afterReplace =
    totalGivenChars() -
    node.text.length +
    added.reduce((s, n) => s + n.text.length, 0);
  if (afterReplace > TOTAL_CHARACTER_CAP) return false;

  curNodes.delete(node);
  for (const n of added) {
    curNodes.add(n);
    frontier.add(n);
  }
  lastReplaceRemoved = node;
  lastReplaceAdded = added;
  return true;
}

function generateAtom(canNegate: boolean = true): ProofNode {
  const used = getUsedLetters();
  const available = ALPHABET.filter((letter) => !used.has(letter));
  if (available.length === 0) {
    throw new Error("No letters left in alphabet set");
  }

  const letter =
    available[Math.floor(Math.random() * available.length)];

  const atom = {
    id: crypto.randomUUID(),
    text: letter,
    selected: false,
    isStarter: true,
    parentIds: [],
    context: false,
  } as ProofNode;

  if (canNegate && Math.random() < NEGATION_PROBABILITY) {
    return negateNode(false, atom, undefined, true);
  }
  return atom;
}

function chooseRelationship() {
  const roll = Math.random();
  let cursor = 0;

  cursor += IF_PROBABILITY;
  if (roll < cursor) return "If";
  cursor += ATOM_PROBABILITY;
  if (roll < cursor) return "Atom";
  cursor += OR_PROBABILITY;
  if (roll < cursor) return "Or";
  cursor += IFF_PROBABILITY;
  if (roll < cursor) return "Iff";
  cursor += AND_PROBABILITY;
  if (roll < cursor) return "And";
  return "And";
}

export function generateSolutionNode(): ProofNode {
  while (true) {
    const relationship = chooseRelationship();
    let solutionNode: ProofNode = ERROR_NODE;
    switch (relationship) {
      case "If": {
        const left = generateAtom();
        const right = generateAtom();
        solutionNode = createImplicationNode(
          false,
          left,
          right,
          undefined,
          true,
        );
        break;
      }
      case "Atom":
        solutionNode = generateAtom();
        break;
      case "Or": {
        const left = generateAtom();
        const right = generateAtom();
        solutionNode = createOrNode(false, left, right, undefined, true);
        break;
      }
      case "Iff": {
        const left = generateAtom();
        const right = generateAtom();
        solutionNode = createIffNode(false, left, right, undefined, true);
        break;
      }
      case "And": {
        const left = generateAtom();
        const right = generateAtom();
        solutionNode = createAndNode(false, left, right, undefined, true);
        break;
      }
    }
    if (solutionNode.text.length <= NODE_CHARACTER_CAP) {
      curNodes.add(solutionNode);
      frontier.add(solutionNode);
      return solutionNode;
    }
  }
}

function refillFrontierIfNeeded(): void {
  if (frontier.size > 0 || curNodes.size >= MIN_GIVEN_SIZE) return;
  for (const node of curNodes) {
    if (node.text.length <= NODE_CHARACTER_CAP) frontier.add(node);
  }
}

function doInvOperation(node: ProofNode) {
  const rules = getWeightedReverseRulesForNode(node);
  const maxAttempts = rules.length * 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rule = pickWeightedRule(rules);
    lastReplaceRemoved = null;
    lastReplaceAdded = null;
    if (rule(node)) {
      ruleLogIndex += 1;
      if (lastReplaceRemoved && lastReplaceAdded) {
        generationSteps.push({
          removed: lastReplaceRemoved,
          added: lastReplaceAdded,
          ruleName: rule.name,
        });
      }
      return;
    }
  }
}

export function generateEndlessPuzzle(): EndlessPuzzlePayload {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const payload = generateEndlessPuzzleOnce();
    if (payload.nodes.length >= MIN_GIVEN_SIZE) return payload;
  }
  return generateEndlessPuzzleOnce();
}

function generateEndlessPuzzleOnce(): EndlessPuzzlePayload {
  ruleLogIndex = 0;
  curNodes.clear();
  frontier.clear();
  generationSteps = [];

  const payLoad: EndlessPuzzlePayload = {
    id: undefined,
    nodes: [],
    solution: ERROR_NODE,
    solutionSteps: [],
  };

  payLoad.solution = generateSolutionNode();

  const numSteps =
    Math.floor(Math.random() * (MAX_STEP_DEPTH - MIN_STEP_DEPTH + 1)) +
    MIN_STEP_DEPTH;

  for (
    let i = 0;
    (i < numSteps || curNodes.size < MIN_GIVEN_SIZE) &&
    i < MAX_GENERATION_STEPS;
    i += 1
  ) {
    if (curNodes.size >= MAX_GIVEN_SIZE) break;

    refillFrontierIfNeeded();
    if (frontier.size === 0) break;

    const nodesThisStep = Array.from(frontier);
    frontier.clear();

    for (const node of nodesThisStep) {
      if (node.text.length > NODE_CHARACTER_CAP) continue;
      doInvOperation(node);
      if (curNodes.size >= MAX_GIVEN_SIZE) break;
    }

    if (curNodes.size >= MIN_GIVEN_SIZE && i + 1 >= numSteps) break;
    if (frontier.size === 0 && curNodes.size >= MIN_GIVEN_SIZE) break;
  }

  payLoad.nodes = Array.from(curNodes).map((node) => ({
    ...node,
    selected: false,
    isStarter: true,
    context: false,
    parents: [],
  }));

  for (let i = payLoad.nodes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [payLoad.nodes[i], payLoad.nodes[j]] = [payLoad.nodes[j], payLoad.nodes[i]];
  }

  // Generation walks solution → givens via reverse rules; reversing that
  // trace gives the forward givens → solution order the assist plays back.
  const forwardSteps: SolutionStep[] = generationSteps
    .slice()
    .reverse()
    .map((step) => {
      const axiomId = RULE_TO_AXIOM_ID[step.ruleName] ?? "";
      return {
        axiomId,
        ruleName: step.ruleName,
        ruleLabel: ruleLabelFor(step.ruleName, axiomId),
        inputIds: step.added.map((n) => n.id),
        output: step.removed,
      };
    });

  payLoad.solutionSteps = pruneDeadSteps(forwardSteps);

  return payLoad;
}

/** Run one reverse rule in isolation (for tests). Restores generator state afterward. */
export function runReverseRule(
  rule: ReverseRule,
  node: ProofNode,
): ProofNode[] | false {
  const savedCur = new Set(curNodes);
  const savedFrontier = new Set(frontier);
  const savedRuleLog = ruleLogIndex;
  curNodes.clear();
  frontier.clear();
  curNodes.add(node);
  try {
    const ok = rule(node);
    return ok ? Array.from(curNodes) : false;
  } finally {
    curNodes = savedCur;
    frontier = savedFrontier;
    ruleLogIndex = savedRuleLog;
  }
}

/** [(p → q) ∧ (q → r)] → (p → r) */
export function revHS(node: ProofNode): boolean {
  if (!isImplicationNode(node)) return false;
  const joiner = generateAtom();
  const nodeA = createImplicationNode(
    false,
    node.left,
    joiner,
    undefined,
    true,
  );
  const nodeB = createImplicationNode(
    false,
    joiner,
    node.right,
    undefined,
    true,
  );
  return replaceNode(node, nodeA, nodeB);
}

/** Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q */
export function revDS(node: ProofNode): boolean {
  const joiner = generateAtom();
  const negJoiner = negateNode(false, joiner, undefined, true);
  const nodeA = createOrNode(false, joiner, node, undefined, true);
  return replaceNode(node, negJoiner, nodeA);
}

/** from P and (P -> Q), infer Q */
export function revMP(node: ProofNode): boolean {
  const joiner = generateAtom();
  const nodeB = createImplicationNode(false, joiner, node, undefined, true);
  return replaceNode(node, joiner, nodeB);
}

/** Modus Tollens: [¬q ∧ (p → q)] → ¬p */
export function revMT(node: ProofNode): boolean {
  const joiner = generateAtom();
  const negJoiner = negateNode(false, joiner, undefined, true);
  const negOriginal = negateNode(false, node);
  const nodeB = createImplicationNode(
    false,
    negOriginal,
    joiner,
    undefined,
    true,
  );
  return replaceNode(node, negJoiner, nodeB);
}

/** Simplification: (p ∧ q) → p */
export function revSimp(node: ProofNode): boolean {
  const joiner = generateAtom();
  const nodeA = createAndNode(false, node, joiner, undefined, true);
  return replaceNode(node, nodeA);
}

/** Constructive Dilemma (OR): [(p → q) ∧ (r → s)] → [(p ∨ r) → (q ∨ s)] */
function revCDOr(node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isOrNode(node.left) || !isOrNode(node.right))
    return false;
  const antecedentLeft = node.left.left;
  const antecedentRight = node.left.right;
  const consequentLeft = node.right.left;
  const consequentRight = node.right.right;

  const newAndNodeLeft = createImplicationNode(
    false,
    antecedentLeft,
    consequentLeft,
    undefined,
    true,
  );
  const newAndNodeRight = createImplicationNode(
    false,
    antecedentRight,
    consequentRight,
    undefined,
    true,
  );

  return replaceNode(
    node,
    createAndNode(false, newAndNodeLeft, newAndNodeRight, undefined, true),
  );
}

/** Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)] */
function revCDAnd(node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isAndNode(node.left) || !isAndNode(node.right))
    return false;
  const antecedentLeft = node.left.left;
  const antecedentRight = node.left.right;
  const consequentLeft = node.right.left;
  const consequentRight = node.right.right;

  const newAndNodeLeft = createImplicationNode(
    false,
    antecedentLeft,
    consequentLeft,
    undefined,
    true,
  );
  const newAndNodeRight = createImplicationNode(
    false,
    antecedentRight,
    consequentRight,
    undefined,
    true,
  );

  return replaceNode(
    node,
    createAndNode(false, newAndNodeLeft, newAndNodeRight, undefined, true),
  );
}

/** Constructive Dilemma: [(p → q) ∧ (r → s)] → [(p ⋄ r) → (q ⋄ s)] where ⋄ is OR or AND. */
export function revCD(node: ProofNode): boolean {
  return revCDOr(node) || revCDAnd(node);
}

/** Disjuncts revAdd may drop when undoing addition — atoms and negated atoms only. */
function isRevAddRemovable(node: ProofNode): boolean {
  return isAtomNode(node) || isNotNode(node);
}

/**
 * Reverse addition: (p ∨ q) → p. Only the right disjunct may be dropped —
 * forward `addition()` always reconstructs as Or(original, addition), so the
 * kept node must stay in the left slot to match text order on replay. If only
 * the left side qualifies as a droppable atom/not-node, the rule doesn't
 * apply (dropping it would keep the right side in the left slot and produce
 * an unreconstructable order).
 */
export function revAdd(node: ProofNode): boolean {
  if (!isOrNode(node)) return false;
  if (!isRevAddRemovable(node.right)) return false;

  return replaceNode(node, node.left);
}

/** Conjunction: p → (p ∧ q) */
export function revConj(node: ProofNode): boolean {
  if (!isAndNode(node)) return false;
  return replaceNode(node, node.left, node.right);
}

/**
 * Absorption:
 * - P ∨ (P ∧ Q) ≡ P
 * (and symmetric variants where the repeated P is on the right side).
 */
export function revAbso(node: ProofNode): boolean {
  if (
    isAndNode(node) &&
    node.left &&
    node.right &&
    (isAndNode(node.left) ||
      isAndNode(node.right) ||
      isOrNode(node.left) ||
      isOrNode(node.right))
  ) {
    return false;
  }

  const absorbedNode = generateAtom();
  const absorbedAnd = createAndNode(false, node, absorbedNode, undefined, true);
  return replaceNode(node, createOrNode(false, absorbedAnd, node, undefined, true));
}

/**
 * Reverse AND associativity: (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C) and
 * ((A ∧ B) ∧ C) → (A ∧ (B ∧ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revAndAssociativity(node: ProofNode): boolean {
  if (!isAndNode(node) || !node.left || !node.right) return false;

  const { left, right } = node;
  // Forward andAssociativity checks its left child first: if we reassoc from
  // the left branch while left.left is itself an And node, forward would
  // wrongly re-collapse through left.left instead of reconstructing this
  // node, so that case must be excluded.
  const canReassocFromLeft = isAndNode(left) && !isAndNode(left.left);
  const canReassocFromRight = isAndNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return false;

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  if (useLeftBranch) {
    if (!isAndNode(left)) return false;
    const inner = createAndNode(false, left.right, right, undefined, true);
    return replaceNode(node, createAndNode(false, left.left, inner, undefined, true));
  }

  if (!isAndNode(right)) return false;
  const inner = createAndNode(false, left, right.left, undefined, true);
  return replaceNode(node, createAndNode(false, inner, right.right, undefined, true));
}

/**
 * Reverse OR associativity: (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C) and
 * ((A ∨ B) ∨ C) → (A ∨ (B ∨ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revOrAssociativity(node: ProofNode): boolean {
  if (!isOrNode(node) || !node.left || !node.right) return false;

  const { left, right } = node;
  // Same left-priority hazard as revAndAssociativity, mirrored for Or.
  const canReassocFromLeft = isOrNode(left) && !isOrNode(left.left);
  const canReassocFromRight = isOrNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return false;

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  if (useLeftBranch) {
    if (!isOrNode(left)) return false;
    const inner = createOrNode(false, left.right, right, undefined, true);
    return replaceNode(node, createOrNode(false, left.left, inner, undefined, true));
  }

  if (!isOrNode(right)) return false;
  const inner = createOrNode(false, left, right.left, undefined, true);
  return replaceNode(node, createOrNode(false, inner, right.right, undefined, true));
}

/**
 * Reverse distributivity (simple cases only):
 * (A ∨ B) ∧ (A ∨ C) → A ∨ (B ∧ C) and (A ∧ B) ∨ (A ∧ C) → A ∧ (B ∨ C).
 */
export function revDistributivity(node: ProofNode): boolean {
  function sharedBinaryParts(
    left: BinaryNode,
    right: BinaryNode,
  ): { shared: ProofNode; other1: ProofNode; other2: ProofNode } | null {
    for (const s1 of [left.left, left.right] as const) {
      for (const s2 of [right.left, right.right] as const) {
        if (sameNode(s1, s2)) {
          const other1 = sameNode(left.left, s1) ? left.right : left.left;
          const other2 = sameNode(right.left, s2) ? right.right : right.left;
          return { shared: s1, other1, other2 };
        }
      }
    }
    return null;
  }

  if (isAndNode(node) && isOrNode(node.left) && isOrNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = createAndNode(false, parts.other1, parts.other2, undefined, true);
      return replaceNode(node, createOrNode(false, parts.shared, bc, undefined, true));
    }
  } else if (isOrNode(node) && isAndNode(node.left) && isAndNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = createOrNode(false, parts.other1, parts.other2, undefined, true);
      return replaceNode(node, createAndNode(false, parts.shared, bc, undefined, true));
    }
  }

  return false;
}

/** [P V P] = P */
export function revIndempotent(node: ProofNode): boolean {
  return replaceNode(node, createOrNode(false, node, node, undefined, true));
}

export function revDeMorgan(node: ProofNode): boolean {
  if ((!isAndNode(node) && !isOrNode(node)) || !node.left || !node.right) return false;

  const newLeft = negateNode(false, node.left, undefined, true);
  const newRight = negateNode(false, node.right, undefined, true);

  if (isAndNode(node)) {
    const inner = createOrNode(false, newLeft, newRight, undefined, true);
    return replaceNode(node, negateNode(false, inner, undefined, true));
  }

  const inner = createAndNode(false, newLeft, newRight, undefined, true);
  return replaceNode(node, negateNode(false, inner, undefined, true));
}

export function revContrapositive(node: ProofNode): boolean {
  if (!isImplicationNode(node)) return false;
  const newLeft = negateNode(false, node.right, undefined, true);
  const newRight = negateNode(false, node.left, undefined, true);
  return replaceNode(node, createImplicationNode(false, newLeft, newRight, undefined, true));
}

export function revConditionalIdentityImplication(node: ProofNode): boolean {
  if (!isImplicationNode(node)) return false;
  const newNode = conditionalIdentityImplication(node);
  if (sameNode(newNode, ERROR_NODE)) return false;
  return replaceNode(node, newNode);
}

export function revConditionalIdentityOr(node: ProofNode): boolean {
  if (!isOrNode(node)) return false;
  const newNode = conditionalIdentityImplication(node);
  if (sameNode(newNode, ERROR_NODE)) return false;
  return replaceNode(node, newNode);
}

/**
 * Reverse Conditional Identity (↔): p ↔ q → (p → q) ∧ (q → p) — mirrors
 * forward `conditionalIdentityIff`'s AndNode-of-two-implications case so a
 * single forward call can reconstruct the Iff.
 */
export function revConditionalIdentityIff(node: ProofNode): boolean {
  if (!isIffNode(node) || !node.left || !node.right) return false;
  const pImplQ = createImplicationNode(false, node.left, node.right, undefined, true);
  const qImplP = createImplicationNode(false, node.right, node.left, undefined, true);
  return replaceNode(node, createAndNode(false, pImplQ, qImplP, undefined, true));
}

export function revImplication(node: ProofNode): boolean {
  if (!isImplicationNode(node) && !isAndNode(node)) return false;

  let resNode: ProofNode | null = null;
  if (isImplicationNode(node)) {
    if (isOrNode(node.left)) {
      const newLeft = createImplicationNode(
        false,
        node.left.left,
        node.right,
        undefined,
        true,
      );
      const newRight = createImplicationNode(
        false,
        node.left.right,
        node.right,
        undefined,
        true,
      );
      resNode = createAndNode(false, newLeft, newRight, undefined, true);
    } else if (isAndNode(node.right) && !sameNode(node.right.left, node.right.right)) {
      // Forward implication()'s AndNode dispatch checks common-consequent
      // (case 1) before common-antecedent (case 2). If B and C are equal,
      // the two synthesized implications A→B and A→C become identical, so
      // forward would spuriously match case 1 instead of reconstructing
      // A→(B∧C) — skip this branch in that degenerate case.
      const newLeft = createImplicationNode(
        false,
        node.left,
        node.right.left,
        undefined,
        true,
      );
      const newRight = createImplicationNode(
        false,
        node.left,
        node.right.right,
        undefined,
        true,
      );
      resNode = createAndNode(false, newLeft, newRight, undefined, true);
    }
  } else if (
    isAndNode(node) &&
    isImplicationNode(node.left) &&
    isImplicationNode(node.right)
  ) {
    if (sameNode(node.left.left, node.right.left)) {
      const newRight = createAndNode(
        false,
        node.left.right,
        node.right.right,
        undefined,
        true,
      );
      resNode = createImplicationNode(
        false,
        node.left.left,
        newRight,
        undefined,
        true,
      );
    } else if (
      sameNode(node.left.right, node.right.right) &&
      !isAndNode(node.left.right)
    ) {
      // Forward implication()'s ImplicationNode dispatch checks for an
      // AndNode on the right (case 3) before an OrNode on the left (case 4).
      // If the shared consequent C is itself an AndNode, forward would
      // misfire into case 3 instead of reconstructing (A∨B)→C — skip this
      // branch in that degenerate case.
      const newLeft = createOrNode(
        false,
        node.left.left,
        node.right.left,
        undefined,
        true,
      );
      resNode = createImplicationNode(
        false,
        newLeft,
        node.left.right,
        undefined,
        true,
      );
    }
  }

  return resNode ? replaceNode(node, resNode) : false;
}

const ATOM_RULES: WeightedReverseRule[] = [
  { rule: revMP, weight: REV_MP_WEIGHT },
  { rule: revMT, weight: REV_MT_WEIGHT },
  { rule: revSimp, weight: REV_SIMP_WEIGHT },
  { rule: revAbso, weight: REV_ABSO_WEIGHT },
  { rule: revIndempotent, weight: REV_INDEPENDENT_WEIGHT },
];
const IMPLICATION_RULES: WeightedReverseRule[] = [
  ...ATOM_RULES,
  { rule: revHS, weight: REV_HS_WEIGHT },
  { rule: revCD, weight: REV_CD_WEIGHT },
  { rule: revImplication, weight: REV_IMPLICATION_WEIGHT },
  { rule: revConditionalIdentityImplication, weight: REV_CONDITIONAL_IDENTITY_IMPLICATION_WEIGHT },
  { rule: revContrapositive, weight: REV_CONTRAPOSITIVE_WEIGHT },
  { rule: revDS, weight: REV_DS_WEIGHT },
];
const AND_RULES: WeightedReverseRule[] = [
  ...ATOM_RULES,
  { rule: revConj, weight: REV_CONJ_WEIGHT },
  { rule: revAndAssociativity, weight: REV_AND_ASSOCIATIVITY_WEIGHT },
  { rule: revDistributivity, weight: REV_DISTRIBUTIVITY_WEIGHT },
  { rule: revDeMorgan, weight: REV_DE_MORGAN_WEIGHT },
  { rule: revImplication, weight: REV_IMPLICATION_WEIGHT },
];
const OR_RULES: WeightedReverseRule[] = [
  ...ATOM_RULES,
  { rule: revAdd, weight: REV_ADD_WEIGHT },
  { rule: revOrAssociativity, weight: REV_OR_ASSOCIATIVITY_WEIGHT },
  { rule: revDistributivity, weight: REV_DISTRIBUTIVITY_WEIGHT },
  { rule: revDeMorgan, weight: REV_DE_MORGAN_WEIGHT },
  { rule: revConditionalIdentityOr, weight: REV_CONDITIONAL_IDENTITY_OR_WEIGHT },
];
const IFF_RULES: WeightedReverseRule[] = [
  ...ATOM_RULES,
  { rule: revConditionalIdentityIff, weight: REV_CONDITIONAL_IDENTITY_IFF_WEIGHT },
];

function getWeightedReverseRulesForNode(node: ProofNode): WeightedReverseRule[] {
  if (isImplicationNode(node)) return IMPLICATION_RULES;
  if (isOrNode(node)) return OR_RULES;
  if (isAndNode(node)) return AND_RULES;
  if (isIffNode(node)) return IFF_RULES;
  return ATOM_RULES;
}

function pickWeightedRule(rules: WeightedReverseRule[]): ReverseRule {
  const totalWeight = rules.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const entry of rules) {
    roll -= entry.weight;
    if (roll < 0) return entry.rule;
  }
  return rules[rules.length - 1].rule;
}

export function getReverseRulesForNode(node: ProofNode): ReverseRule[] {
  return getWeightedReverseRulesForNode(node).map((entry) => entry.rule);
}
