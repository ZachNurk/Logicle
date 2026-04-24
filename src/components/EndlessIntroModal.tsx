import type { CSSProperties } from "react";
import { useState } from "react";
import { Colors } from "../constants/theme";

type EndlessIntroModalProps = {
  onClose: () => void;
  /** User confirmed — switch to endless mode */
  onStart: () => void;
};

export default function EndlessIntroModal({
  onClose,
  onStart,
}: EndlessIntroModalProps) {
  const [startHovered, setStartHovered] = useState(false);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        <button type="button" style={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2 style={styles.title}>Endless mode</h2>

        <p style={styles.lead}>
          You’ll get randomly generated puzzles, one after another. There’s no
          daily win screen—when you solve a puzzle, another loads automatically.
        </p>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            Solves here don’t mark days on your stats calendar or affect your
            daily streak.
          </li>
          <li style={styles.listItem}>
            Use <strong>Daily</strong> from the menu when you want the official
            puzzle of the day.
          </li>
        </ul>

        <button
          type="button"
          style={{
            ...styles.startButton,
            ...(startHovered ? styles.startButtonHover : {}),
          }}
          onClick={onStart}
          onMouseEnter={() => setStartHovered(true)}
          onMouseLeave={() => setStartHovered(false)}
        >
          Start endless
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 110,
  },
  box: {
    position: "relative",
    background: Colors.background,
    borderRadius: "16px",
    padding: "40px",
    minWidth: "420px",
    maxWidth: "560px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  closeButton: {
    position: "absolute",
    top: "14px",
    right: "14px",
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    color: "#555",
    lineHeight: 1,
  },
  title: {
    margin: "0 0 16px 0",
    fontSize: "28px",
    fontWeight: 700,
  },
  lead: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    lineHeight: 1.5,
    color: "#333",
  },
  list: {
    margin: "0 0 20px 0",
    paddingLeft: "20px",
    fontSize: "17px",
    lineHeight: 1.55,
    color: "#333",
  },
  listItem: {
    marginBottom: "8px",
  },
  startButton: {
    width: "100%",
    minHeight: "48px",
    border: `1px solid ${Colors.black}`,
    borderRadius: "4px",
    padding: "0.8em 2em",
    background: Colors.black,
    color: Colors.white,
    fontSize: "17px",
    fontWeight: 600,
    cursor: "pointer",
    transition:
      "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
    textAlign: "center",
  },
  startButtonHover: {
    color: Colors.black,
    transform: "translate(-2px, -2px)",
    background: Colors.lightPink,
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
};
