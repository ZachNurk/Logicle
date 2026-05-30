import type { ProofNode } from "./ProofNode";
import {
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
import type { ReverseAxiomContext } from "./ReverseAxiom";
import { getReverseRulesForNode } from "./ReverseAxiom";

export type EndlessPuzzlePayload = {
  id?: string;
  nodes: ProofNode[];
  solution: ProofNode;
};

const ALPHABET: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const NODE_CHARACTER_CAP = 15;
const TOTAL_CHARACTER_CAP = NODE_CHARACTER_CAP * 4 * .75;
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
  return true;
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

/** Letters currently used by atoms in committed givens (not throwaway trial nodes). */
function getUsedLetters(): Set<string> {
  const used = new Set<string>();
  for (const node of curNodes) collectAtomLetters(node, used);
  return used;
}

function createRandomAndNode(left: ProofNode, right: ProofNode): ProofNode {
  const randomSide = Math.random() < 0.5;
  if (randomSide) {
    return createAndNode(false, left, right, undefined, true);
  }
  return createAndNode(false, right, left, undefined, true);
}

function createRandomOrNode(left: ProofNode, right: ProofNode): ProofNode {
  const randomSide = Math.random() < 0.5;
  if (randomSide) {
    return createOrNode(false, left, right, undefined, true);
  }
  return createOrNode(false, right, left, undefined, true);
}

function createRandomIffNode(left: ProofNode, right: ProofNode): ProofNode {
  const randomSide = Math.random() < 0.5;
  if (randomSide) {
    return createIffNode(false, left, right, undefined, true);
  }
  return createIffNode(false, right, left, undefined, true);
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

function createReverseContext(): ReverseAxiomContext {
  return {
    replaceNode,
    generateAtom,
    createRandomAndNode,
    createRandomOrNode,
  };
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
        solutionNode = createRandomIffNode(left, right);
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

function doInvOperation(ctx: ReverseAxiomContext, node: ProofNode) {
  const rules = getReverseRulesForNode(node);
  const maxAttempts = rules.length * 50;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rule = rules[Math.floor(Math.random() * rules.length)];
    if (rule(ctx, node)) {
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

  const ctx = createReverseContext();
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
      doInvOperation(ctx, node);
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
