/**
 * Manages the state of the proof nodes.
 * @file useProofNodes.ts
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { nodeFromDb, ERROR_NODE } from "../../logic/ProofNode";
import type { ProofNode } from "../../logic/ProofNode";

function nodesStorageKey(dayId: string, source: "daily" | "endless") {
  return source === "endless"
    ? `logicle_nodes_endless_${dayId}`
    : `logicle_nodes_${dayId}`;
}

export function useProofNodes(
  userId: string | null,
  puzzleSource: "daily" | "endless" = "daily",
) {
  const [nodes, setNodes] = useState<ProofNode[]>([]);
  const [solutionNode, setSolutionNode] = useState<ProofNode>(ERROR_NODE);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentDayId, setCurrentDayId] = useState<string | null>(null);
  /** Bump to load another random puzzle in endless mode */
  const [endlessRound, setEndlessRound] = useState(0);
  /** How many endless puzzles solved this session (incremented when advancing after a win). */
  const [endlessSolves, setEndlessSolves] = useState(0);

  const prevPuzzleSourceRef = useRef(puzzleSource);
  useEffect(() => {
    if (prevPuzzleSourceRef.current === "endless" && puzzleSource === "daily") {
      setEndlessRound(0);
      setEndlessSolves(0);
    }
    prevPuzzleSourceRef.current = puzzleSource;
  }, [puzzleSource]);

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
        let day: {
          id?: string;
          nodes?: unknown;
          solution?: unknown;
        };

        if (puzzleSource === "endless") {
          const res = await fetch("/api/days/random");
          if (!res.ok) {
            throw new Error(`Failed to load random puzzle: ${res.status}`);
          }
          day = await res.json();
        } else {
          const res = await fetch("/api/days");
          if (!res.ok) {
            throw new Error(`Failed to load days: ${res.status}`);
          }

          const data = await res.json();
          const days = Array.isArray(data) ? data : (data?.days ?? []);
          // Latest day by id (dates sort lexicographically as YYYY-MM-DD)
          day = days[days.length - 1] ?? days[0] ?? {};
        }

        const dayId: string = day?.id ?? "unknown";
        const rawNodes = day?.nodes ?? [];
        const starterNodes: ProofNode[] = (Array.isArray(rawNodes)
          ? rawNodes
          : []
        ).map((n: any) => nodeFromDb(n));

        const storageKey = nodesStorageKey(dayId, puzzleSource);
        const saved = localStorage.getItem(storageKey);
        const savedNodes: ProofNode[] = saved ? JSON.parse(saved) : [];

        const prefix =
          puzzleSource === "endless" ? "logicle_nodes_endless_" : "logicle_nodes_";
        Object.keys(localStorage)
          .filter((k) => k.startsWith(prefix) && k !== storageKey)
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
  }, [userId, puzzleSource, endlessRound]);

  const advanceEndlessPuzzle = useCallback(() => {
    if (puzzleSource !== "endless") return;
    setEndlessSolves((n) => n + 1);
    setEndlessRound((n) => n + 1);
  }, [puzzleSource]);

  // Persist derived nodes (non-starter) whenever they change.
  useEffect(() => {
    if (!currentDayId || isLoading) return;
    const derived = nodes.filter((n) => !n.isStarter);
    localStorage.setItem(
      nodesStorageKey(currentDayId, puzzleSource),
      JSON.stringify(derived),
    );
  }, [nodes, currentDayId, isLoading, puzzleSource]);

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
    advanceEndlessPuzzle,
    endlessSolves,
  };
}
