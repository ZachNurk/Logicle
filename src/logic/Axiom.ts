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
  createOrNode,
  createAndNode,
  createNode
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

/** Type 1: (premises: AndNode, selected: ProofNode[]) => ProofNode. Type 2: (premises: AndNode, side: "left"|"right") => ProofNode. Type 3: (original: ProofNode, addition: ProofNode) => ProofNode. Type 4: (original: ProofNode) => ProofNode. */
export type AxiomApplyType = "1" | "2" | "3" | "4";

export type Axiom = {
  id: string;
  text: string;
  selected: boolean;
  description: string;
  description2?: string;
  /** Which apply signature: "1" = premises + selected, "2" = premises + side, "3" = original + addition, "4" = original only. */
  applyType: AxiomApplyType;
  apply?:
    | ((premises: AndNode, selected: ProofNode[]) => ProofNode)
    | ((premises: AndNode, side: "left" | "right") => ProofNode)
    | ((original: ProofNode, addition: ProofNode) => ProofNode)
    | ((original: ProofNode) => ProofNode)
};

/** Throws if premises is not a valid And node with left and right. */
function checkPremises(premises: AndNode) {
  if (!isAndNode(premises) || !premises.left || !premises.right) {
    throw new Error("Premises must be an And node with left and right.");
  }
}

/**
 * Wrap in parens only when node has multiple parts (And, Or, If, Iff). Single (atom, Not) stays unwrapped.
 * Convention: create* functions in ProofNode do not add parentheses; any code that builds a formula
 * string from child nodes (e.g. axioms) should use this so the result is unambiguous.
 * @param n the node to format as a subexpression
 * @returns the node's text, wrapped in parentheses when it is a binary node
 */
export function checkParentheses(n: ProofNode): string {
  return isBinaryNode(n) ? `(${n.text})` : n.text;
}

/**
 * Hypothetical Syllogism [(p → q) ∧ (q → r)] → (p → r)
 * @param premises And node whose left and right are the two implication nodes
 * @param selected is the nodes that are selected (needed becuase we dont know if passed node is true and or constructed and)
 * @return returns a proofnode of the result, ERROR_NODE if invalid calculation
 * @throws Error if premises are undefined
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
 * @return returns a proofnode of the result, ERROR_NODE if invalid calculation
 * @throws Error if premises are undefined
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
 * @return returns a proofnode of the result, ERROR_NODE if invalid calculation
 * @throws Error if premises are undefined
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
 * @return returns proof node result, ERROR_NODE if invalid
 * @throws Error if premises are undefined
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
 * @return returns error nod if invalid operation, correct node if valid
 * @throws Error if premises are undefined
 */
export function simplification(premises: AndNode, side: "left" | "right") {
  checkPremises(premises)
  if (!side) throw new Error("no side selected!")
  if (side === "left") {
    return createResultNode(premises.left, [premises]);
  }
  if (side === "right") {
    return createResultNode(premises.right, [premises]);
  }
  return ERROR_NODE;
}

/**
 * Constructive Dilemma (OR): [(p → q) ∧ (r → s)] → [(p ∨ r) → (q ∨ s)]
 * @param premises are the premises to use
 * @param selected are the nodes selected to make the dilema
 * @return returns the node result, ERROR_NODE if unsuccessful
 * @throws Error if premises are undefined
 */
export function constructiveDilemmaOr(premises: AndNode, selected: ProofNode[]): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;
  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }
  const textA = `${a.left.text} ∨ ${a.right.text}`;
  const nodeA = createOrNode(textA, false, a.left, a.right, undefined);
  const textB = `${b.left.text} ∨ ${b.right.text}`;
  const nodeB = createOrNode(textB, false, b.left, b.right, undefined);
  const finalText = `(${nodeA.text}) → (${nodeB.text})`;
  return createImplicationNode(finalText, false, nodeA, nodeB, selected);
}

/**
 * Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)]
 * @param premises are the premises to use
 * @param selected are the nodes selected to make the dilema
 * @return returns a proofnode of the result, ERROR_NODE if invalid calculation
 * @throws Error if premises are undefined
 */
export function constructiveDilemmaAnd(premises: AndNode, selected: ProofNode[]): ProofNode {
  checkPremises(premises);
  const a = premises.left;
  const b = premises.right;
  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }
  const textA = `${a.left.text} ∧ ${a.right.text}`;
  const nodeA = createAndNode(textA, false, a.left, a.right, undefined);
  const textB = `${b.left.text} ∧ ${b.right.text}`;
  const nodeB = createAndNode(textB, false, b.left, b.right, undefined);
  const finalText = `(${nodeA.text}) → (${nodeB.text})`;
  return createImplicationNode(finalText, false, nodeA, nodeB, selected);
}

//TODO wrap and and or constructive dilemma into function here

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

/**
 * Conjunction: p → (p ∧ q)
 * @param original is the original node to add to
 * @param addition is the node we are adding (designed by the UI)
 */
export function conjunction(original: ProofNode, addition: ProofNode): ProofNode {
  let a = checkParentheses(original)
  let b = checkParentheses(addition)
  let text = `${a} ∧ ${b}`
  return createAndNode(text, false, original, addition, [original, addition])
}

/**
 * Double negation: ¬¬p ≡ p
 * @param original is the node to double negate
 * @return returns the node if correct operation, error node if not
 */
export function doubleNegation(original: ProofNode): ProofNode {
  if (!isNotNode(original)) {
    return ERROR_NODE
  }
  if (!isNotNode(original.contains)) {
    return ERROR_NODE
  }
  const inner = original.contains.contains;
  const result = { ...inner, text: checkParentheses(inner) };
  return createResultNode(result as typeof inner, [original]);
}

/**
 * OR commutativity: (A ∨ B) ≡ (B ∨ A)
 * @param original is the Or node (A ∨ B) to reorder
 * @return returns a proof node (B ∨ A), or ERROR_NODE if original is not an Or node
 */
function orCommutativity(original: ProofNode): ProofNode {
  if (!isOrNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  const text = `${checkParentheses(original.right)} ∨ ${checkParentheses(original.left)}`;
  
  return createOrNode(text, false, original.right, original.left, [original]);
}

/**
 * AND commutativity: (A ∧ B) ≡ (B ∧ A)
 * @param original is the And node (A ∧ B) to reorder
 * @return returns a proof node (B ∧ A), or ERROR_NODE if original is not an And node
 */
function andCommutativity(original: ProofNode): ProofNode {
  if (!isAndNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  const text = `${checkParentheses(original.right)} ∧ ${checkParentheses(original.left)}`;

  return createAndNode(text, false, original.right, original.left, [original]);
}

/**
 * Function combines communativity of and and or
 * @param original is the original node 
 * @return returns a proof node, or ERROR_NODE if original is not a valid node
 */
export function commutativity(original: ProofNode): ProofNode {
  if (isAndNode(original)) {
    return andCommutativity(original)
  }
  else if (isOrNode(original)) {
    return orCommutativity(original)
  }
  return ERROR_NODE
}
/**
 * AND associativity: (A ∧ B) ∧ C ≡ A ∧ (B ∧ C)
 * Re-brackets so the inner conjunction is on the side that was already grouped.
 * @param original is an And node of the form (A ∧ B) ∧ C or A ∧ (B ∧ C)
 * @return the equivalent associatively re-bracketed node, or ERROR_NODE if not applicable
 */
function andAssociativity(original: ProofNode): ProofNode {
  if (!isAndNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  if (isAndNode(original.left)) {
    // ((A ∧ B) ∧ C) → (A ∧ (B ∧ C))
    const inner = createAndNode(
      `${checkParentheses(original.left.right)} ∧ ${checkParentheses(original.right)}`,
      false,
      original.left.right,
      original.right,
      undefined
    );
    const text = `${checkParentheses(original.left.left)} ∧ ${checkParentheses(inner)}`;
    return createAndNode(text, false, original.left.left, inner, [original]);
  }
  if (isAndNode(original.right)) {
    // (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C)
    const inner = createAndNode(
      `${checkParentheses(original.left)} ∧ ${checkParentheses(original.right.left)}`,
      false,
      original.left,
      original.right.left,
      undefined
    );
    const text = `${checkParentheses(inner)} ∧ ${checkParentheses(original.right.right)}`;
    return createAndNode(text, false, inner, original.right.right, [original]);
  }
  return ERROR_NODE;
}

/**
 * OR associativity: (A ∨ B) ∨ C ≡ A ∨ (B ∨ C)
 * Re-brackets so the inner disjunction is on the side that was already grouped.
 * @param original is an Or node of the form (A ∨ B) ∨ C or A ∨ (B ∨ C)
 * @return the equivalent associatively re-bracketed node, or ERROR_NODE if not applicable
 */
function orAssociativity(original: ProofNode): ProofNode {
  if (!isOrNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  if (isOrNode(original.left)) {
    // ((A ∨ B) ∨ C) → (A ∨ (B ∨ C))
    const inner = createOrNode(
      `${checkParentheses(original.left.right)} ∨ ${checkParentheses(original.right)}`,
      false,
      original.left.right,
      original.right,
      undefined
    );
    const text = `${checkParentheses(original.left.left)} ∨ ${checkParentheses(inner)}`;
    return createOrNode(text, false, original.left.left, inner, [original]);
  }
  if (isOrNode(original.right)) {
    // (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C)
    const inner = createOrNode(
      `${checkParentheses(original.left)} ∨ ${checkParentheses(original.right.left)}`,
      false,
      original.left,
      original.right.left,
      undefined
    );
    const text = `${checkParentheses(inner)} ∨ ${checkParentheses(original.right.right)}`;
    return createOrNode(text, false, inner, original.right.right, [original]);
  }
  return ERROR_NODE;
}

/**
 * Combines the two associativity functions
 * @param original is the original node
 * @return returns the associativity node or ERROR_NODE if not applicable.
 */
export function associativity(original: ProofNode): ProofNode {
  if (isAndNode(original)) {
    return andAssociativity(original)
  }
  else if (isOrNode(original)) {
    return orAssociativity(original)
  }
  return ERROR_NODE
}

/**
 * Distributivity of ∨ over ∧: A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)
 * @param original is an Or node of the form A ∨ (B ∧ C) or (B ∧ C) ∨ A
 * @return an And node (A ∨ B) ∧ (A ∨ C), or ERROR_NODE if not applicable
 */
function orOverAndDistributivity(original: ProofNode): ProofNode {
  if (!isOrNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  if (isAndNode(original.right)) {
    // A ∨ (B ∧ C) → (A ∨ B) ∧ (A ∨ C)
    const a = original.left;
    const b = original.right.left;
    const c = original.right.right;
    if (!b || !c) return ERROR_NODE;
    const aOrB = createOrNode(
      `${checkParentheses(a)} ∨ ${checkParentheses(b)}`,
      false,
      a,
      b,
      undefined
    );
    const aOrC = createOrNode(
      `${checkParentheses(a)} ∨ ${checkParentheses(c)}`,
      false,
      a,
      c,
      undefined
    );
    const text = `${checkParentheses(aOrB)} ∧ ${checkParentheses(aOrC)}`;
    return createAndNode(text, false, aOrB, aOrC, [original]);
  }
  if (isAndNode(original.left)) {
    // (B ∧ C) ∨ A → (B ∨ A) ∧ (C ∨ A) which we write as (A ∨ B) ∧ (A ∨ C) for consistency
    const a = original.right;
    const b = original.left.left;
    const c = original.left.right;
    if (!b || !c) return ERROR_NODE;
    const aOrB = createOrNode(
      `${checkParentheses(a)} ∨ ${checkParentheses(b)}`,
      false,
      a,
      b,
      undefined
    );
    const aOrC = createOrNode(
      `${checkParentheses(a)} ∨ ${checkParentheses(c)}`,
      false,
      a,
      c,
      undefined
    );
    const text = `${checkParentheses(aOrB)} ∧ ${checkParentheses(aOrC)}`;
    return createAndNode(text, false, aOrB, aOrC, [original]);
  }
  return ERROR_NODE;
}

/**
 * Distributivity of ∧ over ∨: A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)
 * @param original is an And node of the form A ∧ (B ∨ C) or (B ∨ C) ∧ A
 * @return an Or node (A ∧ B) ∨ (A ∧ C), or ERROR_NODE if not applicable
 */
function andOverOrDistributivity(original: ProofNode): ProofNode {
  if (!isAndNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  if (isOrNode(original.right)) {
    // A ∧ (B ∨ C) → (A ∧ B) ∨ (A ∧ C)
    const a = original.left;
    const b = original.right.left;
    const c = original.right.right;
    if (!b || !c) return ERROR_NODE;
    const aAndB = createAndNode(
      `${checkParentheses(a)} ∧ ${checkParentheses(b)}`,
      false,
      a,
      b,
      undefined
    );
    const aAndC = createAndNode(
      `${checkParentheses(a)} ∧ ${checkParentheses(c)}`,
      false,
      a,
      c,
      undefined
    );
    const text = `${checkParentheses(aAndB)} ∨ ${checkParentheses(aAndC)}`;
    return createOrNode(text, false, aAndB, aAndC, [original]);
  }
  if (isOrNode(original.left)) {
    // (B ∨ C) ∧ A → (A ∧ B) ∨ (A ∧ C)
    const a = original.right;
    const b = original.left.left;
    const c = original.left.right;
    if (!b || !c) return ERROR_NODE;
    const aAndB = createAndNode(
      `${checkParentheses(a)} ∧ ${checkParentheses(b)}`,
      false,
      a,
      b,
      undefined
    );
    const aAndC = createAndNode(
      `${checkParentheses(a)} ∧ ${checkParentheses(c)}`,
      false,
      a,
      c,
      undefined
    );
    const text = `${checkParentheses(aAndB)} ∨ ${checkParentheses(aAndC)}`;
    return createOrNode(text, false, aAndB, aAndC, [original]);
  }
  return ERROR_NODE;
}

/**
 * Combines the two distributivity functions into one
 * @param original is the original node
 * @returns returns a valid node if the operation is valid, ERROR_NODE if not
 */
export function distributivity(original: ProofNode): ProofNode {
  if (isAndNode(original)) {
   return andOverOrDistributivity(original)
  } 
  else if (isOrNode(original)) {
    return orOverAndDistributivity(original)
  }
  return ERROR_NODE
}

/**
 * Indempotent Or/And [P V P] = P
 * @param original is the original node. should be an Or node
 * @returns returns errror node if invalid operation
 */
export function indempotent(original: ProofNode): ProofNode {
  if (isOrNode(original)) {
    if (sameNode(original.left,original.right)) {
      return createResultNode(original.left, [original])
    }
  
    return ERROR_NODE;
  }
  else if (isAndNode(original)) {
    if (sameNode(original.left,original.right)) {
      return createResultNode(original.left, [original])
    }
    return ERROR_NODE;
  }
  return ERROR_NODE;
}


/**
 * De Morgan's Law (s)
 */


// Axioms list
export const Axioms: Axiom[] = [
  {
    id: "1",
    text: "Hypothetical Syllogism",
    selected: false,
    description: "[(A → B) ∧ (B → C)] → (A → C)",
    applyType: "1",
    apply: hypotheticalSyllogism,
  } satisfies Axiom,
  {
    id: "2",
    text: "Disjunctive Syllogism",
    selected: false,
    description: "[(A ∨ B) ∧ ¬(A)] → B",
    applyType: "1",
    apply: disjunctiveSyllogism,
  } satisfies Axiom,
  {
    id: "3",
    text: "Modus Ponens",
    selected: false,
    description: "[A ∧ (A → B)] → B",
    applyType: "1",
    apply: modusPonens,
  } satisfies Axiom,
  {
    id: "4",
    text: "Modus Tollens",
    selected: false,
    description: "[(A → B) ∧ ¬B] → ¬A",
    applyType: "1",
    apply: modusTollens,
  } satisfies Axiom,
  {
    id: "6",
    text: "Simplification",
    selected: false,
    description: "(A ∧ B) → A",
    applyType: "2",
    apply: simplification,
  } satisfies Axiom,
  {
    id: "7",
    text: "Constructive Dilemma (OR)",
    selected: false,
    description: "[(A → B) ∧ (C → D)] → ((A ∨ B) → (C ∨ D))",
    applyType: "1",
    apply: constructiveDilemmaOr,
  } satisfies Axiom,
  {
    id: "8",
    text: "Constructive Dilemma (AND)",
    selected: false,
    description: "[(A → B) ∧ (C → D)] → ((A ∧ B) → (C ∧ D))",
    applyType: "1",
    apply: constructiveDilemmaAnd,
  } satisfies Axiom,
  {
    id: "9",
    text: "Addition",
    selected: false,
    description: "A → (A ∨ B)",
    applyType: "3",
    apply: addition,
  } satisfies Axiom,
  {
    id: "10",
    text: "Conjunction",
    selected: false,
    description: "[A ∧ B] → (A ∧ B)",
    applyType: "3",
    apply: conjunction,
  } satisfies Axiom,
  {
    id: "11",
    text: "Double Negation",
    selected: false,
    description: "¬¬A ≡ A",
    applyType: "4",
    apply: doubleNegation,
  } satisfies Axiom,
  {
    id: "12",
    text: "Commutativity",
    selected: false,
    description: "(A ∧ B) ≡ (B ∧ A)",
    description2: "(A ∨ B) ≡ (B ∨ A)",
    applyType: "4",
    apply: andCommutativity,
  } satisfies Axiom,
  {
    id: "15",
    text: "Associativity",
    selected: false,
    description: "(A ∨ B) ∨ C ≡ A ∨ (B ∨ C)",
    description2: "(A ∧ B) ∧ C ≡ A ∧ (B ∧ C)",
    applyType: "4",
    apply: associativity,
  } satisfies Axiom,
  {
    id: "16",
    text: "Distributivity",
    selected: false,
    description: "A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)",
    description2: "A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)",
    applyType: "4",
    apply: distributivity,
  } satisfies Axiom,
  {
    id: "17",
    text: "Idempotent",
    selected: false,
    description: "(A ∨ A) ≡ A",
    description2: "(A ∧ A) ≡ A",
    applyType: "4",
    apply: indempotent,
  } satisfies Axiom,
];
