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
 * Function checks if two nodes are the same node
 * @param a is the first node
 * @param b is the second node
 * @return returns true if the same, false if not
 */
export function sameNode(a?: ProofNode, b?: ProofNode) {
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

// Node returned if operation isnt possible
export const ERROR_NODE: ProofNode = {
  id: "ERROR",
  text: "ERORR",
  selected: false,
};

export type ProofNode = {
  id: string;
  text: string;
  selected: boolean;
  parents?: ProofNode[];
  relationship?: Relationship; // Only present on non-atomic nodes
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
): ProofNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    parents: parents ?? [],
  };
}

export function createNotNode(
  text: string,
  selected: boolean,
  contains: ProofNode,
  parents?: ProofNode[],
): NotNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    relationship: "Not",
    contains: contains,
    parents: parents ?? [],
  };
}

export function createImplicationNode(
  text: string,
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
): ImplicationNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    parents: parents ?? [],
    relationship: "If",
    left: left,
    right: right,
  };
}

export function createAndNode(
  text: string,
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
): AndNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    parents: parents ?? [],
    relationship: "And",
    left: left,
    right: right,
  };
}

export function createOrNode(
  text: string,
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
): OrNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    parents: parents ?? [],
    relationship: "Or",
    left: left,
    right: right,
  };
}

export function createIffNode(
  text: string,
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
): IffNode {
  return {
    id: crypto.randomUUID(),
    text: text,
    selected: selected,
    parents: parents ?? [],
    relationship: "Iff",
    left: left,
    right: right,
  };
}

/**
 * Function converts a DB node into a ProofNode
 * @param dbNode is the node from the database
 * @return returns a ProofNode with the correct fields
 */
export function nodeFromDb(dbNode: any): ProofNode {
  return {
    id: String(dbNode.id),
    text: String(dbNode.text),
    selected: Boolean(dbNode.selected ?? false),
    parents: Array.isArray(dbNode.parents) ? dbNode.parents : [],
    relationship: dbNode.relationship as Relationship | undefined,
  };
}
