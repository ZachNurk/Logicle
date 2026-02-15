export type ProofNode = {
  id: string;                // ID of particular node
  text: string;              // what is displayed
  kind: "given" | "derived" | "solution"; // was it given or was it derived or the answer
  rule?: string;             // only for derived nodes USED FOR DISPLAYING IN BRANCH
  parents: string[];
  selected: boolean         
};
//TODO fix issue where we need to have nested nodes
export function createNode(args: {
  id: string;
  text: string;
  kind?: ProofNode["kind"];
  parents?: string[];
  rule?: string;
  selected: boolean
}): ProofNode {
  return {
    id: crypto.randomUUID(),
    text: args.text,
    kind: args.kind ?? "given",
    parents: args.parents ?? [],
    rule: args.rule,
    selected: false
  };
}

export function nodeFromDb(raw: any): ProofNode {
  return createNode({
    id: crypto.randomUUID(),
    text: String(raw.text ?? ""),
    kind: raw.kind === "derived" ? "derived" : "given",
    parents: Array.isArray(raw.parents) ? raw.parents.map(String) : [],
    rule: raw.rule ? String(raw.rule) : undefined,
    selected: false
  });
}