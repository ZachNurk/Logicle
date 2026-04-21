/**
 * Manages the state of the proof nodes.
 * @file useProofNodes.ts
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { nodeFromDb, ERROR_NODE } from "../../logic/ProofNode";
import type { ProofNode } from "../../logic/ProofNode";

/** Pause before loading the next endless puzzle so the solved state is visible. */
const ENDLESS_ADVANCE_AFTER_SOLVE_MS = 500;

type DayPayload = {
  id?: string;
  nodes?: unknown;
  solution?: unknown;
};

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
  /**
   * Endless only: session solve count and refetch trigger (same value bumps the load effect
   * when advancing after a win).
   */
  const [endlessSolves, setEndlessSolves] = useState(0);

  const prevPuzzleSourceRef = useRef(puzzleSource);
  const advanceEndlessTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearAdvanceEndlessTimeout = useCallback(() => {
    if (advanceEndlessTimeoutRef.current !== null) {
      clearTimeout(advanceEndlessTimeoutRef.current);
      advanceEndlessTimeoutRef.current = null;
    }
  }, []);

  const applyLoadedDay = useCallback(
    (day: DayPayload, source: "daily" | "endless") => {
      const dayId: string = day?.id ?? "unknown";
      const rawNodes = day?.nodes ?? [];
      const starterNodes: ProofNode[] = (Array.isArray(rawNodes) ? rawNodes : []).map(
        (n: any) => nodeFromDb(n),
      );

      const storageKey = nodesStorageKey(dayId, source);
      const saved = localStorage.getItem(storageKey);
      const savedNodes: ProofNode[] = saved ? JSON.parse(saved) : [];

      const prefix = source === "endless" ? "logicle_nodes_endless_" : "logicle_nodes_";
      Object.keys(localStorage)
        .filter((k) => k.startsWith(prefix) && k !== storageKey)
        .forEach((k) => localStorage.removeItem(k));

      const rawSolution = day?.solution;
      setCurrentDayId(dayId);
      setNodes([...starterNodes, ...savedNodes]);
      setSolutionNode(rawSolution ? nodeFromDb(rawSolution) : ERROR_NODE);
    },
    [],
  );

  const generateEndlessPuzzle = useCallback(async (): Promise<DayPayload> => {
    throw new Error("Endless puzzle generator not implemented");
  }, []);

  useEffect(() => {
    if (prevPuzzleSourceRef.current === "endless" && puzzleSource === "daily") {
      clearAdvanceEndlessTimeout();
      setEndlessSolves(0);
    }
    prevPuzzleSourceRef.current = puzzleSource;
  }, [puzzleSource, clearAdvanceEndlessTimeout]);

  useEffect(() => {
    if (puzzleSource !== "endless") {
      clearAdvanceEndlessTimeout();
    }
  }, [puzzleSource, clearAdvanceEndlessTimeout]);

  useEffect(() => {
    return () => clearAdvanceEndlessTimeout();
  }, [clearAdvanceEndlessTimeout]);

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
        let day: DayPayload;

        if (puzzleSource === "endless") {
          day = await generateEndlessPuzzle();
        } else {
          const res = await fetch("/api/days");
          if (!res.ok) {
            throw new Error(`Failed to load days: ${res.status}`);
          }

          const data = await res.json();
          const days = Array.isArray(data) ? data : (data?.days ?? []);
          // Latest day by id (dates sort lexicographically as YYYY-MM-DD)
          // 2026-03-19

          const firstDay = new Date("2026-03-19");
          const today = new Date();

          const diffMs = today.getTime() - firstDay.getTime()
          const msPerDay = 1000 * 60 * 60 * 24;

          const dayIndex = Math.round(diffMs / msPerDay) - 1

          day = days[dayIndex] 
          //TODO remove me ^
    
        }

        applyLoadedDay(day, puzzleSource);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load days";
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId, puzzleSource, applyLoadedDay, generateEndlessPuzzle]);

  const advanceEndlessPuzzle = useCallback(() => {
    if (puzzleSource !== "endless") return;
    clearAdvanceEndlessTimeout();
    advanceEndlessTimeoutRef.current = setTimeout(() => {
      advanceEndlessTimeoutRef.current = null;
      (async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
          const day = await generateEndlessPuzzle();
          applyLoadedDay(day, "endless");
          setEndlessSolves((n) => n + 1);
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Failed to generate endless puzzle";
          setLoadError(message);
        } finally {
          setIsLoading(false);
        }
      })();
    }, ENDLESS_ADVANCE_AFTER_SOLVE_MS);
  }, [puzzleSource, clearAdvanceEndlessTimeout, applyLoadedDay, generateEndlessPuzzle]);

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
