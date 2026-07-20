import type { CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import AxiomPanel from "../components/AxiomPanel";
import ProofNodePanel from "../components/ProofNodePanel";
import StatsModal from "../components/StatsModal";
import HowToPlayModal from "../components/HowToPlayModal";
import EndlessIntroModal from "../components/EndlessIntroModal";
import type { Axiom } from "../logic/Axiom";
import type { ProofNode } from "../logic/ProofNode";
import type { AuthUser } from "../hooks/user/useAuth";
import { Colors } from "../constants/theme";

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
  /** Opens the app-level logout confirmation (shown in place of Logout when signed in). */
  onLogoutClick: () => void;
  currentUser: AuthUser | null;
  /** From `useUserProgress` — keeps stats calendar in sync when a day is completed. */
  completedDayIds: string[];
  victory: boolean;
  deleteSelectedNode: () => void;
  resetNodes: () => void;
  invalidAxiomIds: string[];
  /** From auth after successful create-account, or once on initial load for
   * a signed-out guest; PuzzleScreen opens How to Play once then clears. */
  openHowToPlayOnLoad?: boolean;
  onHowToPlayOnLoadConsumed?: () => void;
  /** Opens endless mode (same session hooks; navigation only until endless data loads separately). */
  onOpenEndless?: () => void;
  /** Navigates to the login screen; shown in place of Logout when signed out. */
  onSignIn?: () => void;
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
  onLogoutClick,
  currentUser,
  completedDayIds,
  victory,
  deleteSelectedNode,
  resetNodes,
  invalidAxiomIds,
  openHowToPlayOnLoad = false,
  onHowToPlayOnLoadConsumed,
  onOpenEndless,
  onSignIn,
}: PuzzleScreenProps) {
  const [showStats, setShowStats] = useState(false);
  const [showEndlessIntro, setShowEndlessIntro] = useState(false);
  const [hoveredMenuButton, setHoveredMenuButton] = useState<
    "info" | "stats" | "endless" | "logout" | null
  >(null);
  /** After winning the daily, auto stats can be closed; manual Stats still works. */
  const [winStatsDismissed, setWinStatsDismissed] = useState(false);
  const [showVictoryStats, setShowVictoryStats] = useState(false);
  const previousVictoryRef = useRef(victory);
  /** Seed from the flag so we don't rely on an effect that clears before Strict Mode's remount. */
  const [showHowToPlay, setHowToPlay] = useState(openHowToPlayOnLoad);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (openHowToPlayOnLoad) {
      setHowToPlay(true);
      onHowToPlayOnLoadConsumed?.();
    }
  }, [openHowToPlayOnLoad, onHowToPlayOnLoadConsumed]);

  useEffect(() => {
    if (!victory) setWinStatsDismissed(false);
  }, [victory]);

  useEffect(() => {
    const previousVictory = previousVictoryRef.current;
    previousVictoryRef.current = victory;

    if (!victory) {
      setShowVictoryStats(false);
      return;
    }

    if (previousVictory) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowVictoryStats(true);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [victory]);

  const closeHowToPlay = () => {
    setHowToPlay(false);
  };

  return (
    <div style={styles.page}>
      {victory && showVictoryStats && !winStatsDismissed && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          title="You Won!"
          onClose={() => setWinStatsDismissed(true)}
          onEndless={() => setShowEndlessIntro(true)}
          onLogout={onLogoutClick}
          onSignIn={onSignIn}
        />
      )}
      {showStats && (!victory || winStatsDismissed || !showVictoryStats) && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          onClose={() => setShowStats(false)}
          onLogout={onLogoutClick}
          onSignIn={onSignIn}
        />
      )}
      {showHowToPlay && (
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

      <header style={{ ...styles.topBar, ...(isMobile ? styles.topBarMobile : {}) }}>
        <button
          type="button"
          style={{
            ...styles.howToPlayButton,
            ...(hoveredMenuButton === "info" ? styles.menuButtonPinkHover : {}),
          }}
          onClick={() => setHowToPlay(true)}
          onMouseEnter={() => setHoveredMenuButton("info")}
          onMouseLeave={() => setHoveredMenuButton(null)}
          aria-label="How to play"
        >
          ?
        </button>
        <h1 style={{ ...styles.title, ...(isMobile ? styles.titleMobile : {}) }}>
          Logicle
        </h1>
        <div style={{ ...styles.rightActions, ...(isMobile ? styles.rightActionsMobile : {}) }}>
          <button
            style={{
              ...styles.menuButton,
              ...(hoveredMenuButton === "stats" ? styles.menuButtonPinkHover : {}),
            }}
            onClick={() => setShowStats(true)}
            onMouseEnter={() => setHoveredMenuButton("stats")}
            onMouseLeave={() => setHoveredMenuButton(null)}
          >
            Stats
          </button>
          <button
            type="button"
            style={{
              ...styles.menuButton,
              ...(hoveredMenuButton === "endless" ? styles.menuButtonPinkHover : {}),
            }}
            onClick={() => setShowEndlessIntro(true)}
            onMouseEnter={() => setHoveredMenuButton("endless")}
            onMouseLeave={() => setHoveredMenuButton(null)}
          >
            Endless
          </button>
          {currentUser ? (
            <button
              style={{
                ...styles.menuButton,
                ...(hoveredMenuButton === "logout" ? styles.menuButtonRedHover : {}),
              }}
              onClick={onLogoutClick}
              onMouseEnter={() => setHoveredMenuButton("logout")}
              onMouseLeave={() => setHoveredMenuButton(null)}
            >
              Logout
            </button>
          ) : (
            <button
              style={{
                ...styles.menuButton,
                ...styles.menuButtonPink,
                ...(hoveredMenuButton === "logout" ? styles.menuButtonPinkHover : {}),
              }}
              onClick={onSignIn}
              onMouseEnter={() => setHoveredMenuButton("logout")}
              onMouseLeave={() => setHoveredMenuButton(null)}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <div
        style={{
          ...styles.contentWrap,
          ...(isMobile ? styles.contentWrapMobile : {}),
        }}
      >
        <div
          style={{
            ...styles.split,
            ...(isMobile ? styles.splitMobile : {}),
            ...(victory ? styles.splitLocked : {}),
          }}
          aria-hidden={victory}
        >
          <div style={{ ...styles.panel, ...(isMobile ? styles.panelMobile : {}) }}>
            <ProofNodePanel
              givenArray={nodes}
              solutionNode={solutionNode}
              toggleSelected={toggleSelectedProofNode}
            />
          </div>
          <div style={{ ...styles.panel, ...(isMobile ? styles.panelMobile : {}) }}>
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
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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
  topBarMobile: {
    height: "auto",
    minHeight: "56px",
    flexWrap: "wrap",
    gap: "8px",
    padding: "8px",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  titleMobile: {
    position: "static",
    transform: "none",
    order: 3,
    width: "100%",
    textAlign: "center",
    fontSize: "18px",
  },
  rightActions: {
    display: "flex",
    gap: "8px",
  },
  rightActionsMobile: {
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  menuButton: {
    border: "1px solid #000",
    background: "#000",
    color: "#fff",
    padding: "8px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition:
      "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
  },
  menuButtonPinkHover: {
    color: "#000",
    transform: "translate(-2px, -2px)",
    background: Colors.lightPink,
    boxShadow: "0.25rem 0.25rem #000",
  },
  menuButtonPink: {
    border: `1px solid ${Colors.lightPink}`,
    background: Colors.lightPink,
    color: "#000",
  },
  menuButtonRedHover: {
    color: "#fff",
    transform: "translate(-2px, -2px)",
    background: "#ef4444",
    boxShadow: "0.25rem 0.25rem #000",
  },
  howToPlayButton: {
    width: "36px",
    height: "36px",
    padding: 0,
    border: "1px solid #000",
    borderRadius: "4px",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    transition:
      "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
  },
  contentWrap: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    overflow: "hidden",
  },
  contentWrapMobile: {
    padding: "12px",
    alignItems: "stretch",
  },
  split: {
    display: "flex",
    gap: "12px",
    width: "100%",
    height: "100%",
    maxWidth: "1360px",
    justifyContent: "center",
    alignItems: "stretch",
  },
  splitMobile: {
    flexDirection: "column",
    gap: "16px",
  },
  splitLocked: {
    pointerEvents: "none",
    userSelect: "none",
  },
  panel: {
    flex: "1 1 600px",
    height: "100%",
    minHeight: 0,
    maxWidth: "600px",
    display: "flex",
    boxSizing: "border-box",
    overflow: "auto",
  },
  panelMobile: {
    flex: "1 1 auto",
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    minHeight: 0,
  },
};
