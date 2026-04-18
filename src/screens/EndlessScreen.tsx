import type { CSSProperties } from "react";
import { useState } from "react";
import AxiomPanel from "../components/AxiomPanel";
import ProofNodePanel from "../components/ProofNodePanel";
import StatsModal from "../components/StatsModal";
import HowToPlayModal from "../components/HowToPlayModal";
import LeaveEndlessModal from "../components/LeaveEndlessModal";
import type { Axiom } from "../logic/Axiom";
import type { ProofNode } from "../logic/ProofNode";
import type { AuthUser } from "../hooks/user/useAuth";

type EndlessScreenProps = {
  nodes: ProofNode[];
  solutionNode: ProofNode;
  toggleSelectedProofNode: (id: string) => void;
  axioms: Axiom[];
  toggleSelectedAxiom: (id: string) => void;
  applyAxiom: (
    axiom: Axiom,
    sideOverride?: "left" | "right",
    additionText?: string,
  ) => void;
  selectedSide: "" | "left" | "right";
  setSide: (side: "left" | "right") => void;
  logOut: () => void;
  currentUser: AuthUser | null;
  completedDayIds: string[];
  deleteSelectedNode: () => void;
  resetNodes: () => void;
  invalidAxiomIds: string[];
  /** Puzzles solved this endless session (local session state only) */
  endlessSolves: number;
  /** Return to the daily puzzle screen */
  onBackToDaily: () => void;
};

export default function EndlessScreen({
  nodes,
  solutionNode,
  toggleSelectedProofNode,
  axioms,
  toggleSelectedAxiom,
  applyAxiom,
  selectedSide,
  setSide,
  logOut,
  currentUser,
  completedDayIds,
  deleteSelectedNode,
  resetNodes,
  invalidAxiomIds,
  endlessSolves,
  onBackToDaily,
}: EndlessScreenProps) {
  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(false);
  const [showLeaveDailyConfirm, setShowLeaveDailyConfirm] = useState(false);

  return (
    <div style={styles.page}>
      {showStats && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          onClose={() => setShowStats(false)}
        />
      )}
      {showHowToPlay && (
        <HowToPlayModal currentUser={currentUser} onClose={() => setHowToPlay(false)} />
      )}
      {showLeaveDailyConfirm && (
        <LeaveEndlessModal
          endlessSolves={endlessSolves}
          onClose={() => setShowLeaveDailyConfirm(false)}
          onConfirm={() => {
            setShowLeaveDailyConfirm(false);
            onBackToDaily();
          }}
        />
      )}

      <header style={styles.topBar}>
        <button
          type="button"
          style={styles.howToPlayButton}
          onClick={() => setHowToPlay(true)}
          aria-label="How to play"
        >
          ?
        </button>
        <h1 style={styles.title}>Endless</h1>
        <div style={styles.rightActions}>
          <button style={styles.menuButton} onClick={() => setShowStats(true)}>
            Stats
          </button>
          <button
            type="button"
            style={styles.menuButton}
            onClick={() => setShowLeaveDailyConfirm(true)}
          >
            Daily
          </button>
          <button style={styles.menuButton} onClick={logOut}>
            Logout
          </button>
        </div>
      </header>

      <div style={styles.contentWrap}>
        <div style={styles.mainColumn}>
          <div style={styles.endlessCounterRow} aria-live="polite">
            <div style={styles.endlessCounter}>
              <span style={styles.endlessCounterLabel}>Solved this run</span>
              <span style={styles.endlessCounterValue}>{endlessSolves}</span>
            </div>
          </div>
          <div style={styles.split}>
          <div style={styles.panel}>
            <ProofNodePanel
              givenArray={nodes}
              solutionNode={solutionNode}
              toggleSelected={toggleSelectedProofNode}
            />
          </div>
          <div style={styles.panel}>
            <AxiomPanel
              axioms={axioms}
              toggleSelected={toggleSelectedAxiom}
              applyAxiom={applyAxiom}
              selectedSide={selectedSide}
              onSelectSide={setSide}
              deleteSelectedNode={deleteSelectedNode}
              resetNodes={resetNodes}
              invalidAxiomIds={invalidAxiomIds}
            />
          </div>
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
    background: "#ffffff",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
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
  howToPlayButton: {
    width: "36px",
    height: "36px",
    padding: 0,
    border: "3px solid #000",
    borderRadius: "50%",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  contentWrap: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  mainColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "100%",
    maxWidth: "1200px",
  },
  endlessCounterRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "24px 32px",
    fontSize: "15px",
    color: "#333",
  },
  endlessCounter: {
    display: "flex",
    alignItems: "baseline",
    gap: "10px",
  },
  endlessCounterLabel: {
    fontWeight: 600,
    letterSpacing: "0.02em",
  },
  endlessCounterValue: {
    fontSize: "22px",
    fontWeight: 700,
    fontVariantNumeric: "tabular-nums",
    minWidth: "2ch",
  },
  split: {
    display: "flex",
    gap: "12px",
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
  panel: {
    flex: "0 0 520px",
    height: "680px",
    minHeight: "680px",
    maxWidth: "520px",
    display: "flex",
    boxSizing: "border-box",
  },
};
