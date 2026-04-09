import type { CSSProperties } from "react";
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
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        <button type="button" style={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2 style={styles.title}>Endless mode</h2>

        <p style={styles.lead}>
          You’ll get random puzzles from the archive, one after another. There’s
          no daily win screen—when you solve a puzzle, another loads
          automatically.
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

        <button type="button" style={styles.startButton} onClick={onStart}>
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
    padding: "32px",
    minWidth: "340px",
    maxWidth: "440px",
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
    fontSize: "20px",
    fontWeight: 700,
  },
  lead: {
    margin: "0 0 16px 0",
    fontSize: "15px",
    lineHeight: 1.5,
    color: "#333",
  },
  list: {
    margin: "0 0 20px 0",
    paddingLeft: "20px",
    fontSize: "15px",
    lineHeight: 1.55,
    color: "#333",
  },
  listItem: {
    marginBottom: "8px",
  },
  startButton: {
    width: "100%",
    height: "42px",
    border: "none",
    borderRadius: "8px",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
