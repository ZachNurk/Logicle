import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import AxiomPanel from "../components/AxiomPanel";
import ProofNodePanel from "../components/ProofNodePanel";
import StatsModal from "../components/StatsModal";
import HowToPlayModal from "../components/HowToPlayModal";
import EndlessIntroModal from "../components/EndlessIntroModal";
import type { Axiom } from "../logic/Axiom";
import type { ProofNode } from "../logic/ProofNode";
import type { AuthUser } from "../hooks/user/useAuth";

type PuzzleScreenProps = {
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
  /** From `useUserProgress` — keeps stats calendar in sync when a day is completed. */
  completedDayIds: string[];
  victory: boolean;
  deleteSelectedNode: () => void;
  resetNodes: () => void;
  invalidAxiomIds: string[];
  /** From auth after successful create-account; PuzzleScreen opens How to Play once then clears. */
  openHowToPlayAfterSignup?: boolean;
  onHowToPlayAfterSignupConsumed?: () => void;
  /** Opens endless mode (same session hooks; navigation only until endless data loads separately). */
  onOpenEndless?: () => void;
};

export default function PuzzleScreen({
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
  victory,
  deleteSelectedNode,
  resetNodes,
  invalidAxiomIds,
  openHowToPlayAfterSignup = false,
  onHowToPlayAfterSignupConsumed,
  onOpenEndless,
}: PuzzleScreenProps) {
  const [showStats, setShowStats] = useState(false);
  const [showEndlessIntro, setShowEndlessIntro] = useState(false);
  /** After winning the daily, auto stats can be closed; manual Stats still works. */
  const [winStatsDismissed, setWinStatsDismissed] = useState(false);
  /** Seed from signup flag so we don't rely on an effect that clears before Strict Mode's remount. */
  const [showHowToPlay, setHowToPlay] = useState(openHowToPlayAfterSignup);

  useEffect(() => {
    if (openHowToPlayAfterSignup) setHowToPlay(true);
  }, [openHowToPlayAfterSignup]);

  useEffect(() => {
    if (!victory) setWinStatsDismissed(false);
  }, [victory]);

  const closeHowToPlay = () => {
    setHowToPlay(false);
    if (openHowToPlayAfterSignup) onHowToPlayAfterSignupConsumed?.();
  };

  return (
    <div style={styles.page}>
      {victory && !winStatsDismissed && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          title="You Won!"
          onClose={() => setWinStatsDismissed(true)}
          onEndless={() => setShowEndlessIntro(true)}
          onLogout={logOut}
        />
      )}
      {showStats && (!victory || winStatsDismissed) && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          onClose={() => setShowStats(false)}
        />
      )}
      {!victory && showHowToPlay && (
        <HowToPlayModal currentUser={currentUser} onClose={closeHowToPlay} />
      )}
      {showEndlessIntro && (
        <EndlessIntroModal
          onClose={() => setShowEndlessIntro(false)}
          onStart={() => {
            setShowEndlessIntro(false);
            onOpenEndless?.();
          }}
        />
      )}

      <header style={styles.topBar}>
        <button
          type="button"
          style={{
            ...styles.howToPlayButton,
            ...(victory ? styles.howToPlayButtonDisabled : {}),
          }}
          disabled={victory}
          onClick={() => setHowToPlay(true)}
          aria-label="How to play"
        >
          ?
        </button>
        <h1 style={styles.title}>Logicle</h1>
        <div style={styles.rightActions}>
          <button style={styles.menuButton} onClick={() => setShowStats(true)}>Stats</button>
          <button
            type="button"
            style={styles.menuButton}
            onClick={() => setShowEndlessIntro(true)}
          >
            Endless
          </button>
          <button style={styles.menuButton} onClick={logOut}>Logout</button>
        </div>
      </header>

      <div style={styles.contentWrap}>
        <div
          style={{
            ...styles.split,
            ...(victory ? styles.splitLocked : {}),
          }}
          aria-hidden={victory}
        >
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
  howToPlayButtonDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
  },
  contentWrap: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  split: {
    display: "flex",
    gap: "12px",
    width: "100%",
    maxWidth: "1200px",
    justifyContent: "center",
    alignItems: "stretch",
  },
  splitLocked: {
    pointerEvents: "none",
    userSelect: "none",
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
