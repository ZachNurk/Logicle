/**
 * Manages the state of the user's session. Contains useAxioms.ts, useProofNodes.ts
 * @file useProofSession.ts
 */

import { useCallback, useState } from "react";
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
export function useProofSession() {
  const {
    nodes,
    solutionNode,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
  } = useProofNodes();
  const { axioms, setAxioms, toggleSelectedAxiom } = useAxioms();
  const [victory, setVictory] = useState(false);
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | "">("");

  const setSide = (side: "left" | "right") => {
    setSelectedSide(side);
  };

  /** Apply a specific axiom. For type "2", pass side so we don't rely on state. */
  const applyAxiom = useCallback(
    (axiom: Axiom, sideOverride?: "left" | "right") => {
      if (!axiom.apply) return;

      const selectedNodes = nodes.filter((n) => n.selected);
      //TODO make it so field appears to input node, with scrollable so we dont get injection
      const addition = createNode("DUMMY", false, undefined, false);
      const connective: "or" | "and" = "or";

      let prem: ProofNode | undefined;
      if (selectedNodes.length > 2) return;
      if (selectedNodes.length === 2) {
        const [left, right] = selectedNodes;
        prem = createAndNode(false, left, right);
      } else if (selectedNodes.length === 1) {
        prem = selectedNodes[0];
      }

      if (!prem) {
        alert("Please select Node(s)");
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
        case "6":
          result = (
            applyFn as (original: ProofNode, option: string) => ProofNode
          )(prem, axiom.applyOption ?? "");
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
        alert("Invalid operation");
        return;
      }

      if (sameNode(result, solutionNode)) {
        alert("You won!");
        setVictory(true);
      }

      if (nodes.some((n) => sameNode(n, result))) {
        setAxioms((prev) =>
          prev.map((a) => (a.id === axiom.id ? { ...a, selected: false } : a)),
        );
        alert("Duplicate node!");
        return;
      }

      addGivenNode(result);
      setAxioms((prev) =>
        prev.map((a) => (a.id === axiom.id ? { ...a, selected: false } : a)),
      );
    },
    [nodes, addGivenNode, setAxioms, selectedSide, solutionNode],
  );

  return {
    nodes,
    solutionNode,
    setSolutionNode,
    toggleSelectedProofNode,
    addGivenNode,
    axioms,
    toggleSelectedAxiom,
    setAxioms,
    applyAxiom,
    victory,
    selectedSide,
    setSide,
  };
}
