/**
 * App passes all givenNodes + axioms (with .selected on each). This file derives
 * what's selected, whether apply is valid, and—when apply is pressed—uses Axiom.ts
 * to create the new node. 
 * @file proofSelection.ts
 */
import type { ProofNode } from "./ProofNode";
import type { Axiom } from "./Axiom";

export type SelectionSummary = {
  selectedGivens: ProofNode[];
  selectedAxiom: Axiom | null;
  canApply: boolean;
  message: string;
};

export function getSelectionSummary(
  givenNodes: ProofNode[],
  axioms: Axiom[]
): SelectionSummary {
  return { selectedGivens: [], selectedAxiom: null, canApply: false, message: "" };
}

export function applySelection(
  selectedGivens: ProofNode[],
  selectedAxiom: Axiom | null
): ProofNode | null {
  return null;
}
