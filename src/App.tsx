/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import GivenPanel from "./components/left_panel/GivenPanel";
import RulePanel from "./components/right_panel/RulePanel";
import { useState, useEffect, useCallback } from "react";
import { nodeFromDb } from "./logic/ProofNode";

import type { ProofNode } from "./logic/ProofNode";
import type { Axiom } from "./logic/Axiom";
import { Axioms } from "./logic/Axiom";



  


/**
 * Main App
 * Program is split into two segments, GivenPanel (Left) and RulePanel (Right)
 */
export default function App() {
  const { givens, axioms, toggleSelectedProofNode, toggleSelectedAxiom } = useProofState();

  return (
    <div style={styles.split}>
      <GivenPanel givenArray={givens} toggleSelected={toggleSelectedProofNode} />
      <RulePanel axioms={axioms} toggleSelected={toggleSelectedAxiom} />
    </div>
  );
}


/**
 * Manages the state of our App
 * Seperated to make it easier to read
 */
function useProofState() {
  const [nodes, setNodes] = useState<ProofNode[]>([]);
  const [axioms, setAxioms] = useState<Axiom[]>(Axioms)

  /** DATABASE AND NODES */
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/days");
      const data = await res.json();
      const firstDay = data[0];
      const loaded: ProofNode[] = (firstDay.nodes ?? []).map(nodeFromDb);
      setNodes(loaded.filter((n) => n.kind === "Given"));
    })();
  }, []);

  const toggleSelectedProofNode = useCallback((id: string) => { // use callback --> only recreate wehn dependencys change
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, selected: !node.selected } : node
      )
    );
  }, []);

 
  const givens = nodes.filter((n) => n.kind === "Given");
  const derived = nodes.filter((n) => n.kind === "Derived" || n.kind === "Solution");
  /** END DATABASE AND NODES */

  

  /** AXIOMS */
  const toggleSelectedAxiom = useCallback((id: string) => {
    setAxioms((prev) =>
      prev.map((axiom) =>
        axiom.id === id ? { ...axiom, selected: !axiom.selected } : {...axiom, selected: false}
      )
    );
  }, []);
  /** END AXIOMS */

  

  return {
    givens,
    derived,
    axioms,
    toggleSelectedProofNode,
    toggleSelectedAxiom
    /** For future: add derived node from an axiom. */
    // addDerived: useCallback((node: ProofNode) => { ... }, []),
  };
}

const styles = {
  split: {
    display: "flex",
    height: "100vh",
    gap: "5px",
  } satisfies React.CSSProperties,
};
