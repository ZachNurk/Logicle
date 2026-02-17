/**
 * Defines the Axiom type, and defines all the axioms to be used in the program
 * @file Axiom.ts
 */

import type { ProofNode } from "./ProofNode";
import {
  createNode,
  sameNode,
  isImplicationNode,
  ERROR_NODE,
  isNotNode,
  createNotNode,
  createImplicationNode,
  isBinaryNode,
} from "./ProofNode";
import type { ImplicationNode, NotNode } from "./ProofNode";

export type Axiom = {
  id: string;
  text: string; // ima use a switch that checks which one is selected
  selected: boolean;
  apply?: (nodeA: ProofNode, nodeB: ProofNode) => ProofNode;
};
/**
 * Helper function checks if nodes are undefined
 * @param a is the first node
 * @param b is the second node
 * @throws Error if either node is undefined
 */
function checkUndefines(a: ProofNode, b: ProofNode) {
  if (!a) throw new Error("Undefined A!");
  if (!b) throw new Error("Undefined B!");
}

/** Wrap in parens only when node has multiple parts (And, Or, If, Iff). Single (atom, Not) stays unwrapped. */
export function checkParentheses(n: ProofNode): string {
  return isBinaryNode(n) ? `(${n.text})` : n.text;
}

/**
 * Hypothetical Syllogism [(p → q) ∧ (q → r)] → (p → r)
 * @param a is the first node 
 * @param b is the second node
 * @return returns the node creator, or ERROR_NODE if invalid node combo
 * @throws Error if undefined node
 */
export function hypotheticalSylogism(a: ProofNode, b: ProofNode): ProofNode {
  checkUndefines(a,b)

  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }

  // Case 1: Try for A --> B and B --> C === 1 --> 4, where 2 == 3
  if (sameNode(a.right,b.left)) {
    const first = checkParentheses(a.left)
    const fourth = checkParentheses(b.right)
    const text = `${first} → ${fourth}` 
    return createImplicationNode(text, false, a.left, b.right, [a,b])
    
  } // Case 2: Try for B --> C and A --> B, where 
  else if (sameNode(a.left,b.right)) {
    const first = checkParentheses(b.right)
    const fourth = checkParentheses(a.left)
    const text = `${first} → ${fourth}` 
    return createImplicationNode(text, false, b.right, a.left, [a,b])
  }
  //TODO test me!!!
  // Else, invalid combo
  return ERROR_NODE;
}

/**
 * Modus Ponens: from P and (P -> Q), infer Q
 * @param a is the first node
 * @param b is the second node
 * @return returns the node result. Error Node if operation can't be done
 * @throws throws an error if either a or b is undefined
 */
export function modusPonens(a: ProofNode, b: ProofNode): ProofNode {
  checkUndefines(a, b);

  let implication: ImplicationNode | undefined;
  let premise: ProofNode | undefined;

  if (isImplicationNode(a) && isImplicationNode(b)) {
    // (P -> Q) and ((P -> Q) -> L))
    if (sameNode(b.left, a)) {
      return b.right;
    }
    // ((P -> Q) -> L)) and (P -> Q)
    if (sameNode(a.left, b)) {
      return a.right;
    }
    return ERROR_NODE;
  } else if (isImplicationNode(a)) {
    implication = a;
    premise = b;
  } else if (isImplicationNode(b)) {
    implication = b;
    premise = a;
  } else {
    // neither is an implication node
    implication = undefined;
    premise = undefined;
  }

  if (!implication || !premise) {
    return ERROR_NODE;
  }

  // check premise matches implication's antecedent
  if (!sameNode(implication.left, premise)) {
    console.log(implication.left.text);
    console.log(premise.text);
    return ERROR_NODE;
  }

  if (!implication.right) {
    return ERROR_NODE;
  }

  return implication.right;
}

/**
 * Modus Tollens: [¬q AND (p → q) ] → ¬p
 * @param a is the first node
 * @param b is the second node
 * @return returns the node result. Error Node if operation can't be done
 * @throws throws an error if either a or b is undefined
 */
export function modusTollens(a: ProofNode, b: ProofNode): ProofNode {
  checkUndefines(a, b);

  let premise: NotNode | undefined;
  let implication: ImplicationNode | undefined;

  if (isNotNode(a) && isImplicationNode(b)) {
    premise = a;
    implication = b;
  } else if (isNotNode(b) && isImplicationNode(a)) {
    premise = b;
    implication = a;
  } else {
    return ERROR_NODE;
  }

  if (!implication || !premise) {
    return ERROR_NODE;
  }

  if (sameNode(premise.contains, implication.right)) {
    const text = `¬${checkParentheses(implication.left)}`;
    return createNotNode(text, false, implication.left, [a,b]);
  }
  return ERROR_NODE;
}

// Axioms list
export const Axioms: Axiom[] = [
  {
    id: "3",
    text: "Modus Ponens",
    selected: false,
    apply: modusPonens,
  },
  {
    id: "4",
    text: "Modus Tollens",
    selected: false,
    apply: modusTollens,
  },
];
