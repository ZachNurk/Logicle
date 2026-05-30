import type { ProofNode } from "./ProofNode";
import {
  ERROR_NODE,
  negateNode,
  createImplicationNode,
  createOrNode,
  createAndNode,
  createIffNode,
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

type AlphabetSet = Set<string>;
type NodesSet = Set<ProofNode>;

let curAlphabet: AlphabetSet = new Set<string>();
/** All current premise nodes (final puzzle givens). */
let curNodes: NodesSet = new Set<ProofNode>();
/** Nodes to expand on this step; cleared each step, then filled with children. */
let frontier: NodesSet = new Set<ProofNode>();

const CHARACTER_CAP = 30;
const NEGATION_PROBABILITY = 0.1;
const IF_PROBABILITY = 0.2;
const ATOM_PROBABILITY = 0.35;
const OR_PROBABILITY = 0.15;
const IFF_PROBABILITY = 0.1;
const AND_PROBABILITY = 0.2;
const MAX_STEP_DEPTH = 7;
const MIN_STEP_DEPTH = 4;
const MAX_GIVEN_SIZE = 4;

function replaceNode(node: ProofNode, ...added: ProofNode[]): boolean {
  const allWithinCap = added.every((n) => n.text.length <= CHARACTER_CAP);
  if (!allWithinCap) return false;
  curNodes.delete(node);
  for (const n of added) {
    curNodes.add(n);
    frontier.add(n);
  }
  return true;
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
  if (curAlphabet.size >= ALPHABET.length) {
    throw new Error("No letters left in alphabet set");
  }

  let letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  while (curAlphabet.has(letter)) {
    letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  curAlphabet.add(letter);
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
  curNodes.add(solutionNode);
  frontier.add(solutionNode);
  return solutionNode;
}

function doInvOperation(ctx: ReverseAxiomContext, node: ProofNode) {
  const rules = getReverseRulesForNode(node);
  let rule = rules[Math.floor(Math.random() * rules.length)];

  while (!rule(ctx, node)) {
    rule = rules[Math.floor(Math.random() * rules.length)];
  }

  console.log(rule);
}

export function generateEndlessPuzzle(): EndlessPuzzlePayload {
  console.log("Generating new puzzle");
  curAlphabet.clear();
  curNodes.clear();
  frontier.clear();

  const ctx = createReverseContext();
  const payLoad: EndlessPuzzlePayload = {
    id: undefined,
    nodes: [],
    solution: ERROR_NODE,
  };

  payLoad.solution = generateSolutionNode();
  const numSteps =
    Math.floor(Math.random() * (MAX_STEP_DEPTH - MIN_STEP_DEPTH + 1)) +
    MIN_STEP_DEPTH;

  for (let i = 0; i < numSteps; i++) {
    if (curNodes.size === MAX_GIVEN_SIZE) break;
    if (frontier.size === 0) break;

    const nodesThisStep = Array.from(frontier);
    frontier.clear();

    for (const node of nodesThisStep) {
      if (node.text.length > CHARACTER_CAP) continue;
      doInvOperation(ctx, node);
      if (curNodes.size === MAX_GIVEN_SIZE) break;
    }

    if (frontier.size === 0) break;
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
