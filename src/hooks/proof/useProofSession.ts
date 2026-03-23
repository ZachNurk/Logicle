/**
 * Manages the state of the user's session. Contains useAxioms.ts, useProofNodes.ts
 * @file useProofSession.ts
 */

import { useCallback, useEffect, useState } from "react";
import type { ProofNode } from "../../logic/ProofNode";
import {
  sameNode,
  createAndNode,
  ERROR_NODE,
  createNode,
} from "../../logic/ProofNode";
import type { Axiom } from "../../logic/Axiom";
import { useProofNodes } from "./useProofNodes";
import { useAxioms } from "./useAxioms";

/**
 * Composes proof nodes + axioms state. Use this when you need to both read and
 * update both states (e.g. apply an axiom and add the result to givens).
 */
export function useProofSession(userId: string | null, hasWonToday: boolean, onVictory?: (dayId: string) => void) {
  const {
    nodes,
    solutionNode,
    isLoading,
    loadError,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
    deleteSelectedNode,
    resetNodes,
  } = useProofNodes(userId);
  const { axioms, setAxioms, toggleSelectedAxiom } = useAxioms();

  const [victory, setVictory] = useState(false);
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | "">("");
  /** Multiple axioms can be invalid at once; duplicates allowed so each error gets its own 1s timeout. */
  const [invalidAxiomIds, setInvalidAxiomIds] = useState<string[]>([]);

  useEffect(() => {
    setVictory(!!userId && hasWonToday);
  }, [userId, hasWonToday]);

  const setSide = (side: "left" | "right") => {
    setSelectedSide(side);
  };

  const clearAxiomSelection = useCallback(() => {
    toggleSelectedAxiom("");
    setSelectedSide("");
  }, [toggleSelectedAxiom]);

  /** Shake / red flash on this axiom for 1s; supports several axioms at once. */
  const registerInvalidAxiom = useCallback((axiomId: string) => {
    setInvalidAxiomIds((prev) => [...prev, axiomId]);
    setAxioms((prev) =>
      prev.map((a) => (a.id === axiomId ? { ...a, selected: false } : a)),
    );
    setTimeout(() => {
      setInvalidAxiomIds((prev) => {
        const i = prev.indexOf(axiomId);
        if (i === -1) return prev;
        return [...prev.slice(0, i), ...prev.slice(i + 1)];
      });
    }, 1000);
  }, [setAxioms]);

  /** Apply a specific axiom. For type "2", pass side so we don't rely on state. */
  const applyAxiom = useCallback(
    (
      axiom: Axiom,
      sideOverride?: "left" | "right",
      additionText?: string,
    ) => {
      if (!axiom.apply) return;

      const selectedNodes = nodes.filter((n) => n.selected);
      const addition = createNode(additionText ?? "DUMMY", false, undefined, false);
      const connective: "or" | "and" = "or";

      if (selectedNodes.length === 0) {
        registerInvalidAxiom(axiom.id);
        return;
      }

      let prem: ProofNode | undefined;
      if (axiom.id === "Conj" && selectedNodes.length != 2) {
        registerInvalidAxiom(axiom.id);
        return;
      }
      if (selectedNodes.length > 2) return;
      if (selectedNodes.length === 2) {
        const [left, right] = selectedNodes;
        prem = createAndNode(false, left, right);



      } else if (selectedNodes.length === 1) {
        prem = selectedNodes[0];
      }

      if (!prem) {
        registerInvalidAxiom(axiom.id);
        return;
      }

      const applyFn = axiom.apply;
      let result: ProofNode | undefined;

      switch (axiom.applyType) {
        case "1":
          result = (
            applyFn as (premises: ProofNode, selected: ProofNode[]) => ProofNode
          )(prem, selectedNodes);
          break;
        case "2": {
          const side = sideOverride ?? selectedSide;
          if (side === "") {
            alert("Please select Left or Right");
            return;
          }
          result = (
            applyFn as (
              premises: ProofNode,
              side: "left" | "right",
            ) => ProofNode
          )(prem, side);
          break;
        }
        case "3":
          result = (
            applyFn as (original: ProofNode, addition: ProofNode) => ProofNode
          )(prem, addition);
          break;
        case "4":
          result = (applyFn as (original: ProofNode) => ProofNode)(prem);
          break;
        case "5":
          result = (
            applyFn as (
              premises: ProofNode,
              selected: ProofNode[],
              connective: "or" | "and",
            ) => ProofNode
          )(prem, selectedNodes, connective);
          break;
        case "7":
          result = (
            applyFn as (
              premises: ProofNode,
              selected: ProofNode[],
              option: string,
            ) => ProofNode
          )(prem, selectedNodes, axiom.applyOption ?? "");
          break;
        default:
          result = undefined;
      }

      if (!result) throw new Error("Invalid result!!!");

      if (sameNode(result, ERROR_NODE)) {
        registerInvalidAxiom(axiom.id);
        return;
      }

      if (sameNode(result, solutionNode)) {
        setVictory(true);
        const dayId = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
        onVictory?.(dayId);
      }

      if (nodes.some((n) => sameNode(n, result))) {
        setAxioms((prev) =>
          prev.map((a) => (a.id === axiom.id ? { ...a, selected: false } : a)),
        );
        alert("Duplicate node!");
        return;
      }
      //TODO maybe refactor so rule is a field in the node types so we dont have to do this lazy fix
      addGivenNode({ ...result, rule: axiom.id });
      setAxioms((prev) =>
        prev.map((a) => (a.id === axiom.id ? { ...a, selected: false } : a)),
      );
    },
    [
      nodes,
      addGivenNode,
      setAxioms,
      selectedSide,
      solutionNode,
      clearAxiomSelection,
      registerInvalidAxiom,
    ],
  );

  return {
    nodes,
    solutionNode,
    isLoading,
    loadError,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
    deleteSelectedNode,
    resetNodes,
    axioms,
    toggleSelectedAxiom,
    setAxioms,
    applyAxiom,
    victory,
    selectedSide,
    setSide,
    invalidAxiomIds,
  };
}
