/**
 * File handles the state of our app
 * Mostly UI Stuff
 * @file App.tsx
 */

import GivenPanel from "../components/GivenPanel/GivenPanel";
import RulePanel from "../components/RulePanel/RulePanel";
import { useProofSession } from "../hooks/proof_session/useProofSession";
import type { CSSProperties } from "react";

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
    applyAxiom,
    victory,
    selectedSide,
    setSide,
  } = useProofSession();

  if (victory) {
    return <div style={styles.winScreen}>You won!</div>;
  }

  return (
    <div style={styles.page}>
      <header style={styles.topBar}>
        <button style={styles.menuButton}>?</button>
        <h1 style={styles.title}>Logicle</h1>
        <div style={styles.rightActions}>
          <button style={styles.menuButton}>Stats</button>
          <button style={styles.menuButton}>Settings</button>
        </div>
      </header>

      <div style={styles.contentWrap}>
        <div style={styles.split}>
          <div style={styles.panel}>
            <GivenPanel
              givenArray={nodes}
              solutionNode={solutionNode}
              toggleSelected={toggleSelectedProofNode}
            />
          </div>
          <div style={styles.panel}>
            <RulePanel
              axioms={axioms}
              toggleSelected={toggleSelectedAxiom}
              applyAxiom={applyAxiom}
              selectedSide={selectedSide}
              onSelectSide={setSide}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 12px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
  },
  rightActions: {
    display: "flex",
    gap: "8px",
  },
  menuButton: {
    border: "none",
    background: "transparent",
    padding: "8px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  winScreen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: 700,
  },

  contentWrap: {
    flex: 1,
    display: "flex",
    justifyContent: "center",   // center horizontally
    alignItems: "center",       // center vertically (optional)
    padding: "24px",
  },
  split: {
    display: "flex",
    gap: "12px",
    width: "100%",
    maxWidth: "1200px",         // overall centered area
    justifyContent: "center",
    alignItems: "stretch",
  },
  panel: {
    width: "520px",             // fixed panel width
    height: "680px",            // fixed panel height (same for both panels)
    maxWidth: "100%",
    display: "flex",
  },
};
