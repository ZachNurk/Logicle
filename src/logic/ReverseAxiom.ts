export type EndlessPuzzlePayload = {
  id?: string;
  nodes: ProofNode[];
  solution: ProofNode;
};

import type { ProofNode } from "./ProofNode";
import {
  sameNode,
  areNegationsOfEachOther,
  isImplicationNode,
  ERROR_NODE,
  isNotNode,
  createNotNode,
  createImplicationNode,
  isAndNode,
  isOrNode,
  isIffNode,
  createResultNode,
  createOrNode,
  createAndNode,
  checkParentheses,
  createIffNode,
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

const ALPHABET: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
type AlphabetSet = Set<string>;
type NodesSet = Set<ProofNode>;
let curAlphabet: AlphabetSet = new Set<string>();
let curNodes: NodesSet = new Set<ProofNode>();
const NEGATION_PROBABILITY = 0.1;
const IF_PROBABILITY = 0.2;
const NOT_PROBABILITY = 0.15;
const ATOM_PROBABILITY = 0.2;
const OR_PROBABILITY = 0.15;
const IFF_PROBABILITY = 0.1;
const AND_PROBABILITY = 0.2;
const MAX_STEP_DEPTH = 7;
const MIN_STEP_DEPTH = 3;
const MAX_GIVEN_SIZE = 4;

/** Function selects a relationship from our list using the probabilities */
function chooseRelationship() {
  const roll = Math.random();
  let cursor = 0;
  cursor += IF_PROBABILITY;
  if (roll < cursor) return "If";
  cursor += NOT_PROBABILITY;
  if (roll < cursor) return "Not";
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

/**
 * Main function taht generates endless puzzle
 * 
 */
export function generateEndlessPuzzle(): EndlessPuzzlePayload {
//   throw new Error("Endless puzzle generator not implemented");
    curAlphabet = new Set<string>();
    curNodes = new Set<ProofNode>();
    let payLoad: EndlessPuzzlePayload = {
      id: undefined,
      nodes: Array<ProofNode>(),
      solution: ERROR_NODE,
    };

    payLoad.solution = generateSolutionNode()
    const numSteps = Math.floor(Math.random() * (MAX_STEP_DEPTH - MIN_STEP_DEPTH + 1)) + MIN_STEP_DEPTH;

    for (var i = 0; i < numSteps; i++) {
        if (curNodes.size === MAX_GIVEN_SIZE) break;

        const curStepSet = new Set(curNodes);
     
        for (const node of curStepSet) {
            chooseInvOperation(node)
        }
    }
    payLoad.nodes = Array.from(curNodes).map((node) => ({
        ...node,
        selected: false,
        isStarter: true,
        context: false,
        parents: [],
      }));
    // Shuffle
    for (let i = payLoad.nodes.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [payLoad.nodes[i], payLoad.nodes[j]] = [payLoad.nodes[j], payLoad.nodes[i]];
    }
    return payLoad;

}

function chooseInvOperation(
  node: ProofNode,
): ProofNode {
    //TODO if chose op is error, try another op. 
    //TODO see if node is already in the set
    // functions return false if operation is not possible
    if (isImplicationNode(node) && Math.random() < 0.5) {
        revHS(node)
    } else {
        if (Math.random() < 0.5) {
            revMP(node)
        } else {
            revMT(node)
        }
        
    }
    return ERROR_NODE
}

export function generateSolutionNode(
): ProofNode {
    //  Relationship = "If" | "Not" | "And" | "Or" | "Iff" and also just by itself
    // Node should be a negation ~20% of the time
    const relationship = chooseRelationship();
    let solutionNode: ProofNode = ERROR_NODE;
    switch (relationship) {
        case "If":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createImplicationNode(false, left, right, undefined, true);
            }
            break;
        case "Not":
            solutionNode = createNotNode(false, generateAtom(), undefined, true)
            break;
        case "Atom":
            solutionNode = generateAtom()
            break;
        case "Or":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createOrNode(false, left, right, undefined, true);
            }
            break;
        case "Iff":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createIffNode(false, left, right, undefined, true);
            }
            break;
        case "And":
            {
              const left = generateAtom();
              const right = generateAtom();
              solutionNode = createAndNode(false, left, right, undefined, true);
            }
            break;
    }
    curNodes.add(solutionNode)
    return solutionNode;
}
/**
 * Generates a random atom that isnt already in the alphabet set.
 * Adds to the alphabet 
 * @returns G is the new atom
 */
function generateAtom(): ProofNode {
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
  if (Math.random() < NEGATION_PROBABILITY) {
    return createNotNode(false, atom, undefined, true);
  }
  return atom;
}

/** [(p → q) ∧ (q → r)] → (p → r) */
export function revHS(
  node: ProofNode,
) {
    if (!isImplicationNode(node)) return false;
    const nodeLeft = node.left
    const nodeRight = node.right
    curNodes.delete(node)
    const joiner = generateAtom();
    const nodeA: ProofNode = createImplicationNode(false,nodeLeft,joiner,undefined,true)
    const nodeB: ProofNode = createImplicationNode(false,joiner,nodeRight,undefined,true)
    curNodes.add(nodeA)
    curNodes.add(nodeB)
}

/**from P and (P -> Q), infer Q */
export function revMP(node: ProofNode) {
    curNodes.delete(node)
    const joiner = generateAtom();
    const nodeA: ProofNode = joiner
    const nodeB: ProofNode = createImplicationNode(false,joiner, node,undefined,true)
    curNodes.add(nodeA)
    curNodes.add(nodeB)
}

/** Modus Tollens: [¬q ∧ (p → q)] → ¬p */
export function revMT(node: ProofNode) {
    curNodes.delete(node)
    const joiner = generateAtom();
    const negJoiner = createNotNode(false,joiner, undefined, true)
    const negOriginal = createNotNode(false,node)
    const nodeB = createImplicationNode(false, negOriginal,joiner,undefined,true)
    curNodes.add(negJoiner)
    curNodes.add(nodeB)
    
}



