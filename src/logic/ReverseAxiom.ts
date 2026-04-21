export type EndlessPuzzlePayload = {
  id?: string;
  nodes?: unknown;
  solution?: unknown;
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
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

const ALPHABET: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
const curAlphabet = new Set<string>();
const curNodes = new Set<ProofNode>();
const NEGATION_PROBABILITY = 0.2;

/**
 * Main function taht generates endless puzzle
 * 
 */
export function generateEndlessPuzzle(): EndlessPuzzlePayload {
  throw new Error("Endless puzzle generator not implemented");
}

function generateSolutionNode() {
    //  Relationship = "If" | "Not" | "And" | "Or" | "Iff" and also just by itself
    // Node should be a negation ~20% of the time
    const RELATIONSHIPS = ["If", "Not", "Atom", "Or", "Iff"]
    const relationship = RELATIONSHIPS[Math.floor(Math.random() * 6)]
    let solutionNode: ProofNode = ERROR_NODE;
    switch (relationship) {
        case "If":
            let left = generateAtom()
            let right = generateAtom()

            if (Math.random() < NEGATION_PROBABILITY) {
                const choice = Math.random() < 0.5 ? left : right;
                if (choice === left) {
                    left = createNotNode(false,choice,undefined,false)
                } else {
                    right = createNotNode(false,choice,undefined,false)
                }
            }
            solutionNode = createImplicationNode(false,left,right,undefined,true)

            break;
    }
    curNodes.add(solutionNode)

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
  return {
    id: crypto.randomUUID(),
    text: letter,
    selected: false,
    isStarter: true,
    parentIds: [],
    context: false,
  } as ProofNode;
}

/** [(p → q) ∧ (q → r)] → (p → r) */
export function revHS(node: ProofNode) {
    if (!isIffNode(node)) return ERROR_NODE;
    const nodeLeft = node.left
    const nodeRight = node.right
    curNodes.delete(node)
    const joiner = generateAtom();
    const nodeA: ProofNode = createImplicationNode(false,nodeLeft,joiner,undefined,true)
    const nodeB: ProofNode = createImplicationNode(false,joiner,nodeRight,undefined,true)
    curNodes.add(nodeA)
    curNodes.add(nodeB)
}