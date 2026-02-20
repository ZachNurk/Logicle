import { useState, useEffect, useCallback } from "react";
import { nodeFromDb, ERROR_NODE } from "../logic/ProofNode";
import type { ProofNode } from "../logic/ProofNode";
import type { Axiom } from "../logic/Axiom";
import { Axioms } from "../logic/Axiom";

/**
 * Manages the state of our App
 */
export function useProofState() {
  const [givenNodes, setNodes] = useState<ProofNode[]>([]);
  const [solutionNode, setSolutionNode] = useState<ProofNode>(ERROR_NODE);
  const [axioms, setAxioms] = useState<Axiom[]>(Axioms);

  /** DATABASE AND NODES */
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/days");
      const data = await res.json();
      const firstDay = data[0];
      const loaded: ProofNode[] = (firstDay.givenNodes ?? []).map(nodeFromDb);
      const rawSolution = firstDay.solution;
      setNodes(loaded);
      setSolutionNode(rawSolution ? nodeFromDb(rawSolution, false) : ERROR_NODE);
    })();
  }, []);

  const toggleSelectedProofNode = useCallback((id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, selected: !node.selected } : node,
      ),
    );
  }, []);

  /** END DATABASE AND NODES */

  /** AXIOMS */
  const toggleSelectedAxiom = useCallback((id: string) => {
    setAxioms((prev) =>
      prev.map((axiom) =>
        axiom.id === id
          ? { ...axiom, selected: !axiom.selected }
          : { ...axiom, selected: false },
      ),
    );
  }, []);
  /** END AXIOMS */

  return {
    givenNodes,
    solutionNode,
    axioms,
    toggleSelectedProofNode,
    toggleSelectedAxiom,
  };
}
