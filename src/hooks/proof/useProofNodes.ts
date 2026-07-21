/**
 * Manages the state of the proof nodes.
 * @file useProofNodes.ts
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { nodeFromDb, ERROR_NODE } from "../../logic/ProofNode";
import type { ProofNode } from "../../logic/ProofNode";
import { generateEndlessPuzzle } from "../../logic/GeneratePuzzle";
import type { SolutionStep } from "../../logic/GeneratePuzzle";
import { formatLocalDateKey } from "../../utils/dateKeys";

/** Pause before loading the next endless puzzle so the solved state is visible. */
const ENDLESS_ADVANCE_AFTER_SOLVE_MS = 1000;

type DayPayload = {
  id?: string;
  nodes?: unknown;
  solution?: unknown;
  /** Forward-order "Give Up" assist guide, from givens to solution. */
  solutionSteps?: SolutionStep[];
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
  /** Forward-order "Give Up" assist guide for the current puzzle. */
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);

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
      const dayId: string | null =
        source === "endless" ? null : (day?.id ?? "unknown");
      const rawNodes = day?.nodes ?? [];
      const starterNodes: ProofNode[] = (Array.isArray(rawNodes) ? rawNodes : []).map(
        (n: any) => nodeFromDb(n),
      );

      let savedNodes: ProofNode[] = [];
      if (source === "daily") {
        const storageKey = nodesStorageKey(dayId ?? "unknown", source);
        const saved = localStorage.getItem(storageKey);
        savedNodes = saved ? JSON.parse(saved) : [];

        const prefix = "logicle_nodes_";
        Object.keys(localStorage)
          .filter((k) => k.startsWith(prefix) && k !== storageKey)
          .forEach((k) => localStorage.removeItem(k));
      }

      const rawSolution = day?.solution;
      setCurrentDayId(dayId);
      setNodes([...starterNodes, ...savedNodes]);
      setSolutionNode(rawSolution ? nodeFromDb(rawSolution) : ERROR_NODE);
      setSolutionSteps(day?.solutionSteps ?? []);
    },
    [],
  );

  useEffect(() => {
    if (prevPuzzleSourceRef.current === "endless" && puzzleSource === "daily") {
      clearAdvanceEndlessTimeout();
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
    setIsLoading(true);
    setLoadError(null);

    // effect is dependent on userId because logout deletes created nodes
    (async () => {
      try {
        let day: DayPayload;

        if (puzzleSource === "endless") {
          day = generateEndlessPuzzle();
        } else {
          const res = await fetch("/api/days");
          if (!res.ok) {
            throw new Error("Failed to load days");
          }
          const data = await res.json();
          const days: DayPayload[] = Array.isArray(data) ? data : (data?.days ?? []);
          if (days.length === 0) {
            throw new Error("No puzzles available");
          }

          // Days sort lexicographically since id is YYYY-MM-DD.
          const sorted = [...days].sort((a, b) =>
            (a.id ?? "") < (b.id ?? "") ? -1 : (a.id ?? "") > (b.id ?? "") ? 1 : 0,
          );
          const todayKey = formatLocalDateKey(new Date());

          // Prefer today's puzzle; otherwise fall back to the most recent one seeded.
          day = sorted.find((d) => d.id === todayKey) ?? sorted[sorted.length - 1];
        }

        if (!day) {
          throw new Error("No puzzle available for today");
        }

        applyLoadedDay(day, puzzleSource);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load puzzle";
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userId, puzzleSource, applyLoadedDay]);

  const advanceEndlessPuzzle = useCallback(() => {
    if (puzzleSource !== "endless") return;
    clearAdvanceEndlessTimeout();
    advanceEndlessTimeoutRef.current = setTimeout(() => {
      advanceEndlessTimeoutRef.current = null;
      (async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
          const day = generateEndlessPuzzle();
          applyLoadedDay(day, "endless");
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
  }, [puzzleSource, clearAdvanceEndlessTimeout, applyLoadedDay]);


  // Persist derived nodes (non-starter) whenever they change.
  useEffect(() => {
    if (puzzleSource === "endless") return;
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
    solutionSteps,
  };
}
