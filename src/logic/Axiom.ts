/**
 * Defines the Axiom type, and defines all the axioms to be used in the program
 * @file Axiom.ts
 */

import type { ProofNode } from "./ProofNode";

export type Axiom = {
  id: string;
  text: string; // ima use a switch that checks which one is selected
  selected: boolean;
  apply: (nodeA: ProofNode, nodeB: ProofNode) => ProofNode;
}




export const Axioms: Axiom[] = [
  {
    id: "MP",
    text: "Modus Ponens",
    selected: false,
    apply: (nodes, selectedIds) => {
      // placeholder
      return nodes;
    },
  },
  {
    id: "MT",
    text: "Modus Tonens",
    selected: false,
    apply: (nodes, selectedIds) => {
      // placeholder
      return nodes;
    },
  },
];