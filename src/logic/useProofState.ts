import { useState, useEffect, useCallback } from "react";
import type { ProofNode } from "./ProofNode";
import { nodeFromDb } from "./ProofNode";

/** All proof state and actions in one place. Change behavior here instead of across App + panels. */
export function useProofState() {
  const [nodes, setNodes] = useState<ProofNode[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/days");
      const data = await res.json();
      const firstDay = data[0];
      const loaded: ProofNode[] = (firstDay.nodes ?? []).map(nodeFromDb);
      setNodes(loaded.filter((n) => n.kind === "given"));
    })();
  }, []);

  const toggleSelected = useCallback((id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, selected: !node.selected } : node
      )
    );
  }, []);

  const givens = nodes.filter((n) => n.kind === "given");
  const derived = nodes.filter((n) => n.kind === "derived" || n.kind === "solution");

  const rules = ["Rule1", "Rule2", "Rule3", "Rule4"];

  return {
    givens,
    derived,
    rules,
    toggleSelected,
    /** For future: add derived node from an axiom. */
    // addDerived: useCallback((node: ProofNode) => { ... }, []),
  };
}
