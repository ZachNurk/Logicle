/**
 * Defines how our ProofNodes should work
 * Also provides functions for creating nodes
 * @file ProofNode.ts
 */

/**
 * Defines how our ProofNodes should work
 * Also provides functions for creating nodes
 * @file ProofNode.ts
 */


/**
 * Function checks if two nodes are the same node
 * @param a is the first node
 * @param b is the second node
 * @return returns true if the same, false if not
 */
export function sameNode(a?: ProofNode, b?: ProofNode) {
  if (!a || !b) return false;
  return a.id === b.id;
}

export type ProofNode = {
  id: string;
  text: string;
  selected: boolean;
  parents?: ProofNode[];
};

export type ImplicationNode = ProofNode & {
  relationship: "If";
  left: ProofNode; // Antecedent
  right: ProofNode; // Consequent
};

export function createNode(
  id: string,
  text: string,
  selected: boolean,
  parents?: ProofNode[],
): ProofNode {
  return {
    id: id ?? crypto.randomUUID(),
    text: text,
    selected: selected,
    parents: parents ?? [],
  };
}

export function createImplicationNode(
  id: string,
  text: string,
  selected: boolean,
  left: ProofNode,
  right: ProofNode,
  parents?: ProofNode[],
): ImplicationNode {
  return {
    id: id,
    text: text,
    selected: selected,
    parents: parents,
    relationship: "If",
    left: left,
    right: right,
  };
}

// TODO make node from DB
