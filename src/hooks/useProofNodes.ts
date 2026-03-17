/**
 * Manages the state of the proof nodes. 
 * @file useProofNodes.ts
 */



import { useState, useEffect, useCallback } from "react";
import { nodeFromDb, ERROR_NODE } from "../logic/ProofNode";
import type { ProofNode } from "../logic/ProofNode";


export function useProofNodes() {
  const [nodes, setNodes] = useState<ProofNode[]>([]);
  const [solutionNode, setSolutionNode] = useState<ProofNode>(ERROR_NODE);

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/days");
      const data = await res.json();
      const firstDay = Array.isArray(data) ? data[0] : data?.days?.[0];
      const rawNodes = firstDay?.nodes ?? [];
      const loaded: ProofNode[] = rawNodes.map((n: any) => nodeFromDb(n));

      const rawSolution = firstDay?.solution;
      setNodes(loaded);
      setSolutionNode(rawSolution ? nodeFromDb(rawSolution) : ERROR_NODE);
    })();
  }, []);

  const toggleSelectedProofNode = useCallback((id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, selected: !node.selected } : node,
      ),
    );
  }, []);

  const addGivenNode = useCallback((node: ProofNode) => {
    // Existing nodes first (deselected), then the new node at the end.
    setNodes((prev) => [
      ...prev.map((n) => ({ ...n, selected: false })),
      { ...node, selected: false },
    ]);
  }, []);

  return {
    nodes,
    solutionNode,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
  };
}
