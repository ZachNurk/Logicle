import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import AxiomPanel from "../components/AxiomPanel";
import ProofNodePanel from "../components/ProofNodePanel";
import StatsModal from "../components/StatsModal";
import HowToPlayModal from "../components/HowToPlayModal";
import type { Axiom } from "../logic/Axiom";
import type { ProofNode } from "../logic/ProofNode";
import type { SolutionStep } from "../logic/GeneratePuzzle";
import type { AuthUser } from "../hooks/user/useAuth";
import { Colors } from "../constants/theme";

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
  /** Opens the app-level logout confirmation (shown in place of Logout when signed in). */
  onLogoutClick: () => void;
  currentUser: AuthUser | null;
  completedDayIds: string[];
  deleteSelectedNode: () => void;
  resetNodes: () => void;
  invalidAxiomIds: string[];
  /** Forward-order guide from givens to solution, for "Give Up". */
  solutionSteps: SolutionStep[];
  /** Return to the daily puzzle screen */
  onBackToDaily: () => void;
  /** Navigates to the login screen; shown in place of Logout when signed out. */
  onSignIn?: () => void;
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
  onLogoutClick,
  currentUser,
  completedDayIds,
  deleteSelectedNode,
  resetNodes,
  invalidAxiomIds,
  solutionSteps,
  onBackToDaily,
  onSignIn,
}: EndlessScreenProps) {
  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(false);
  const [showGiveUpConfirm, setShowGiveUpConfirm] = useState(false);
  const [hasConfirmedGiveUp, setHasConfirmedGiveUp] = useState(false);
  const [showGiveUpSteps, setShowGiveUpSteps] = useState(false);
  const [hoveredMenuButton, setHoveredMenuButton] = useState<
    "info" | "stats" | "daily" | "giveup" | "logout" | null
  >(null);

  // New puzzle loaded — hide any steps from the previous one and require
  // confirmation again before showing this puzzle's steps.
  useEffect(() => {
    setShowGiveUpSteps(false);
    setHasConfirmedGiveUp(false);
  }, [solutionSteps]);

  const handleGiveUpClick = () => {
    if (solutionSteps.length === 0) return;
    if (!hasConfirmedGiveUp) {
      setShowGiveUpConfirm(true);
      return;
    }
    setShowGiveUpSteps((prev) => !prev);
  };

  // Text lookup for every node that can appear as a step's input: the puzzle's
  // starting givens plus every prior step's output (built forward, top to bottom).
  const nodeTextById = useMemo(() => {
    const map = new Map<string, string>();
    nodes.forEach((n) => map.set(n.id, n.text));
    solutionSteps.forEach((step) => map.set(step.output.id, step.output.text));
    return map;
  }, [nodes, solutionSteps]);

  return (
    <div style={styles.page}>
      <style>{`
        .endless-steps-panel::-webkit-scrollbar {
          width: 10px;
        }
        .endless-steps-panel::-webkit-scrollbar-track {
          background: #eee;
          border-radius: 8px;
        }
        .endless-steps-panel::-webkit-scrollbar-thumb {
          background: #999;
          border-radius: 8px;
        }
        .endless-steps-panel::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
      `}</style>
      {showStats && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          onClose={() => setShowStats(false)}
          onLogout={onLogoutClick}
          onSignIn={onSignIn}
        />
      )}
      {showHowToPlay && (
        <HowToPlayModal currentUser={currentUser} onClose={() => setHowToPlay(false)} />
      )}
      {showGiveUpConfirm && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <h2 style={styles.confirmTitle}>Give up on this one?</h2>
            <p style={styles.confirmLead}>
              This will show the numbered rule and node to use for each step.
              You can toggle the list on and off from the same button.
            </p>
            <div style={styles.confirmActions}>
              <button
                type="button"
                style={styles.confirmCancelButton}
                onClick={() => setShowGiveUpConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                style={styles.confirmGiveUpButton}
                onClick={() => {
                  setShowGiveUpConfirm(false);
                  setHasConfirmedGiveUp(true);
                  setShowGiveUpSteps(true);
                }}
              >
                Give up
              </button>
            </div>
          </div>
        </div>
      )}

      <header style={styles.topBar}>
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
        <h1 style={styles.title}>Endless</h1>
        <div style={styles.rightActions}>
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
              ...(hoveredMenuButton === "daily" ? styles.menuButtonPinkHover : {}),
            }}
            onClick={onBackToDaily}
            onMouseEnter={() => setHoveredMenuButton("daily")}
            onMouseLeave={() => setHoveredMenuButton(null)}
          >
            Daily
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

      <div style={styles.contentWrap}>
        <div style={styles.mainColumn}>
          <div style={styles.endlessCounterRow}>
            <button
              type="button"
              style={{
                ...styles.menuButton,
                ...styles.menuButtonPink,
                ...(hoveredMenuButton === "giveup" ? styles.menuButtonRedHover : {}),
                ...(solutionSteps.length === 0 ? styles.menuButtonDisabled : {}),
              }}
              onClick={handleGiveUpClick}
              disabled={solutionSteps.length === 0}
              onMouseEnter={() => setHoveredMenuButton("giveup")}
              onMouseLeave={() => setHoveredMenuButton(null)}
            >
              {showGiveUpSteps ? "Hide steps" : "Give Up"}
            </button>
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
          {showGiveUpSteps && (
            <div className="endless-steps-panel" style={styles.stepsPanel}>
              <div style={styles.stepsPanelTitle}>Steps</div>
              <div style={styles.stepsList}>
                {solutionSteps.map((step, i) => (
                  <div key={i} style={styles.stepsListItem}>
                    <div style={styles.stepRule}>
                      {i + 1}. {step.ruleLabel}
                    </div>
                    <div style={styles.stepNode}>
                      {step.inputIds
                        .map((id) => nodeTextById.get(id) ?? "?")
                        .join(", ")}
                    </div>
                    <div style={styles.stepResult}>→ {step.output.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
  menuButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
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
  mainColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "100%",
    height: "100%",
    maxWidth: "1360px",
  },
  endlessCounterRow: {
    flex: "0 0 auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "24px 32px",
    fontSize: "15px",
    color: "#333",
  },
  split: {
    flex: "1 1 auto",
    minHeight: 0,
    display: "flex",
    gap: "12px",
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
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
  stepsPanel: {
    flex: "0 0 220px",
    width: "220px",
    height: "100%",
    minHeight: 0,
    boxSizing: "border-box",
    background: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    overflowY: "scroll",
    scrollbarWidth: "auto",
    scrollbarColor: "#999 #eee",
  } as CSSProperties,
  stepsPanelTitle: {
    fontWeight: 700,
    fontSize: "14px",
    marginBottom: "10px",
  },
  stepsList: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  stepsListItem: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    fontSize: "12px",
    lineHeight: 1.35,
    borderBottom: "1px solid #eee",
    paddingBottom: "8px",
  },
  stepRule: {
    fontWeight: 700,
    color: "#333",
    wordBreak: "break-word",
  },
  stepNode: {
    wordBreak: "break-word",
    color: "#555",
  },
  stepResult: {
    wordBreak: "break-word",
    color: "#111",
    fontWeight: 600,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 110,
  },
  confirmBox: {
    background: Colors.background,
    borderRadius: "16px",
    padding: "32px",
    minWidth: "380px",
    maxWidth: "480px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  confirmTitle: {
    margin: "0 0 12px 0",
    fontSize: "22px",
    fontWeight: 700,
  },
  confirmLead: {
    margin: "0 0 24px 0",
    fontSize: "15px",
    lineHeight: 1.5,
    color: "#333",
  },
  confirmActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  confirmCancelButton: {
    padding: "0.6em 1.4em",
    borderRadius: "4px",
    border: `1px solid ${Colors.black}`,
    background: "#fff",
    color: Colors.black,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  confirmGiveUpButton: {
    padding: "0.6em 1.4em",
    borderRadius: "4px",
    border: `1px solid ${Colors.darkPink}`,
    background: Colors.darkPink,
    color: Colors.black,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
