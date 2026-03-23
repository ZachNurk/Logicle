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
  isAndNode,
  isOrNode,
  isIffNode,
  createResultNode,
  createOrNode,
  createAndNode,
  checkParentheses,
} from "./ProofNode";
import type { ImplicationNode, NotNode, AndNode } from "./ProofNode";

/** Type 1: premises + selected. Type 2: premises + side. Type 3: original + addition. Type 4: original only. Type 5: premises + selected + connective. Type 6: original + option. Type 7: premises + selected + option (e.g. Implication common consequent/antecedent). */
export type AxiomApplyType = "1" | "2" | "3" | "4" | "5" | "6" | "7";

export type Axiom = {
  id: string;
  text: string;
  selected: boolean;
  description: string;
  description2?: string;
  /** Which apply signature: "1" = premises + selected, "2" = premises + side, "3" = original + addition, "4" = original only, "5" = premises + selected + connective, "6" = original + option, "7" = premises + selected + option. */
  applyType: AxiomApplyType;
  /** For applyType "6" or "7", passed as option argument to apply. */
  applyOption?: string;
  apply?:
    | ((premises: AndNode, selected: ProofNode[]) => ProofNode)
    | ((premises: AndNode, side: "left" | "right") => ProofNode)
    | ((original: ProofNode, addition: ProofNode) => ProofNode)
    | ((original: ProofNode) => ProofNode)
    | ((premises: AndNode, selected: ProofNode[], connective: "or" | "and") => ProofNode)
    | ((original: ProofNode, option: string) => ProofNode)
    | ((premises: AndNode, selected: ProofNode[], option: string) => ProofNode);
};

/** Throws if premises is not a valid And node with left and right. */
function checkPremises(premises: AndNode): boolean {
  return isAndNode(premises) && !!premises.left && !!premises.right;
}

/**
 * Hypothetical Syllogism [(p → q) ∧ (q → r)] → (p → r)
 * @param premises And node whose left and right are the two implication nodes
 * @param selected is the nodes that are selected (needed becuase we dont know if passed node is true and or constructed and)
 * @return returns a proofnode of the result, ERROR_NODE if invalid calculation
 * @throws Error if premises are undefined
 */
export function hypotheticalSyllogism(premises: AndNode, selected: ProofNode[]): ProofNode {
  if (!checkPremises(premises)) return ERROR_NODE;
  const a = premises.left;
  const b = premises.right;

  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }

  if (sameNode(a.right, b.left)) {
    return createImplicationNode(false, a.left, b.right, selected);
  }
  if (sameNode(a.left, b.right)) {
    return createImplicationNode(false, b.left, a.right, selected);
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
  if (!checkPremises(premises)) {
    return ERROR_NODE;
  } 
 
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
  
  if (!checkPremises(premises)) return ERROR_NODE;
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
  if (!checkPremises(premises)) return ERROR_NODE;
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
  return createNotNode(false, implication.left, selected);
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
  if (!checkPremises(premises)) return ERROR_NODE;
  if (!side) return ERROR_NODE;
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
 * @param selected are the nodes selected to make the dilemma
 * @return returns the node result, ERROR_NODE if unsuccessful
 */
export function constructiveDilemmaOr(premises: AndNode, selected: ProofNode[]): ProofNode {
  if (!checkPremises(premises)) return ERROR_NODE;
  const a = premises.left;
  const b = premises.right;
  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }
  const nodeA = createOrNode(false, a.left, a.right, undefined);
  const nodeB = createOrNode(false, b.left, b.right, undefined);
  return createImplicationNode(false, nodeA, nodeB, selected);
}

/**
 * Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)]
 * @param premises are the premises to use
 * @param selected are the nodes selected to make the dilemma
 * @return returns a proofnode of the result, ERROR_NODE if invalid calculation
 */
export function constructiveDilemmaAnd(premises: AndNode, selected: ProofNode[]): ProofNode {
  if (!checkPremises(premises)) return ERROR_NODE;
  const a = premises.left;
  const b = premises.right;
  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }
  const nodeA = createAndNode(false, a.left, a.right, undefined);
  const nodeB = createAndNode(false, b.left, b.right, undefined);
  return createImplicationNode(false, nodeA, nodeB, selected);
}

/**
 * Constructive Dilemma: [(p → q) ∧ (r → s)] → [(p ⋄ r) → (q ⋄ s)] where ⋄ is OR or AND.
 * @param premises are the premises to use
 * @param selected are the nodes selected to make the dilemma
 * @param connective "or" for (p ∨ r) → (q ∨ s), "and" for (p ∧ r) → (q ∧ s)
 * @return the result node, or ERROR_NODE if invalid
 */
export function constructiveDilemma(
  premises: AndNode,
  selected: ProofNode[],
  connective: "or" | "and"
): ProofNode {
  if (connective === "or") return constructiveDilemmaOr(premises, selected);
  return constructiveDilemmaAnd(premises, selected);
}

/**
 * Addition: p → (p ∨ q)
 * @param original is the original node to add to
 * @param addition is the node we are adding (designed by the UI)
 */
export function addition(original: ProofNode, addition: ProofNode): ProofNode {
  return createOrNode(false, original, addition, [original]);
}

/**
 * Conjunction: p → (p ∧ q)
 * @param original is the original node to add to
 * @param addition is the node we are adding (designed by the UI)
 */
export function conjunction(original: ProofNode): ProofNode {
  return original
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
  return createOrNode(false, original.right, original.left, [original]);
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
  return createAndNode(false, original.right, original.left, [original]);
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
    const inner = createAndNode(false, original.left.right, original.right, undefined);
    return createAndNode(false, original.left.left, inner, [original]);
  }
  if (isAndNode(original.right)) {
    // (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C)
    const inner = createAndNode(false, original.left, original.right.left, undefined);
    return createAndNode(false, inner, original.right.right, [original]);
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
    const inner = createOrNode(false, original.left.right, original.right, undefined);
    return createOrNode(false, original.left.left, inner, [original]);
  }
  if (isOrNode(original.right)) {
    // (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C)
    const inner = createOrNode(false, original.left, original.right.left, undefined);
    return createOrNode(false, inner, original.right.right, [original]);
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
    const aOrB = createOrNode(false, a, b, undefined);
    const aOrC = createOrNode(false, a, c, undefined);
    return createAndNode(false, aOrB, aOrC, [original]);
  }
  if (isAndNode(original.left)) {
    // (B ∧ C) ∨ A → (B ∨ A) ∧ (C ∨ A) which we write as (A ∨ B) ∧ (A ∨ C) for consistency
    const a = original.right;
    const b = original.left.left;
    const c = original.left.right;
    if (!b || !c) return ERROR_NODE;
    const aOrB = createOrNode(false, a, b, undefined);
    const aOrC = createOrNode(false, a, c, undefined);
    return createAndNode(false, aOrB, aOrC, [original]);
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
    const aAndB = createAndNode(false, a, b, undefined);
    const aAndC = createAndNode(false, a, c, undefined);
    return createOrNode(false, aAndB, aAndC, [original]);
  }
  if (isOrNode(original.left)) {
    // (B ∨ C) ∧ A → (A ∧ B) ∨ (A ∧ C)
    const a = original.right;
    const b = original.left.left;
    const c = original.left.right;
    if (!b || !c) return ERROR_NODE;
    const aAndB = createAndNode(false, a, b, undefined);
    const aAndC = createAndNode(false, a, c, undefined);
    return createOrNode(false, aAndB, aAndC, [original]);
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
 * De Morgan's (∨): ¬(p ∨ q) ≡ (¬p ∧ ¬q)
 * @param original must be a NotNode containing an OrNode
 */
function deMorganOr(original: ProofNode): ProofNode {
  if (!isNotNode(original)) {
    return ERROR_NODE;
  } 
  const inner = original.contains;
  if (!isOrNode(inner) || !inner.left || !inner.right) {
    return ERROR_NODE;
  } 

  let left;
  let right;
  if (isNotNode(inner.left)) {
    left = inner.left.contains
  } else {
     left = createNotNode(false, inner.left, undefined);
  }
  if (isNotNode(inner.right)) {
    right = inner.right.contains
  } else {
    right = createNotNode(false, inner.right, undefined);
  }


  return createAndNode(false, left, right, [original]);
}

/**
 * De Morgan's (∧): ¬(p ∧ q) ≡ (¬p ∨ ¬q)
 * @param original must be a NotNode containing an AndNode
 */
function deMorganAnd(original: ProofNode): ProofNode {
  if (!isNotNode(original)) {
    return ERROR_NODE;
  } 
  const inner = original.contains;
  if (!isAndNode(inner) || !inner.left || !inner.right) {
    return ERROR_NODE;
  } 

  let left;
  let right;
  if (isNotNode(inner.left)) {
    left = inner.left.contains
  } else {
     left = createNotNode(false, inner.left, undefined);
  }
  if (isNotNode(inner.right)) {
    right = inner.right.contains
  } else {
    right = createNotNode(false, inner.right, undefined);
  }

  
  return createOrNode(false, left, right, [original]);
}

/**
 * De Morgan's Laws: dispatches to OR or AND variant based on the negated node type.
 */
export function deMorgan(original: ProofNode): ProofNode {
  if (!isNotNode(original)) {
    return ERROR_NODE;
  } 
  const inner = original.contains;
  if (isOrNode(inner)) {
    return deMorganOr(original);
  } 
  if (isAndNode(inner)) {
    return deMorganAnd(original);
  } 
  return ERROR_NODE;
}

/**
 * Contrapositive ( (p → q) ≡ (¬q → ¬p) )
 * @param original is the original node
 * @return returns an error node if invalid operation, proofnode if valid
 */
export function contrapositive(original: ProofNode) : ProofNode {
  if (!isImplicationNode(original)) {
    return ERROR_NODE
  }
  
  let left;
  let right;
  if (isNotNode(original.left)) {
    left = original.left.contains
  } else {
     left = createNotNode(false, original.left, undefined);
  }
  if (isNotNode(original.right)) {
    right = original.right.contains
  } else {
    right = createNotNode(false, original.right, undefined);
  }

  return createImplicationNode(false, right, left, [original]);
}

/**
 * Conditional Identity (→): (p → q) ≡ (¬p ∨ q)
 * @param original must be an ImplicationNode
 */
//TODO FLAG
export function conditionalIdentityImplication(original: ProofNode): ProofNode {
  if (!isImplicationNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  } 
  let left;
  if (isNotNode(original.left)) {
    left = original.left.contains
  } else {
     left = createNotNode(false, original.left, undefined);
  }

  return createOrNode(false, left, original.right, [original]);
}

/**
 * Conditional Identity (↔): p ↔ q ≡ (p → q) ∧ (q → p)
 * @param original must be an IffNode
 */
export function conditionalIdentityIff(original: ProofNode): ProofNode {
  if (!isIffNode(original) || !original.left || !original.right) {
    return ERROR_NODE;
  }
  const pImplQ = createImplicationNode(false, original.left, original.right, undefined);
  const qImplP = createImplicationNode(false, original.right, original.left, undefined);
  return createAndNode(false, pImplQ, qImplP, [original]);
}




/**
     * Implication #32: [(p → r) ∧ (q → r)] → ((p ∨ q) → r)
 * @param premises And node containing two implication nodes
 * @param selected selected nodes used as parents for the result
 */
export function implicationCommonConsequent(premises: AndNode, selected: ProofNode[]): ProofNode {
  if (!checkPremises(premises)) return ERROR_NODE;
  const a = premises.left;
  const b = premises.right;

  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }
  if (!sameNode(a.right, b.right)) {
    return ERROR_NODE;
  }

  const left = createOrNode(false, a.left, b.left, undefined);
  return createImplicationNode(false, left, a.right, selected);
}

/**
 * Implication #33: [(p → q) ∧ (p → r)] → (p → (q ∧ r))
 * @param premises And node containing two implication nodes
 * @param selected selected nodes used as parents for the result
 */
export function implicationCommonAntecedent(premises: AndNode, selected: ProofNode[]): ProofNode {
  if (!checkPremises(premises)) return ERROR_NODE;
  const a = premises.left;
  const b = premises.right;

  if (!(isImplicationNode(a) && isImplicationNode(b))) {
    return ERROR_NODE;
  }
  if (!sameNode(a.left, b.left)) {
    return ERROR_NODE;
  }

  const right = createAndNode(false, a.right, b.right, undefined);
  return createImplicationNode(false, a.left, right, selected);
}

/**
 * Implication wrapper:
 * first tries common consequent (#32), then common antecedent (#33).
 */
export function implication(premises: AndNode, selected: ProofNode[]): ProofNode {
  const consequentResult = implicationCommonConsequent(premises, selected);
  if (!sameNode(consequentResult, ERROR_NODE)) {
    return consequentResult;
  }
  return implicationCommonAntecedent(premises, selected);
}

/**
 * Implication with variant: "consequent" for common consequent, "antecedent" for common antecedent.
 */
export function implicationCommonWithVariant(
  premises: AndNode,
  selected: ProofNode[],
  variant: string
): ProofNode {
  if (variant !== "antecedent" && variant !== "consequent") {
    return implication(premises, selected);
  }
  if (variant === "antecedent") {
    return implicationCommonAntecedent(premises, selected);
  }
  return implicationCommonConsequent(premises, selected);
}

// Axioms list

// 32. [(p → r) ∧ (q → r)] ≡ [(p ∨ q) → r)] . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Implication
// 33. [(p → q) ∧ (p → r)] ≡ [p → (q ∧ r)] . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . Implication

export const Axioms: Axiom[] = [
  {
    id: "HS",
    text: "Hypothetical Syllogism",
    selected: false,
    description: "[(A → B) ∧ (B → C)] → (A → C)",
    applyType: "1",
    apply: hypotheticalSyllogism,
  } satisfies Axiom,
  {
    id: "DS",
    text: "Disjunctive Syllogism",
    selected: false,
    description: "[(A ∨ B) ∧ ¬(A)] → B",
    applyType: "1",
    apply: disjunctiveSyllogism,
  } satisfies Axiom,
  {
    id: "MP",
    text: "Modus Ponens",
    selected: false,
    description: "[A ∧ (A → B)] → B",
    applyType: "1",
    apply: modusPonens,
  } satisfies Axiom,
  {
    id: "MT",
    text: "Modus Tollens",
    selected: false,
    description: "[(A → B) ∧ ¬B] → ¬A",
    applyType: "1",
    apply: modusTollens,
  } satisfies Axiom,
  {
    id: "Simp",
    text: "Simplification",
    selected: false,
    description: "(A ∧ B) → A",
    applyType: "2",
    apply: simplification,
  } satisfies Axiom,
  {
    id: "CD",
    text: "Constructive Dilemma",
    selected: false,
    description: "[(A → B) ∧ (C → D)] → ((A ∨ C) → (B ∨ D))",
    description2: "[(A → B) ∧ (C → D)] → ((A ∧ C) → (B ∧ D))",
    applyType: "5",
    apply: constructiveDilemma,
  } satisfies Axiom,
  {
    id: "Add",
    text: "Addition",
    selected: false,
    description: "A → (A ∨ B)",
    applyType: "3",
    apply: addition,
  } satisfies Axiom,
  {
    id: "Conj",
    text: "Conjunction",
    selected: false,
    description: "[A ∧ B] → (A ∧ B)",
    applyType: "4",
    apply: conjunction,
  } satisfies Axiom,
  {
    id: "DN",
    text: "Double Negation",
    selected: false,
    description: "¬¬A ≡ A",
    applyType: "4",
    apply: doubleNegation,
  } satisfies Axiom,
  {
    id: "Comm",
    text: "Commutativity",
    selected: false,
    description: "(A ∧ B) ≡ (B ∧ A)",
    description2: "(A ∨ B) ≡ (B ∨ A)",
    applyType: "4",
    apply: commutativity,
  } satisfies Axiom,
  {
    id: "Asso",
    text: "Associativity",
    selected: false,
    description: "(A ∨ B) ∨ C ≡ A ∨ (B ∨ C)",
    description2: "(A ∧ B) ∧ C ≡ A ∧ (B ∧ C)",
    applyType: "4",
    apply: associativity,
  } satisfies Axiom,
  {
    id: "Dist",
    text: "Distributivity",
    selected: false,
    description: "A ∨ (B ∧ C) ≡ (A ∨ B) ∧ (A ∨ C)",
    description2: "A ∧ (B ∨ C) ≡ (A ∧ B) ∨ (A ∧ C)",
    applyType: "4",
    apply: distributivity,
  } satisfies Axiom,
  {
    id: "Idem",
    text: "Idempotent",
    selected: false,
    description: "(A ∨ A) ≡ A",
    description2: "(A ∧ A) ≡ A",
    applyType: "4",
    apply: indempotent,
  } satisfies Axiom,
  {
    id: "CP",
    text: "Contrapositive",
    selected: false,
    description: "(A → B) ≡ (¬B → ¬A)",
    applyType: "4",
    apply: contrapositive,
  } satisfies Axiom,
  {
    id: "DM",
    text: "De Morgan",
    selected: false,
    description: "¬(A ∨ B) ≡ (¬A ∧ ¬B)",
    description2: "¬(A ∧ B) ≡ (¬A ∨ ¬B)",
    applyType: "4",
    apply: deMorgan,
  } satisfies Axiom,
  {
    id: "CI",
    text: "Conditional Identity (→)",
    selected: false,
    description: "(A → B) ≡ (¬A ∨ B)",
    applyType: "4",
    applyOption: "imp",
    apply: conditionalIdentityImplication,
  } satisfies Axiom,
  {
    id: "31",
    text: "Conditional Identity (↔)",
    selected: false,
    description: "A ↔ B ≡ (A → B) ∧ (B → A)",
    applyType: "4",
    applyOption: "iff",
    apply: conditionalIdentityIff,
  } satisfies Axiom,
  {
    id: "32",
    text: "Implication",
    selected: false,
    description: "[(A → C) ∧ (B → C)] → ((A ∨ B) → C)",
    description2: "[(A → B) ∧ (A → C)] → (A → (B ∧ C))",
    applyType: "7",
    applyOption: "consequent",
    apply: implication,
  } satisfies Axiom,
];
