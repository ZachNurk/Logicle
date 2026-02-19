/**
 * Defines the Axiom type, and defines all the axioms to be used in the program
 * NOTE OUTERMOST LAYER DOESNT HAVE ()
 * @file Axiom.ts
 */

import type { ProofNode } from "./ProofNode";
import {
  sameNode,
  isImplicationNode,
  ERROR_NODE,
  isNotNode,
  createNotNode,
  createImplicationNode,
  isBinaryNode,
  isAndNode,
  isOrNode,
  isIffNode,
  createResultNode,
  createOrNode
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

export type Axiom = {
  id: string;
  text: string;
  selected: boolean;
  /** Most axioms take selected nodes; Simplification takes "left" | "right". */
  apply?:
    | ((premises: AndNode, selected: ProofNode[]) => ProofNode)
    | ((premises: AndNode, side: "left" | "right") => ProofNode)
    | ((original: ProofNode, addition: ProofNode) => ProofNode);
};

/** Throws if premises is not a valid And node with left and right. */
function checkPremises(premises: AndNode) {
  if (!isAndNode(premises) || !premises.left || !premises.right) {
    throw new Error("Premises must be an And node with left and right.");
  }
}

/** Wrap in parens only when node has multiple parts (And, Or, If, Iff). Single (atom, Not) stays unwrapped. */
export function checkParentheses(n: ProofNode): string {
  return isBinaryNode(n) ? `(${n.text})` : n.text;
}

/**
 * Hypothetical Syllogism [(p → q) ∧ (q → r)] → (p → r)
 * @param premises And node whose left and right are the two implication nodes
 * @param selected is the nodes that are selected (needed becuase we dont know if passed node is true and or constructed and)
 */
export function hypotheticalSyllogism(premises: AndNode, selected: ProofNode[]): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;

  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }

  if (sameNode(a.right, b.left)) {
    const first = checkParentheses(a.left);
    const fourth = checkParentheses(b.right);
    const text = `${first} → ${fourth}`;
    return createImplicationNode(text, false, a.left, b.right, selected);
  }
  if (sameNode(a.left, b.right)) {
    const first = checkParentheses(b.left);
    const fourth = checkParentheses(a.right);
    const text = `${first} → ${fourth}`;
    return createImplicationNode(text, false, b.left, a.right, selected);
  }
  return ERROR_NODE;
}

/**
 * Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q
 * @param premises are the or conjunction and the not
 * @param selected is the nodes that are selected (needed becuase we dont know if passed node is true and or constructed and)
 * @return returns the desired node or ERROR_NODE if invalid operation
 */
export function disjunctiveSyllogism(premises: AndNode, selected: ProofNode[]): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;

  let orNode
  let notNode

  if ((isOrNode(a) && isNotNode(b))) {
    orNode = a
    notNode = b
  }
  else if ((isNotNode(a) && isOrNode(b))) {
    notNode = a
    orNode = b
  }
  else {
    return ERROR_NODE;
  }

  if ((sameNode(orNode.left, notNode.contains))) {
    return createResultNode(orNode.right, selected)
  } else if (sameNode(orNode.right, notNode.contains)) {
    return createResultNode(orNode.left, selected)
  }


  return ERROR_NODE;
}

/**
 * Modus Ponens: from P and (P -> Q), infer Q
 * @param premises And node whose left and right are the two premise nodes
 * @param selected is the nodes that are selected (needed becuase we dont know if passed node is true and or constructed and)
 */
export function modusPonens(premises: AndNode, selected: ProofNode[]): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;

  let implication: ImplicationNode | undefined;
  let premise: ProofNode | undefined;

  if (isImplicationNode(a) && isImplicationNode(b)) {
    if (sameNode(b.left, a)) {
      return createResultNode(b.right,selected);
    }
    if (sameNode(a.left, b)) {
      return createResultNode(a.right,selected);
    }
    return ERROR_NODE;
  }
  if (isImplicationNode(a)) {
    implication = a;
    premise = b;
  } else if (isImplicationNode(b)) {
    implication = b;
    premise = a;
  } else {
    return ERROR_NODE;
  }

  if (!implication || !premise) {
    return ERROR_NODE;
  }
  if (!sameNode(implication.left, premise)) {
    return ERROR_NODE;
  }
  if (!implication.right) {
    return ERROR_NODE;
  }

  return createResultNode(implication.right,selected);
}

/**
 * Modus Tollens: [¬q ∧ (p → q)] → ¬p
 * @param premises And node whose left and right are the two premise nodes
 * @param selected is the nodes that are selected (needed becuase we dont know if passed node is true and or constructed and)
 */
export function modusTollens(premises: AndNode, selected: ProofNode[]): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;

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
    return createNotNode(text, false, implication.left, selected);
  }
  return ERROR_NODE;
}

/**
 * Simplification: (p ∧ q) → p
 * @param premises is an and node to simplify
 * @param side is the node to get out
 * @return returns error nod if valid operation, correct node if valid
 */
export function simplification(premises: AndNode, side: "left" | "right") {
  checkPremises(premises)

  if (side === "left") {
    return createResultNode(premises.left, [premises]);
  }
  if (side === "right") {
    return createResultNode(premises.right, [premises]);
  }
  return ERROR_NODE;
}

/**
 * Addition: p → (p ∨ q)
 * @param original is the original node to add to
 * @param addition is the node we are adding (designed by the UI)
 */
export function addition(original: ProofNode, addition: ProofNode): ProofNode {
  let a = checkParentheses(original)
  let b = checkParentheses(addition)
  let text = `${a} ∨ ${b}`
  return createOrNode(text, false, original, addition, [original])
}


// Axioms list
export const Axioms: Axiom[] = [
  {
    id: "1",
    text: "Hypothetical Syllogism",
    selected: false,
    apply: hypotheticalSyllogism,
  },
  {
    id: "2",
    text: "Disjunctive Syllogism",
    selected: false,
    apply: disjunctiveSyllogism
  },
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
  {
    id: "6",
    text: "Simplification",
    selected: false,
    apply: simplification,
  },
  {
    id: "9",
    text: "Addition",
    selected: false,
    apply: addition
  }
];
