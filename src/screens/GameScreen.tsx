import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import AxiomPanel from "../components/AxiomPanel";
import ProofNodePanel from "../components/ProofNodePanel";
import StatsModal from "../components/StatsModal";
import HowToPlayModal from "../components/HowToPlayModal";
import EndlessIntroModal from "../components/EndlessIntroModal";
import type { Axiom } from "../logic/Axiom";
import type { ProofNode } from "../logic/ProofNode";
import type { SolutionStep } from "../logic/GeneratePuzzle";
import type { AuthUser } from "../hooks/user/useAuth";
import { Colors } from "../constants/theme";

type GameScreenProps = {
  mode: "daily" | "endless";
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
  /** From `useUserProgress` — keeps stats calendar in sync when a day is given up on. */
  givenUpDayIds: string[];
  deleteSelectedNode: () => void;
  resetNodes: () => void;
  invalidAxiomIds: string[];
  /** Navigates to the login screen; shown in place of Logout when signed out. */
  onSignIn?: () => void;

  // --- daily-only ---
  victory?: boolean;
  gaveUp?: boolean;
  onGiveUp?: () => void;
  /** From auth after successful create-account, or once on initial load for
   * a signed-out guest; opens How to Play once then clears. */
  openHowToPlayOnLoad?: boolean;
  onHowToPlayOnLoadConsumed?: () => void;
  /** Opens endless mode (same session hooks; navigation only until endless data loads separately). */
  onOpenEndless?: () => void;

  // --- endless-only ---
  /** Forward-order guide from givens to solution, for "Give Up". */
  solutionSteps?: SolutionStep[];
  /** Return to the daily puzzle screen */
  onBackToDaily?: () => void;
};

export default function GameScreen({
  mode,
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
  givenUpDayIds,
  deleteSelectedNode,
  resetNodes,
  invalidAxiomIds,
  onSignIn,
  victory = false,
  gaveUp = false,
  onGiveUp,
  openHowToPlayOnLoad = false,
  onHowToPlayOnLoadConsumed,
  onOpenEndless,
  solutionSteps = [],
  onBackToDaily,
}: GameScreenProps) {
  const isDaily = mode === "daily";

  const [showStats, setShowStats] = useState(false);
  const [showEndlessIntro, setShowEndlessIntro] = useState(false);
  const [showGiveUpConfirm, setShowGiveUpConfirm] = useState(false);
  const [hasConfirmedGiveUp, setHasConfirmedGiveUp] = useState(false);
  const [showGiveUpSteps, setShowGiveUpSteps] = useState(false);
  type MenuButtonKey = "info" | "stats" | "endless" | "daily" | "giveup" | "logout";
  const [hoveredMenuButton, setHoveredMenuButton] = useState<MenuButtonKey | null>(
    null,
  );
  /** Briefly cleared on click so the hover style drops out, reading as a press. */
  const [pressedMenuButton, setPressedMenuButton] = useState<MenuButtonKey | null>(
    null,
  );
  const pressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
    };
  }, []);

  const pressMenuButton = (key: MenuButtonKey, action?: () => void) => {
    if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
    setPressedMenuButton(key);
    // Clicking opens a modal/confirm dialog or swaps screens, so don't auto-rehover
    // once the press wears off — only a genuine mouse leave+enter restores hover.
    setHoveredMenuButton(null);
    pressTimeoutRef.current = setTimeout(() => {
      setPressedMenuButton(null);
      pressTimeoutRef.current = null;
    }, 750);
    action?.();
  };

  const isMenuHovered = (key: MenuButtonKey) =>
    hoveredMenuButton === key && pressedMenuButton !== key;
  const isMenuPressed = (key: MenuButtonKey) => pressedMenuButton === key;
  /** After winning the daily, auto stats can be closed; manual Stats still works. */
  const [winStatsDismissed, setWinStatsDismissed] = useState(false);
  const [showVictoryStats, setShowVictoryStats] = useState(false);
  const previousVictoryRef = useRef(victory);
  /** Seed from the flag so we don't rely on an effect that clears before Strict Mode's remount. */
  const [showHowToPlay, setHowToPlay] = useState(openHowToPlayOnLoad);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!isDaily) return;
    if (openHowToPlayOnLoad) {
      setHowToPlay(true);
      onHowToPlayOnLoadConsumed?.();
    }
  }, [isDaily, openHowToPlayOnLoad, onHowToPlayOnLoadConsumed]);

  useEffect(() => {
    if (!isDaily) return;
    if (!victory) setWinStatsDismissed(false);
  }, [isDaily, victory]);

  useEffect(() => {
    if (!isDaily) return;
    const previousVictory = previousVictoryRef.current;
    previousVictoryRef.current = victory;

    if (!victory) {
      setShowVictoryStats(false);
      return;
    }
    if (previousVictory) return;

    const timeoutId = window.setTimeout(() => {
      setShowVictoryStats(true);
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [isDaily, victory]);

  // Endless: new puzzle loaded — hide any steps from the previous one and
  // require confirmation again before showing this puzzle's steps.
  useEffect(() => {
    if (isDaily) return;
    setShowGiveUpSteps(false);
    setHasConfirmedGiveUp(false);
  }, [isDaily, solutionSteps]);

  // Reveal the walkthrough automatically the moment gaveUp becomes true
  // (first give-up, or reloading a day already given up on).
  useEffect(() => {
    if (isDaily && gaveUp) setShowGiveUpSteps(true);
  }, [isDaily, gaveUp]);

  // Daily's "confirmed" state is the persisted gaveUp flag; endless uses its
  // own local per-puzzle flag since a new puzzle resets it.
  const giveUpConfirmed = isDaily ? gaveUp : hasConfirmedGiveUp;

  const handleGiveUpClick = () => {
    if (!isDaily && solutionSteps.length === 0) return;
    if (!giveUpConfirmed) {
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

  const closeHowToPlay = () => setHowToPlay(false);

  // Victory locks the panel (nothing left to solve); giving up leaves it
  // interactive so the user can still finish the proof using the revealed steps.
  const dailyLocked = isDaily && victory;

  return (
    <div style={styles.page}>
      {!isDaily && (
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
      )}

      {isDaily && victory && showVictoryStats && !winStatsDismissed && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          givenUpDayIds={givenUpDayIds}
          title="Puzzle Completed"
          note={gaveUp ? "You gave up before finishing this one." : undefined}
          onClose={() => setWinStatsDismissed(true)}
          onEndless={() => setShowEndlessIntro(true)}
          onLogout={onLogoutClick}
          onSignIn={onSignIn}
        />
      )}
      {showStats && (!isDaily || !victory || winStatsDismissed || !showVictoryStats) && (
        <StatsModal
          currentUser={currentUser}
          completedDayIds={completedDayIds}
          givenUpDayIds={givenUpDayIds}
          onClose={() => setShowStats(false)}
          onLogout={onLogoutClick}
          onSignIn={onSignIn}
        />
      )}
      {showGiveUpConfirm && isDaily && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <h2 style={styles.confirmTitle}>Give up on today's puzzle?</h2>
            <p style={styles.confirmLead}>
              This ends today's puzzle without solving it and shows the
              solution steps. You won't be able to try again until
              tomorrow's puzzle.
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
                  onGiveUp?.();
                }}
              >
                Give up
              </button>
            </div>
          </div>
        </div>
      )}
      {showGiveUpConfirm && !isDaily && (
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
      {showHowToPlay && (
        <HowToPlayModal currentUser={currentUser} onClose={closeHowToPlay} />
      )}
      {isDaily && showEndlessIntro && (
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
            ...(isMenuPressed("info")
              ? styles.menuButtonPinkPressed
              : isMenuHovered("info")
                ? styles.menuButtonPinkHover
                : {}),
          }}
          onClick={() => pressMenuButton("info", () => setHowToPlay(true))}
          onMouseEnter={() => setHoveredMenuButton("info")}
          onMouseLeave={() => setHoveredMenuButton(null)}
          aria-label="How to play"
        >
          ?
        </button>
        <h1 style={{ ...styles.title, ...(isMobile ? styles.titleMobile : {}) }}>
          {isDaily ? "Logicle" : "Endless"}
        </h1>
        <div style={{ ...styles.rightActions, ...(isMobile ? styles.rightActionsMobile : {}) }}>
          <button
            style={{
              ...styles.menuButton,
              ...(isMenuPressed("stats")
                ? styles.menuButtonPinkPressed
                : isMenuHovered("stats")
                  ? styles.menuButtonPinkHover
                  : {}),
            }}
            onClick={() => pressMenuButton("stats", () => setShowStats(true))}
            onMouseEnter={() => setHoveredMenuButton("stats")}
            onMouseLeave={() => setHoveredMenuButton(null)}
          >
            Stats
          </button>
          {isDaily ? (
            <button
              type="button"
              style={{
                ...styles.menuButton,
                ...(isMenuPressed("endless")
                  ? styles.menuButtonPinkPressed
                  : isMenuHovered("endless")
                    ? styles.menuButtonPinkHover
                    : {}),
              }}
              onClick={() => pressMenuButton("endless", () => setShowEndlessIntro(true))}
              onMouseEnter={() => setHoveredMenuButton("endless")}
              onMouseLeave={() => setHoveredMenuButton(null)}
            >
              Endless
            </button>
          ) : (
            <button
              type="button"
              style={{
                ...styles.menuButton,
                ...(isMenuPressed("daily")
                  ? styles.menuButtonPinkPressed
                  : isMenuHovered("daily")
                    ? styles.menuButtonPinkHover
                    : {}),
              }}
              onClick={() => pressMenuButton("daily", onBackToDaily)}
              onMouseEnter={() => setHoveredMenuButton("daily")}
              onMouseLeave={() => setHoveredMenuButton(null)}
            >
              Daily
            </button>
          )}
          {currentUser ? (
            <button
              style={{
                ...styles.menuButton,
                ...(isMenuPressed("logout")
                  ? styles.menuButtonRedPressed
                  : isMenuHovered("logout")
                    ? styles.menuButtonRedHover
                    : {}),
              }}
              onClick={() => pressMenuButton("logout", onLogoutClick)}
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
                ...styles.signInButton,
                ...(isMenuPressed("logout")
                  ? styles.signInButtonPressed
                  : isMenuHovered("logout")
                    ? styles.signInButtonHover
                    : {}),
              }}
              onClick={() => pressMenuButton("logout", onSignIn)}
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
        <div style={styles.mainColumn}>
          <div
            style={{
              ...styles.split,
              ...(isMobile ? styles.splitMobile : {}),
              ...(dailyLocked ? styles.splitLocked : {}),
            }}
            aria-hidden={dailyLocked}
          >
            <div style={{ ...styles.panel, ...(isMobile ? styles.panelMobile : {}) }}>
              <ProofNodePanel
                givenArray={nodes}
                solutionNode={solutionNode}
                toggleSelected={toggleSelectedProofNode}
                giveUpButton={
                  <button
                    type="button"
                    style={{
                      ...styles.menuButton,
                      ...styles.giveUpButton,
                      ...(isMenuPressed("giveup")
                        ? styles.menuButtonPinkPressed
                        : isMenuHovered("giveup")
                          ? styles.menuButtonPinkHover
                          : {}),
                      ...(isDaily
                        ? victory
                          ? styles.menuButtonDisabled
                          : {}
                        : solutionSteps.length === 0
                          ? styles.menuButtonDisabled
                          : {}),
                    }}
                    onClick={() => pressMenuButton("giveup", handleGiveUpClick)}
                    disabled={isDaily ? victory : solutionSteps.length === 0}
                    onMouseEnter={() => setHoveredMenuButton("giveup")}
                    onMouseLeave={() => setHoveredMenuButton(null)}
                  >
                    {giveUpConfirmed
                      ? showGiveUpSteps
                        ? "Hide steps"
                        : "Show steps"
                      : "Give Up"}
                  </button>
                }
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
  menuButtonPinkPressed: {
    color: "#000",
    transform: "translate(0, 0)",
    background: Colors.lightPink,
    boxShadow: "none",
  },
  menuButtonPink: {
    border: `1px solid ${Colors.lightPink}`,
    background: Colors.lightPink,
    color: "#000",
  },
  signInButton: {
    border: `1px solid ${Colors.black}`,
  },
  signInButtonHover: {
    color: "#000",
    transform: "translate(-2px, -2px)",
    background: Colors.purple,
    boxShadow: "0.25rem 0.25rem #000",
  },
  signInButtonPressed: {
    color: "#000",
    transform: "translate(0, 0)",
    background: Colors.purple,
    boxShadow: "none",
  },
  menuButtonRedHover: {
    color: "#fff",
    transform: "translate(-2px, -2px)",
    background: "#ef4444",
    boxShadow: "0.25rem 0.25rem #000",
  },
  menuButtonRedPressed: {
    color: "#fff",
    transform: "translate(0, 0)",
    background: "#ef4444",
    boxShadow: "none",
  },
  menuButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  giveUpButton: {
    padding: "8px 22px",
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
  mainColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    width: "100%",
    height: "100%",
    maxWidth: "1360px",
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
};
