/**
 * Manages the state of the proof nodes.
 * @file useProofNodes.ts
 */

import { useState, useEffect, useCallback } from "react";
import { nodeFromDb, ERROR_NODE } from "../../logic/ProofNode";
import type { ProofNode } from "../../logic/ProofNode";

function nodesStorageKey(dayId: string) {
  return `logicle_nodes_${dayId}`;
}

export function useProofNodes(userId: string | null) {
  const [nodes, setNodes] = useState<ProofNode[]>([]);
  const [solutionNode, setSolutionNode] = useState<ProofNode>(ERROR_NODE);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentDayId, setCurrentDayId] = useState<string | null>(null);

  useEffect(() => {
    // No user yet — reset to blank state and stop loading.
    if (!userId) {
      setNodes([]);
      setSolutionNode(ERROR_NODE);
      setLoadError(null);
      setIsLoading(false);
      setCurrentDayId(null);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    // effect is dependent on userId because logout deletes created nodes
    (async () => {
      try {
        const res = await fetch("/api/days");
        if (!res.ok) {
          throw new Error(`Failed to load days: ${res.status}`);
        }

        const data = await res.json();
        //TODO remove this. This manually sets the day for testing
        const days = Array.isArray(data) ? data : (data?.days ?? []);
        const day = days[2];
        // No separate "date" column — day ids in the DB are the calendar key (string).
        const dayId: string = day?.id ?? "unknown";
        const rawNodes = day?.nodes ?? [];
        const starterNodes: ProofNode[] = rawNodes.map((n: any) =>
          nodeFromDb(n),
        );


        // Restore any derived nodes the user created in a previous session.
        const saved = localStorage.getItem(nodesStorageKey(dayId));
        const savedNodes: ProofNode[] = saved ? JSON.parse(saved) : [];

        // Remove saved nodes from any previous days.
        const keepKey = nodesStorageKey(dayId);
        Object.keys(localStorage)
          .filter((k) => k.startsWith("logicle_nodes_") && k !== keepKey)
          .forEach((k) => localStorage.removeItem(k));

        const rawSolution = day?.solution;
        setCurrentDayId(dayId);
        setNodes([...starterNodes, ...savedNodes]);
        setSolutionNode(rawSolution ? nodeFromDb(rawSolution) : ERROR_NODE);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load days";
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId]);

  // Persist derived nodes (non-starter) whenever they change.
  useEffect(() => {
    if (!currentDayId || isLoading) return;
    const derived = nodes.filter((n) => !n.isStarter);
    localStorage.setItem(
      nodesStorageKey(currentDayId),
      JSON.stringify(derived),
    );
  }, [nodes, currentDayId, isLoading]);

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

  const deleteSelectedNode = useCallback(() => {
    setNodes((prev) => {
      const selected = prev.find((n) => n.selected && !n.isStarter);
      if (!selected) return prev;
      return prev.filter((n) => n.id !== selected.id);
    });
  }, []);

  const resetNodes = useCallback(() => {
    setNodes((prev) => prev.filter((n) => n.isStarter));
  }, []);

  return {
    nodes,
    solutionNode,
    currentDayId,
    isLoading,
    loadError,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
    deleteSelectedNode,
    resetNodes,
  };
}
