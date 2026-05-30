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
import { conditionalIdentityImplication } from "./Axiom";

export type EndlessPuzzlePayload = {
  id?: string;
  nodes: ProofNode[];
  solution: ProofNode;
};

export type ReverseRule = (node: ProofNode) => ProofNode[];

export function isReverseError(result: ProofNode[]): boolean {
  return result.length === 1 && sameNode(result[0], ERROR_NODE);
}

const NODE_CHARACTER_CAP = 15;
const TOTAL_CHARACTER_CAP = NODE_CHARACTER_CAP * 4 * 0.75;
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

const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
] as const;

type NodesSet = Set<ProofNode>;

/** All current premise nodes (final puzzle givens). */
let curNodes: NodesSet = new Set<ProofNode>();
/** Nodes to expand on this step; cleared each step, then filled with children. */
let frontier: NodesSet = new Set<ProofNode>();

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

function applyReverseResult(
  original: ProofNode,
  replacement: ProofNode[],
): boolean {
  if (isReverseError(replacement)) return false;
  if (!replacement.every((n) => n.text.length <= NODE_CHARACTER_CAP)) return false;

  const afterReplace =
    totalGivenChars() -
    original.text.length +
    replacement.reduce((s, n) => s + n.text.length, 0);
  if (afterReplace > TOTAL_CHARACTER_CAP) return false;

  curNodes.delete(original);
  for (const n of replacement) {
    curNodes.add(n);
    frontier.add(n);
  }
  return true;
}

function generateAtom(canNegate: boolean = true): ProofNode {
  const used = getUsedLetters();
  if (used.size >= ALPHABET.length) {
    throw new Error("No letters left in alphabet set");
  }

  let letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  while (used.has(letter)) {
    letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }

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

/** [(p → q) ∧ (q → r)] → (p → r) */
export function revHS(node: ProofNode): ProofNode[] {
  if (!isImplicationNode(node)) return [ERROR_NODE];
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
  return [nodeA, nodeB];
}

/** Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q */
export function revDS(node: ProofNode): ProofNode[] {
  const joiner = generateAtom();
  const negJoiner = negateNode(false, joiner, undefined, true);
  const nodeA = createOrNode(false, joiner, node, undefined, true);
  return [negJoiner, nodeA];
}

/** from P and (P -> Q), infer Q */
export function revMP(node: ProofNode): ProofNode[] {
  const joiner = generateAtom();
  const nodeB = createImplicationNode(false, joiner, node, undefined, true);
  return [joiner, nodeB];
}

/** Modus Tollens: [¬q ∧ (p → q)] → ¬p */
export function revMT(node: ProofNode): ProofNode[] {
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
  return [negJoiner, nodeB];
}

/** Simplification: (p ∧ q) → p */
export function revSimp(node: ProofNode): ProofNode[] {
  const joiner = generateAtom();
  const nodeA = createAndNode(false, node, joiner, undefined, true);
  return [nodeA];
}

/** Constructive Dilemma (OR): [(p → q) ∧ (r → s)] → [(p ∨ r) → (q ∨ s)] */
function revCDOr(node: ProofNode): ProofNode[] {
  if (!isImplicationNode(node) || !isOrNode(node.left) || !isOrNode(node.right))
    return [ERROR_NODE];
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

  return [createAndNode(false, newAndNodeLeft, newAndNodeRight, undefined, true)];
}

/** Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)] */
function revCDAnd(node: ProofNode): ProofNode[] {
  if (!isImplicationNode(node) || !isAndNode(node.left) || !isAndNode(node.right))
    return [ERROR_NODE];
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

  return [createAndNode(false, newAndNodeLeft, newAndNodeRight, undefined, true)];
}

/** Constructive Dilemma: [(p → q) ∧ (r → s)] → [(p ⋄ r) → (q ⋄ s)] where ⋄ is OR or AND. */
export function revCD(node: ProofNode): ProofNode[] {
  const orResult = revCDOr(node);
  if (!isReverseError(orResult)) return orResult;
  return revCDAnd(node);
}

/** Disjuncts revAdd may drop when undoing addition — atoms and negated atoms only. */
function isRevAddRemovable(node: ProofNode): boolean {
  return isAtomNode(node) || isNotNode(node);
}

/**
 * Reverse addition: (p ∨ q) → p or q. Only disjuncts that are atoms or not-nodes
 * may be removed; if neither side qualifies, the rule does not apply.
 */
export function revAdd(node: ProofNode): ProofNode[] {
  if (!isOrNode(node)) return [ERROR_NODE];

  const leftRemovable = isRevAddRemovable(node.left);
  const rightRemovable = isRevAddRemovable(node.right);
  if (!leftRemovable && !rightRemovable) return [ERROR_NODE];

  if (leftRemovable && rightRemovable) {
    const keepLeft = Math.random() < 0.5;
    return [keepLeft ? node.left : node.right];
  }

  if (leftRemovable) return [node.right];
  return [node.left];
}

/** Conjunction: p → (p ∧ q) */
export function revConj(node: ProofNode): ProofNode[] {
  if (!isAndNode(node)) return [ERROR_NODE];
  return [node.left, node.right];
}

/**
 * Absorption:
 * - P ∨ (P ∧ Q) ≡ P
 * (and symmetric variants where the repeated P is on the right side).
 */
export function revAbso(node: ProofNode): ProofNode[] {
  if (
    isAndNode(node) &&
    node.left &&
    node.right &&
    (isAndNode(node.left) ||
      isAndNode(node.right) ||
      isOrNode(node.left) ||
      isOrNode(node.right))
  ) {
    return [ERROR_NODE];
  }

  const absorbedNode = generateAtom();
  const absorbedAnd = createAndNode(false, node, absorbedNode, undefined, true);
  return [createOrNode(false, absorbedAnd, node, undefined, true)];
}

/**
 * Reverse AND associativity: (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C) and
 * ((A ∧ B) ∧ C) → (A ∧ (B ∧ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revAndAssociativity(node: ProofNode): ProofNode[] {
  if (!isAndNode(node) || !node.left || !node.right) return [ERROR_NODE];

  const { left, right } = node;
  const canReassocFromLeft = isAndNode(left);
  const canReassocFromRight = isAndNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return [ERROR_NODE];

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  if (useLeftBranch) {
    if (!isAndNode(left)) return [ERROR_NODE];
    const inner = createAndNode(false, left.right, right, undefined, true);
    return [createAndNode(false, left.left, inner, undefined, true)];
  }

  if (!isAndNode(right)) return [ERROR_NODE];
  const inner = createAndNode(false, left, right.left, undefined, true);
  return [createAndNode(false, inner, right.right, undefined, true)];
}

/**
 * Reverse OR associativity: (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C) and
 * ((A ∨ B) ∨ C) → (A ∨ (B ∨ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revOrAssociativity(node: ProofNode): ProofNode[] {
  if (!isOrNode(node) || !node.left || !node.right) return [ERROR_NODE];

  const { left, right } = node;
  const canReassocFromLeft = isOrNode(left);
  const canReassocFromRight = isOrNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return [ERROR_NODE];

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  if (useLeftBranch) {
    if (!isOrNode(left)) return [ERROR_NODE];
    const inner = createOrNode(false, left.right, right, undefined, true);
    return [createOrNode(false, left.left, inner, undefined, true)];
  }

  if (!isOrNode(right)) return [ERROR_NODE];
  const inner = createOrNode(false, left, right.left, undefined, true);
  return [createOrNode(false, inner, right.right, undefined, true)];
}

/**
 * Reverse distributivity (simple cases only):
 * (A ∨ B) ∧ (A ∨ C) → A ∨ (B ∧ C) and (A ∧ B) ∨ (A ∧ C) → A ∧ (B ∨ C).
 */
export function revDistributivity(node: ProofNode): ProofNode[] {
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
      return [createOrNode(false, parts.shared, bc, undefined, true)];
    }
  } else if (isOrNode(node) && isAndNode(node.left) && isAndNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = createOrNode(false, parts.other1, parts.other2, undefined, true);
      return [createAndNode(false, parts.shared, bc, undefined, true)];
    }
  }

  return [ERROR_NODE];
}

/** [P V P] = P */
export function revIndempotent(node: ProofNode): ProofNode[] {
  return [createOrNode(false, node, node, undefined, true)];
}

export function revDeMorgan(node: ProofNode): ProofNode[] {
  if (!isAndNode(node) && !isOrNode(node)) return [ERROR_NODE];

  const newLeft = negateNode(false, node.left, undefined, true);
  const newRight = negateNode(false, node.right, undefined, true);

  if (isAndNode(node)) {
    const inner = createOrNode(false, newLeft, newRight, undefined, true);
    return [negateNode(false, inner, undefined, true)];
  }

  const inner = createAndNode(false, newLeft, newRight, undefined, true);
  return [negateNode(false, inner, undefined, true)];
}

export function revContrapositive(node: ProofNode): ProofNode[] {
  if (!isImplicationNode(node)) return [ERROR_NODE];
  const newLeft = negateNode(false, node.right, undefined, true);
  const newRight = negateNode(false, node.left, undefined, true);
  return [createImplicationNode(false, newLeft, newRight, undefined, true)];
}

export function revConditionalIdentityImplication(node: ProofNode): ProofNode[] {
  if (!isImplicationNode(node)) return [ERROR_NODE];
  const newNode = conditionalIdentityImplication(node);
  if (sameNode(newNode, ERROR_NODE)) return [ERROR_NODE];
  return [newNode];
}

export function revConditionalIdentityOr(node: ProofNode): ProofNode[] {
  if (!isOrNode(node)) return [ERROR_NODE];
  const newNode = conditionalIdentityImplication(node);
  if (sameNode(newNode, ERROR_NODE)) return [ERROR_NODE];
  return [newNode];
}

export function revConditionalIdentityIff(node: ProofNode): ProofNode[] {
  if (!isIffNode(node)) return [ERROR_NODE];
  const newLeft = negateNode(false, node.left, undefined, true);
  const newRight = negateNode(false, node.right, undefined, true);
  return [createImplicationNode(false, newLeft, newRight, undefined, true)];
}

export function revImplication(node: ProofNode): ProofNode[] {
  if (!isImplicationNode(node) && !isAndNode(node)) return [ERROR_NODE];

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
    } else if (isAndNode(node.right)) {
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
    } else if (sameNode(node.left.right, node.right.right)) {
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

  return resNode ? [resNode] : [ERROR_NODE];
}

const ATOM_RULES: ReverseRule[] = [
  revMP,
  revMT,
  revSimp,
  revAbso,
  revIndempotent,
];
const IMPLICATION_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revHS,
  revCD,
  revImplication,
  revConditionalIdentityImplication,
  revContrapositive,
  revDS,
];
const AND_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revConj,
  revAndAssociativity,
  revDistributivity,
  revDeMorgan,
  revImplication,
];
const OR_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revAdd,
  revOrAssociativity,
  revDistributivity,
  revDeMorgan,
  revConditionalIdentityOr,
];
const IFF_RULES: ReverseRule[] = [...ATOM_RULES, revConditionalIdentityIff];

export function getReverseRulesForNode(node: ProofNode): ReverseRule[] {
  if (isImplicationNode(node)) return IMPLICATION_RULES;
  if (isOrNode(node)) return OR_RULES;
  if (isAndNode(node)) return AND_RULES;
  if (isIffNode(node)) return IFF_RULES;
  return ATOM_RULES;
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

/** Incremented after each successful reverse rule during generation. */
let ruleLogIndex = 0;

function logCurrentNodes(label: string): void {
  const nodes = Array.from(curNodes).map((n) => n.text);
  // eslint-disable-next-line no-console
  console.log(`${label} — nodes (${nodes.length}):`, nodes);
}

function refillFrontierIfNeeded(): void {
  if (frontier.size > 0 || curNodes.size >= MIN_GIVEN_SIZE) return;
  for (const node of curNodes) {
    if (node.text.length <= NODE_CHARACTER_CAP) frontier.add(node);
  }
}

function doInvOperation(node: ProofNode) {
  const rules = getReverseRulesForNode(node);
  const maxAttempts = rules.length * 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rule = rules[Math.floor(Math.random() * rules.length)];
    const result = rule(node);
    if (applyReverseResult(node, result)) {
      ruleLogIndex += 1;
      logCurrentNodes(`Rule ${ruleLogIndex}: ${rule.name} on "${node.text}"`);
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
  console.log("Generating new puzzle");
  ruleLogIndex = 0;
  curNodes.clear();
  frontier.clear();

  const payLoad: EndlessPuzzlePayload = {
    id: undefined,
    nodes: [],
    solution: ERROR_NODE,
  };

  payLoad.solution = generateSolutionNode();
  logCurrentNodes("Initial");

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
  return payLoad;
}
