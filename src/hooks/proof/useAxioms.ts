/**
 * Hook is used to manage the state of the axioms
 * @file useAxioms.ts
 */


import { useState, useCallback, useEffect } from "react";
import type { Axiom } from "../../logic/Axiom";
import { Axioms } from "../../logic/Axiom";

/**
 * Manages the list of axioms and which one is selected (for applying a rule).
 */
export function useAxioms() {
  const [axioms, setAxioms] = useState<Axiom[]>(Axioms);

  useEffect(() => {
    setAxioms((prev) =>
      Axioms.map((latestAxiom) => ({
        ...latestAxiom,
        selected: prev.find((axiom) => axiom.id === latestAxiom.id)?.selected ?? latestAxiom.selected,
      })),
    );
  }, []);

  const toggleSelectedAxiom = useCallback((id: string) => {
    setAxioms((prev) =>
      prev.map((axiom) =>
        axiom.id === id
          ? { ...axiom, selected: !axiom.selected }
          : { ...axiom, selected: false },
      ),
    );
  }, []);

  return {
    axioms,
    setAxioms,
    toggleSelectedAxiom,
  };
}
