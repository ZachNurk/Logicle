/**
 * Defines how our ProofNodes should work
 * Also provides functions for creating nodes
 * @file ProofNode.ts
 */

/**
 * Relationship is the type of logical relationship represented by a node
 */
export type Relationship = "If" | "Not" | "And" | "Or" | "Iff";

/**
 * Function checks if two nodes are the same (logically equivalent).
 * For And and Or, order of left/right does not matter (commutative).
 * @param a is the first node
 * @param b is the second node
 * @return returns true if the same, false if not
 */
export function sameNode(a?: ProofNode, b?: ProofNode): boolean {
  if (!a || !b) return false;

  return a.text === b.text;
}

/**
 * Helper function determines if a node has a specific relationship
 * @param n is the node to check
 * @param rel is the relationship to compare
 * @return returns true if relationship matches, false if not
 */
function hasRelationship<R extends Relationship>(
  node: ProofNode,
  rel: R,
): node is ProofNode & { relationship: R } {
  return (node as any).relationship === rel;
}

/**
 * function determines if a node has a relationship field
 * @param n is the node to check
 * @return returns true if relationship exists, false if not
 */
export function hasAnyRelationship(
  node: ProofNode,
): node is ProofNode & { relationship: Relationship } {
  return (node as any).relationship !== undefined;
}

/**
 * Function determines if given node is an If node
 * @param n is the node to check
 * @return returns true if its an if node, false if not
 */
export function isImplicationNode(node: ProofNode): node is ImplicationNode {
  return hasRelationship(node, "If");
}

/**
 * Function determines if given node is a Not Node
 * @param n is the node to check
 * @return returns true if its an if node, false if not
 */
export function isNotNode(node: ProofNode): node is NotNode {
  return hasRelationship(node, "Not");
}

/**
 * Function determines if given node is an And Node
 * @param n is the node to check
 * @return returns true if its an and node, false if not
 */
export function isAndNode(node: ProofNode): node is AndNode {
  return hasRelationship(node, "And");
}

/**
 * Function determines if given node is an Or Node
 * @param n is the node to check
 * @return returns true if its an or node, false if not
 */
export function isOrNode(node: ProofNode): node is OrNode {
  return hasRelationship(node, "Or");
}

/**
 * Function determines if given node is an Iff Node
 * @param n is the node to check
 * @return returns true if its an iff node, false if not
 */
export function isIffNode(node: ProofNode): node is IffNode {
  return hasRelationship(node, "Iff");
}

/** True if node has multiple parts (And, Or, If, Iff). Use for "wrap in parens when used as subformula". */
export function isBinaryNode(node: ProofNode): boolean {
  return (
    isAndNode(node) ||
    isOrNode(node) ||
    isImplicationNode(node) ||
    isIffNode(node)
  );
}

/**
 * Returns the node's text, wrapped in parentheses when it is a binary node.
 * Use when building a formula string and this node appears as a subexpression (e.g. left/right of another operator).
 * @param n the node to format as a subexpression
 */
export function checkParentheses(n: ProofNode): string {
  return isBinaryNode(n) ? `(${n.text})` : n.text;
}

/**
 * Creates a new node, but with newly defined parents. Used in the result of an axiom operation
 * @param result is the result of the operation
 * @param parents is the 2 elm array of parents
 * @return returns the new node
 */
export function createResultNode<N extends ProofNode>(result: N, parents: N[]): N {
  return {
    ...result,
    id: crypto.randomUUID(),
    isStarter: false,
    context: false,
    parents: parents,
  };
}

// Node returned if operation isnt possible
export const ERROR_NODE: ProofNode = {
  id: "ERROR",
  text: "ERORR",
  selected: false,
  isStarter: false,
  context: false,
};

export type ProofNode = {
  id: string;
  text: string;
  selected: boolean;
  /** True if this node is a given/premise (loaded or added as starter). False for derived nodes. */
  isStarter?: boolean;
  /** When true, node is context-only (e.g. sub-formula); when false, show in given panel. */
  context?: boolean;
  parents?: ProofNode[];
  relationship?: Relationship; // Only present on non-atomic nodes
  /** Abbreviation of the axiom rule used to derive this node (e.g. "MP", "HS"). */
  rule?: string;
};

export type BinaryNode = ProofNode & {
  left: ProofNode;
  right: ProofNode;
};

export type ImplicationNode = BinaryNode & {
  relationship: "If";
};

export type AndNode = BinaryNode & {
  relationship: "And";
};

export type OrNode = BinaryNode & {
  relationship: "Or";
};

export type IffNode = BinaryNode & {
  relationship: "Iff";
};

export type NotNode = ProofNode & {
  relationship: "Not";
  contains: ProofNode;
};

export function createNode(
  text: string,
  selected: boolean,
  parents?: ProofNode[],
  isStarter?: boolean,
): ProofNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    isStarter: isStarter ?? false,
    context: false,
    parents: parents ?? [],
  };
}

export function createNotNode(
  selected: boolean,
  contains: ProofNode,
  parents?: ProofNode[],
  isStarter?: boolean,
): NotNode {
  const text = `¬${checkParentheses(contains)}`;
  return {
    id: crypto.randomUUID(),
    text,
    selected,
    isStarter: isStarter ?? false,
    context: false,
    relationship: "Not",
    contains,
    parents: parents ?? [],
  };
}

export function createImplicationNode(
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
  isStarter?: boolean,
): ImplicationNode {
  const text = `${checkParentheses(left)} → ${checkParentheses(right)}`;
  return {
    id: crypto.randomUUID(),
    text,
    selected,
    isStarter: isStarter ?? false,
    context: false,
    parents: parents ?? [],
    relationship: "If",
    left,
    right,
  };
}

export function createAndNode(
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
  isStarter?: boolean,
): AndNode {
  const text = `${checkParentheses(left)} ∧ ${checkParentheses(right)}`;
  return {
    id: crypto.randomUUID(),
    text,
    selected,
    isStarter: isStarter ?? false,
    context: false,
    parents: parents ?? [],
    relationship: "And",
    left,
    right,
  };
}

export function createOrNode(
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
  isStarter?: boolean,
): OrNode {
  const text = `${checkParentheses(left)} ∨ ${checkParentheses(right)}`;
  return {
    id: crypto.randomUUID(),
    text,
    selected,
    isStarter: isStarter ?? false,
    context: false,
    parents: parents ?? [],
    relationship: "Or",
    left,
    right,
  };
}

export function createIffNode(
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
  isStarter?: boolean,
): IffNode {
  const text = `${checkParentheses(left)} ↔ ${checkParentheses(right)}`;
  return {
    id: crypto.randomUUID(),
    text,
    selected,
    isStarter: isStarter ?? false,
    context: false,
    parents: parents ?? [],
    relationship: "Iff",
    left,
    right,
  };
}

/**
 * Wraps DB JSON as a ProofNode. If the node is binary (And/Or/If/Iff), defines left/right from dbNode.left and dbNode.right; if Not, defines contains.
 */
export function nodeFromDb(dbNode: any, isStarter: boolean = true): ProofNode {
  const rel = dbNode?.relationship as Relationship | undefined;
  const base = {
    id: String(dbNode?.id ?? ""),
    text: String(dbNode?.text ?? ""),
    selected: Boolean(dbNode?.selected ?? false),
    isStarter: dbNode?.isStarter ?? isStarter,
    context: Boolean(dbNode?.context ?? false),
    parents: undefined as ProofNode[] | undefined,
    relationship: rel,
  };

  if (rel === "Not" && dbNode?.contains && typeof dbNode.contains === "object" && dbNode.contains.id != null) {
    return { ...base, relationship: "Not", contains: nodeFromDb(dbNode.contains, isStarter) } as NotNode;
  }

  const isBinary = rel === "And" || rel === "Or" || rel === "If" || rel === "Iff";
  const hasLeftRight = dbNode?.left != null && dbNode?.right != null &&
    typeof dbNode.left === "object" && dbNode.left.id != null &&
    typeof dbNode.right === "object" && dbNode.right.id != null;
  if (isBinary && hasLeftRight) {
    return {
      ...base,
      relationship: rel,
      left: nodeFromDb(dbNode.left, isStarter),
      right: nodeFromDb(dbNode.right, isStarter),
    } as ProofNode;
  }

  return base as ProofNode;
}
