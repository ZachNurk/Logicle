/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import GivenPanel from "./components/GivenPanel/GivenPanel";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import RulePanel from "./components/RulePanel/RulePanel";
import { useProofSession } from "./hooks/proof_session/useProofSession";
import "./App.css";

/**
 * Main App
 * Program is split into three panels: GivenPanel (left), InfoPanel (center), RulePanel (right).
 */
export default function App() {
  const {
    nodes,
    solutionNode,
    toggleSelectedProofNode,
    axioms,
    toggleSelectedAxiom,
    applySelectedAxiom,
    victory,
    selectedSide,
    setSide,
  } = useProofSession();

  if (!victory) {
    return (
      <div className="split">
        <GivenPanel givenArray={nodes} solutionNode={solutionNode} toggleSelected={toggleSelectedProofNode} />
        <RulePanel
          axioms={axioms}
          toggleSelected={toggleSelectedAxiom}
          onApply={applySelectedAxiom}
          selectedSide={selectedSide}
          onSelectSide={setSide}
        />
        <InfoPanel />
      </div>
    );
  }
}
