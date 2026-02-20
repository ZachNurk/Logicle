/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import GivenPanel from "./components/left_panel/GivenPanel";
import RulePanel from "./components/right_panel/RulePanel";
import { useProofSession } from "./hooks/proof_session/useProofSession";

/**
 * Main App
 * Program is split into two segments, GivenPanel (Left) and RulePanel (Right)
 */
export default function App() {
  const {
    nodes,
    solutionNode,
    toggleSelectedProofNode,
    axioms,
    toggleSelectedAxiom,
    applySelectedAxiom,
    victory
  } = useProofSession();

  if (!victory) {
    return (
      <div style={styles.split}>
        <GivenPanel givenArray={nodes} solutionNode={solutionNode} toggleSelected={toggleSelectedProofNode} />
        <RulePanel
          axioms={axioms}
          toggleSelected={toggleSelectedAxiom}
          onApply={applySelectedAxiom}
        />
      </div>
    );
  }
  
}

const styles = {
  split: {
    display: "flex",
    height: "100vh",
    gap: "5px",
  } satisfies React.CSSProperties,
};
