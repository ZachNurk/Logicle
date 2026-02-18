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
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

export type Axiom = {
  id: string;
  text: string;
  selected: boolean;
  apply?: (premises: AndNode) => ProofNode;
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
 */
export function hypotheticalSyllogism(premises: AndNode): ProofNode {
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
    return createImplicationNode(text, false, a.left, b.right, [a, b]);
  }
  if (sameNode(a.left, b.right)) {
    const first = checkParentheses(b.left);
    const fourth = checkParentheses(a.right);
    const text = `${first} → ${fourth}`;
    return createImplicationNode(text, false, b.left, a.right, [a, b]);
  }
  return ERROR_NODE;
}

/**
 * Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q
 * 
 */

/**
 * Modus Ponens: from P and (P -> Q), infer Q
 * @param premises And node whose left and right are the two premise nodes
 */
export function modusPonens(premises: AndNode): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;

  let implication: ImplicationNode | undefined;
  let premise: ProofNode | undefined;

  if (isImplicationNode(a) && isImplicationNode(b)) {
    if (sameNode(b.left, a)) {
      return b.right;
    }
    if (sameNode(a.left, b)) {
      return a.right;
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

  return implication.right;
}

/**
 * Modus Tollens: [¬q ∧ (p → q)] → ¬p
 * @param premises And node whose left and right are the two premise nodes
 */
export function modusTollens(premises: AndNode): ProofNode {
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
    return createNotNode(text, false, implication.left, [a, b]);
  }
  return ERROR_NODE;
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
