import type { CSSProperties } from "react";
import type { AuthUser } from "../hooks/user/useAuth";
import { Colors } from "../constants/theme";

type HowToPlayModalProps = {
  currentUser: AuthUser | null;
  onClose?: () => void;
  onEndless?: () => void;
  onLogout?: () => void;
};

export default function HowToPlayModal({
  onClose,
}: HowToPlayModalProps) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button type="button" style={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
        <h2 style={styles.title}>How to Play</h2>

        <p style={styles.lead}>
          Prove the goal at the bottom using the given facts and the rules.
        </p>

        <ul style={styles.list}>
          <li style={styles.listItem}>
            Select facts on the left (one or two, depending on the rule).
          </li>
          <li style={styles.listItem}>
            Pick a rule on the right to derive a new fact. 
            <br></br>(Hover the i to see rule info)
          </li>
          <li style={styles.listItem}>
            In rule info, <strong>∧</strong> means you need both facts selected.
          </li>
          <li style={styles.listItem}>
            Win when something you derive matches the goal exactly.
          </li>
        </ul>

        {/* <p style={styles.footer}>
          A new puzzle each day. Sign in to save your progress.
        </p> */}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  box: {
    position: "relative",
    background: Colors.background,
    borderRadius: "20px",
    padding: "56px",
    minWidth: "560px",
    maxWidth: "760px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  closeButton: {
    position: "absolute",
    top: "18px",
    right: "18px",
    border: "none",
    background: "transparent",
    fontSize: "24px",
    cursor: "pointer",
    color: "#555",
    lineHeight: 1,
  },
  title: {
    margin: "0 0 22px 0",
    fontSize: "38px",
    fontWeight: 700,
  },
  lead: {
    margin: "0 0 24px 0",
    fontSize: "23px",
    lineHeight: 1.5,
    color: "#333",
  },
  list: {
    margin: "0 0 20px 0",
    paddingLeft: "28px",
    fontSize: "22px",
    lineHeight: 1.55,
    color: "#333",
  },
  listItem: {
    marginBottom: "12px",
  },
  footer: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.5,
    color: "#666",
  },
};
