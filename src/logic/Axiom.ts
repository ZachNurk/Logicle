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

/** Modus Ponens: from P and (P -> Q), infer Q */
export function modusPonens(a: ProofNode, b: ProofNode): ProofNode {

  if (!a || !b) {
    return ERROR_NODE;
  }

  let implication: ImplicationNode | undefined;
  let premise: ProofNode | undefined;

  if (isImplicationNode(a)) {
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
    return ERROR_NODE;
  }

  // check premise matches implication's antecedent
  if (!sameNode(implication.left, premise)) {
    return ERROR_NODE;
  }

  if (!implication.right) {
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
