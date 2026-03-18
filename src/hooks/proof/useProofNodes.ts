/**
 * Manages the state of the proof nodes. 
 * @file useProofNodes.ts
 */



import { useState, useEffect, useCallback } from "react";
import { nodeFromDb, ERROR_NODE } from "../../logic/ProofNode";
import type { ProofNode } from "../../logic/ProofNode";


export function useProofNodes(userId: string | null) {
  const [nodes, setNodes] = useState<ProofNode[]>([]);
  const [solutionNode, setSolutionNode] = useState<ProofNode>(ERROR_NODE);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // No user yet — reset to blank state and stop loading.
    if (!userId) {
      setNodes([]);
      setSolutionNode(ERROR_NODE);
      setLoadError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    // effect is dependent on userId becuase logout deletes created nodes
    (async () => {
      try {
        const res = await fetch("/api/days");
        if (!res.ok) {
          throw new Error(`Failed to load days: ${res.status}`);
        }

        const data = await res.json();
        const firstDay = Array.isArray(data) ? data[0] : data?.days?.[0];
        const rawNodes = firstDay?.nodes ?? [];
        const loaded: ProofNode[] = rawNodes.map((n: any) => nodeFromDb(n));

        const rawSolution = firstDay?.solution;
        setNodes(loaded);
        setSolutionNode(rawSolution ? nodeFromDb(rawSolution) : ERROR_NODE);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load days";
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

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
    isLoading,
    loadError,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
  };
}
