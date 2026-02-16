/**
 * Defines the Axiom type, and defines all the axioms to be used in the program
 * @file Axiom.ts
 */

import type { ProofNode } from "./ProofNode";
import { createNode, sameNode } from "./ProofNode";
import type { ImplicationNode } from "./ProofNode";

export type Axiom = {
  id: string;
  text: string; // ima use a switch that checks which one is selected
  selected: boolean;
  apply?: (nodeA: ProofNode, nodeB: ProofNode) => ProofNode;
};

// Node returned if operation isnt possible
const ERROR_NODE: ProofNode = {
  id: "ERROR",
  text: "ERORR",
  selected: false
};

/**
 * Function determines if given node is an If node
 * @param n is the node to check
 * @return returns true if its an if node, false if not
 */
function isImplicationNode(node: ProofNode): node is ImplicationNode {
  return (node as any).relationship === "If";
}

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
    implication = undefined;
    premise = undefined;
  }

  if (!implication || !premise) {
    console.log("Here!2")
    return ERROR_NODE;
  }

  // check premise matches implication's antecedent
  if (!sameNode(implication.left, premise)) {
    
    console.log(implication.left.text)
    console.log(premise.text)
    console.log("Here!3")
    return ERROR_NODE;
  }

  if (!implication.right) {
    console.log("Here!4")
    return ERROR_NODE;
  }

  return implication.right;
}

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
