/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import GivenPanel from "./components/left_panel/GivenPanel";
import RulePanel from "./components/right_panel/RulePanel";
import { useProofState } from "./hooks/useProofState";

/**
 * Main App
 * Program is split into two segments, GivenPanel (Left) and RulePanel (Right)
 */
export default function App() {
  const { givenNodes, solutionNode, axioms, toggleSelectedProofNode, toggleSelectedAxiom } =
    useProofState();

  return (
    <div style={styles.split}>
      <GivenPanel givenArray={givenNodes} solutionNode={solutionNode} toggleSelected={toggleSelectedProofNode} />
      <RulePanel axioms={axioms} toggleSelected={toggleSelectedAxiom} />
    </div>
  );
}

const styles = {
  split: {
    display: "flex",
    height: "100vh",
    gap: "5px",
  } satisfies React.CSSProperties,
};
