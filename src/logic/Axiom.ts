/**
 * Defines the Axiom type, and defines all the axioms to be used in the program
 * @file Axiom.ts
 */

import type { ProofNode } from "./ProofNode";
import { createNode, sameNode, isImplicationNode, ERROR_NODE, isNotNode, createNotNode } from "./ProofNode";
import type { ImplicationNode, NotNode } from "./ProofNode";

export type Axiom = {
  id: string;
  text: string; // ima use a switch that checks which one is selected
  selected: boolean;
  apply?: (nodeA: ProofNode, nodeB: ProofNode) => ProofNode;
};


/** 
 * Modus Ponens: from P and (P -> Q), infer Q
 * @param a is the first node
 * @param b is the second node
 * @return returns the node result. Error Node if operation can't be done
 * @throws throws an error if either a or b is undefined
 */
export function modusPonens(a: ProofNode, b: ProofNode): ProofNode {

  if (!a) throw new Error("Undefined A!")
  if (!b) throw new Error("Undefined B!")
  

  let implication: ImplicationNode | undefined;
  let premise: ProofNode | undefined;

  if (isImplicationNode(a) && isImplicationNode(b)) {
    // (P -> Q) and ((P -> Q) -> L))
    if (sameNode(b.left, a)) {
      return b.right
    }
    // ((P -> Q) -> L)) and (P -> Q)
    if (sameNode(a.left,b)) {
      return a.right
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
    
    console.log(implication.left.text)
    console.log(premise.text)
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
  if (!a) throw new Error("Undefined A!")
  if (!b) throw new Error("Undefined B!")
  
  let premise: NotNode | undefined
  let implication: ImplicationNode | undefined
  

  if (isNotNode(a) && isImplicationNode(b)) {
    
    premise = a;
    implication = b;
    
  } else if (isNotNode(b) && isImplicationNode(a)) {

    premise = b;
    implication = a;

  } else {
    return ERROR_NODE
  }

  if (!implication || !premise) {
    return ERROR_NODE;
  }

  if (sameNode(premise.contains, implication.right)) {
      const text = `¬${implication.left.text}`
      return createNotNode(text, false, implication.left)
  }
  return ERROR_NODE
}

// Axioms list
export const Axioms: Axiom[] = [
  {
    id: "MP",
    text: "Modus Ponens",
    selected: false,
    apply: modusPonens,
  },
  {
    id: "MT",
    text: "Modus Tonens",
    selected: false,
    apply: (nodes, selectedIds) => {
      // placeholder
      return nodes;
    },
  },
];
