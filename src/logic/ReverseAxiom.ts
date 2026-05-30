import type { ProofNode } from "./ProofNode";
import {
  sameNode,
  isImplicationNode,
  ERROR_NODE,
  isNotNode,
  negateNode,
  createImplicationNode,
  isAndNode,
  isOrNode,
  isIffNode,
  createOrNode,
  createAndNode,
} from "./ProofNode";
import type { BinaryNode } from "./ProofNode";
import { conditionalIdentityImplication } from "./Axiom";

export type ReverseAxiomContext = {
  replaceNode: (node: ProofNode, ...added: ProofNode[]) => boolean;
  generateAtom: (canNegate?: boolean) => ProofNode;
  createRandomAndNode: (left: ProofNode, right: ProofNode) => ProofNode;
  createRandomOrNode: (left: ProofNode, right: ProofNode) => ProofNode;
};

export type ReverseRule = (
  ctx: ReverseAxiomContext,
  node: ProofNode,
) => boolean;

/** [(p → q) ∧ (q → r)] → (p → r) */
export function revHS(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isImplicationNode(node)) return false;
  const nodeLeft = node.left;
  const nodeRight = node.right;
  const joiner = ctx.generateAtom();
  const nodeA: ProofNode = createImplicationNode(
    false,
    nodeLeft,
    joiner,
    undefined,
    true,
  );
  const nodeB: ProofNode = createImplicationNode(
    false,
    joiner,
    nodeRight,
    undefined,
    true,
  );
  return ctx.replaceNode(node, nodeA, nodeB);
}

/** Disjunctive Syllogism [(p ∨ q) ∧ ¬p] → q */
export function revDS(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  const joiner = ctx.generateAtom();
  const negJoiner = negateNode(false, joiner, undefined, true);
  const nodeA = ctx.createRandomOrNode(joiner, node);
  return ctx.replaceNode(node, negJoiner, nodeA);
}

/** from P and (P -> Q), infer Q */
export function revMP(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  const joiner = ctx.generateAtom();
  const nodeA: ProofNode = joiner;
  const nodeB: ProofNode = createImplicationNode(
    false,
    joiner,
    node,
    undefined,
    true,
  );
  return ctx.replaceNode(node, nodeA, nodeB);
}

/** Modus Tollens: [¬q ∧ (p → q)] → ¬p */
export function revMT(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  const joiner = ctx.generateAtom();
  const negJoiner = negateNode(false, joiner, undefined, true);
  const negOriginal = negateNode(false, node);
  const nodeB = createImplicationNode(
    false,
    negOriginal,
    joiner,
    undefined,
    true,
  );
  return ctx.replaceNode(node, negJoiner, nodeB);
}

/** Simplification: (p ∧ q) → p */
export function revSimp(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  const joiner = ctx.generateAtom();
  const nodeA = ctx.createRandomAndNode(node, joiner);
  return ctx.replaceNode(node, nodeA);
}

/** Constructive Dilemma (OR): [(p → q) ∧ (r → s)] → [(p ∨ r) → (q ∨ s)] */
function revCDOr(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isOrNode(node.left) || !isOrNode(node.right))
    return false;
  const antecedentLeft = node.left.left;
  const antecedentRight = node.left.right;
  const consequentLeft = node.right.left;
  const consequentRight = node.right.right;

  const newAndNodeLeft = createImplicationNode(
    false,
    antecedentLeft,
    consequentLeft,
    undefined,
    true,
  );
  const newAndNodeRight = createImplicationNode(
    false,
    antecedentRight,
    consequentRight,
    undefined,
    true,
  );

  const newAndNode = ctx.createRandomAndNode(newAndNodeLeft, newAndNodeRight);
  return ctx.replaceNode(node, newAndNode);
}

/** Constructive Dilemma (AND): [(p → q) ∧ (r → s)] → [(p ∧ r) → (q ∧ s)] */
function revCDAnd(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (!isImplicationNode(node) || !isAndNode(node.left) || !isAndNode(node.right))
    return false;
  const antecedentLeft = node.left.left;
  const antecedentRight = node.left.right;
  const consequentLeft = node.right.left;
  const consequentRight = node.right.right;

  const newAndNodeLeft = createImplicationNode(
    false,
    antecedentLeft,
    consequentLeft,
    undefined,
    true,
  );
  const newAndNodeRight = createImplicationNode(
    false,
    antecedentRight,
    consequentRight,
    undefined,
    true,
  );

  const newAndNode = ctx.createRandomAndNode(newAndNodeLeft, newAndNodeRight);
  return ctx.replaceNode(node, newAndNode);
}

/** Constructive Dilemma: [(p → q) ∧ (r → s)] → [(p ⋄ r) → (q ⋄ s)] where ⋄ is OR or AND. */
export function revCD(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (!revCDOr(ctx, node)) {
    return revCDAnd(ctx, node);
  }
  return true;
}

/**
 * Reverse the addition of a new node. If both sides aren't not nodes, we randomly pick
 * a side to remove. If one side is a not node, we remove the non not node by adding the not
 * node back to the curNodes set.
 */
export function revAdd(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (!isOrNode(node)) return false;
  if (isNotNode(node.left) && isNotNode(node.right)) return false;

  if (!isNotNode(node.left) && !isNotNode(node.right)) {
    const sideToKeep = Math.random() < 0.5 ? node.left : node.right;
    return ctx.replaceNode(node, sideToKeep);
  }
  if (isNotNode(node.left)) {
    return ctx.replaceNode(node, node.left);
  }
  return ctx.replaceNode(node, node.right);
}

/** Conjunction: p → (p ∧ q) */
export function revConj(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (!isAndNode(node)) return false;
  return ctx.replaceNode(node, node.left, node.right);
}

/**
 * Absorption:
 * - P ∨ (P ∧ Q) ≡ P
 * (and symmetric variants where the repeated P is on the right side).
 */
export function revAbso(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (
    isAndNode(node) &&
    node.left &&
    node.right &&
    (isAndNode(node.left) ||
      isAndNode(node.right) ||
      isOrNode(node.left) ||
      isOrNode(node.right))
  ) {
    return false;
  }

  const absorbedNode = ctx.generateAtom();
  const absorbedAnd = ctx.createRandomAndNode(node, absorbedNode);
  const revAbsoResult = ctx.createRandomOrNode(absorbedAnd, node);
  return ctx.replaceNode(node, revAbsoResult);
}

/**
 * Reverse AND associativity: (A ∧ (B ∧ C)) → ((A ∧ B) ∧ C) and
 * ((A ∧ B) ∧ C) → (A ∧ (B ∧ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revAndAssociativity(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isAndNode(node) || !node.left || !node.right) return false;

  const { left, right } = node;
  const canReassocFromLeft = isAndNode(left);
  const canReassocFromRight = isAndNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return false;

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  let result: ProofNode;
  if (useLeftBranch) {
    if (!isAndNode(left)) return false;
    const inner = createAndNode(false, left.right, right, undefined, true);
    result = createAndNode(false, left.left, inner, undefined, true);
  } else {
    if (!isAndNode(right)) return false;
    const inner = createAndNode(false, left, right.left, undefined, true);
    result = createAndNode(false, inner, right.right, undefined, true);
  }

  return ctx.replaceNode(node, result);
}

/**
 * Reverse OR associativity: (A ∨ (B ∨ C)) → ((A ∨ B) ∨ C) and
 * ((A ∨ B) ∨ C) → (A ∨ (B ∨ C)) — inverse of forward re-bracketing in Axiom.ts.
 */
export function revOrAssociativity(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isOrNode(node) || !node.left || !node.right) return false;

  const { left, right } = node;
  const canReassocFromLeft = isOrNode(left);
  const canReassocFromRight = isOrNode(right);
  if (!canReassocFromLeft && !canReassocFromRight) return false;

  const useLeftBranch =
    canReassocFromLeft && canReassocFromRight
      ? Math.random() < 0.5
      : canReassocFromLeft;

  let result: ProofNode;
  if (useLeftBranch) {
    if (!isOrNode(left)) return false;
    const inner = createOrNode(false, left.right, right, undefined, true);
    result = createOrNode(false, left.left, inner, undefined, true);
  } else {
    if (!isOrNode(right)) return false;
    const inner = createOrNode(false, left, right.left, undefined, true);
    result = createOrNode(false, inner, right.right, undefined, true);
  }

  return ctx.replaceNode(node, result);
}

/**
 * Reverse distributivity (simple cases only):
 * (A ∨ B) ∧ (A ∨ C) → A ∨ (B ∧ C) and (A ∧ B) ∨ (A ∧ C) → A ∧ (B ∨ C).
 */
export function revDistributivity(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  function sharedBinaryParts(
    left: BinaryNode,
    right: BinaryNode,
  ): { shared: ProofNode; other1: ProofNode; other2: ProofNode } | null {
    for (const s1 of [left.left, left.right] as const) {
      for (const s2 of [right.left, right.right] as const) {
        if (sameNode(s1, s2)) {
          const other1 = sameNode(left.left, s1) ? left.right : left.left;
          const other2 = sameNode(right.left, s2) ? right.right : right.left;
          return { shared: s1, other1, other2 };
        }
      }
    }
    return null;
  }

  let result: ProofNode | null = null;

  if (isAndNode(node) && isOrNode(node.left) && isOrNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = ctx.createRandomAndNode(parts.other1, parts.other2);
      result = ctx.createRandomOrNode(parts.shared, bc);
    }
  } else if (isOrNode(node) && isAndNode(node.left) && isAndNode(node.right)) {
    const parts = sharedBinaryParts(node.left, node.right);
    if (parts) {
      const bc = ctx.createRandomOrNode(parts.other1, parts.other2);
      result = ctx.createRandomAndNode(parts.shared, bc);
    }
  }

  if (!result) return false;
  return ctx.replaceNode(node, result);
}

/** [P V P] = P */
export function revIndempotent(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  const dup = createOrNode(false, node, node, undefined, true);
  return ctx.replaceNode(node, dup);
}

export function revDeMorgan(ctx: ReverseAxiomContext, node: ProofNode): boolean {
  if (!isAndNode(node) && !isOrNode(node)) {
    return false;
  }

  const newLeft = negateNode(false, node.left, undefined, true);
  const newRight = negateNode(false, node.right, undefined, true);

  let result: ProofNode;
  if (isAndNode(node)) {
    const inner = createOrNode(false, newLeft, newRight, undefined, true);
    result = negateNode(false, inner, undefined, true);
  } else {
    const inner = createAndNode(false, newLeft, newRight, undefined, true);
    result = negateNode(false, inner, undefined, true);
  }

  return ctx.replaceNode(node, result);
}

export function revContrapositive(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isImplicationNode(node)) return false;
  const newLeft = negateNode(false, node.right, undefined, true);
  const newRight = negateNode(false, node.left, undefined, true);
  const newNode = createImplicationNode(
    false,
    newLeft,
    newRight,
    undefined,
    true,
  );
  return ctx.replaceNode(node, newNode);
}

export function revConditionalIdentityImplication(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isImplicationNode(node)) return false;
  const newNode = conditionalIdentityImplication(node);
  if (sameNode(newNode, ERROR_NODE)) return false;
  return ctx.replaceNode(node, newNode);
}

export function revConditionalIdentityOr(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isOrNode(node)) return false;
  const newNode = conditionalIdentityImplication(node);
  if (sameNode(newNode, ERROR_NODE)) return false;
  return ctx.replaceNode(node, newNode);
}

export function revConditionalIdentityIff(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isIffNode(node)) return false;
  const newLeft = negateNode(false, node.left, undefined, true);
  const newRight = negateNode(false, node.right, undefined, true);
  const newNode = createImplicationNode(
    false,
    newLeft,
    newRight,
    undefined,
    true,
  );
  return ctx.replaceNode(node, newNode);
}

export function revImplication(
  ctx: ReverseAxiomContext,
  node: ProofNode,
): boolean {
  if (!isImplicationNode(node) && !isAndNode(node)) return false;

  let resNode = null;
  if (isImplicationNode(node)) {
    if (isOrNode(node.left)) {
      const newLeft = createImplicationNode(
        false,
        node.left.left,
        node.right,
        undefined,
        true,
      );
      const newRight = createImplicationNode(
        false,
        node.left.right,
        node.right,
        undefined,
        true,
      );
      resNode = createAndNode(false, newLeft, newRight, undefined, true);
    } else if (isAndNode(node.right)) {
      const newLeft = createImplicationNode(
        false,
        node.left,
        node.right.left,
        undefined,
        true,
      );
      const newRight = createImplicationNode(
        false,
        node.left,
        node.right.right,
        undefined,
        true,
      );
      resNode = createAndNode(false, newLeft, newRight, undefined, true);
    }
  } else if (
    isAndNode(node) &&
    isImplicationNode(node.left) &&
    isImplicationNode(node.right)
  ) {
    if (sameNode(node.left.left, node.right.left)) {
      const newRight = createAndNode(
        false,
        node.left.right,
        node.right.right,
        undefined,
        true,
      );
      resNode = createImplicationNode(
        false,
        node.left.left,
        newRight,
        undefined,
        true,
      );
    } else if (sameNode(node.left.right, node.right.right)) {
      const newLeft = createOrNode(
        false,
        node.left.left,
        node.right.left,
        undefined,
        true,
      );
      resNode = createImplicationNode(
        false,
        newLeft,
        node.left.right,
        undefined,
        true,
      );
    }
  }
  if (!resNode) return false;
  return ctx.replaceNode(node, resNode);
}

const ATOM_RULES: ReverseRule[] = [
  revMP,
  revMT,
  revSimp,
  revAbso,
  revIndempotent,
];
const IMPLICATION_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revHS,
  revCD,
  revImplication,
  revConditionalIdentityImplication,
  revContrapositive,
  revDS,
];
const AND_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revConj,
  revAndAssociativity,
  revDistributivity,
  revDeMorgan,
  revImplication,
];
const OR_RULES: ReverseRule[] = [
  ...ATOM_RULES,
  revAdd,
  revOrAssociativity,
  revDistributivity,
  revDeMorgan,
  revConditionalIdentityOr,
];
const IFF_RULES: ReverseRule[] = [...ATOM_RULES, revConditionalIdentityIff];

export function getReverseRulesForNode(
  node: ProofNode,
): ReverseRule[] {
  if (isImplicationNode(node)) return IMPLICATION_RULES;
  if (isOrNode(node)) return OR_RULES;
  if (isAndNode(node)) return AND_RULES;
  if (isIffNode(node)) return IFF_RULES;
  return ATOM_RULES;
}
