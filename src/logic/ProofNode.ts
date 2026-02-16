/**
 * Defines how our ProofNodes should work
 * Also provides functions for creating nodes
 * @file ProofNode.ts
 */

export type Relation = "And" | "Or" | "If" | "Iff" | "Self"

export type ProofNode = {
  id: string;                // ID of particular node
  text: string;              // what is displayed
  kind: "Given" | "Derived" | "Solution"; // was it given or was it derived or the answer
  rule?: string;             // TODO do we even need this field?
  parents: string[];
  selected: boolean;
  contains?: ProofNode[]  // What nodes are nested? (ex: P V Q, Q and P are nested)   
  relationship?: Relation
};



/**
 * Function provides interface for creating nodes
 */
export function createNode(args: {
  id: string;
  text: string;
  kind?: ProofNode["kind"];
  parents?: string[];
  rule?: string;
  selected: boolean
  contains: ProofNode[]
}): ProofNode {
  return {
    id: crypto.randomUUID(),
    text: args.text,
    kind: args.kind ?? "Given",
    parents: args.parents ?? [],
    rule: args.rule,
    selected: false
  };
}

/**
 * Function creates a node using the JSON from our DB
 * Will have to change if we move to SQL
 */
export function nodeFromDb(raw: any): ProofNode {
  const kind: ProofNode["kind"] =
    raw?.kind === "Derived" || raw?.kind === "Solution" ? raw.kind : "Given";

  return createNode({
    id: crypto.randomUUID(),
    text: String(raw?.text ?? ""),
    kind,
    parents: Array.isArray(raw?.parents) ? raw.parents.map(String) : [],
    rule: raw?.rule != null ? String(raw.rule) : undefined,
    selected: false,
    contains: Array.isArray(raw?.contains)
      ? raw.contains.map(nodeFromDb) // nested nodes from DB
      : [],
  });
}