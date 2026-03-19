import type { CSSProperties } from "react";
import type { AuthUser } from "../hooks/user/useAuth";

type StatsModalProps = {
  currentUser: AuthUser | null;
  onClose: () => void;
};

export default function StatsModal({ currentUser, onClose }: StatsModalProps) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✕</button>
        <h2 style={styles.title}>Your Stats</h2>
        <div style={styles.statRow}>
          <span style={styles.statLabel}>Puzzles completed</span>
          <span style={styles.statValue}>{currentUser?.completedDayIds?.length ?? 0}</span>
        </div>
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
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    minWidth: "320px",
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
    margin: "0 0 24px 0",
    fontSize: "20px",
    fontWeight: 700,
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  statLabel: {
    fontSize: "15px",
    color: "#444",
  },
  statValue: {
    fontSize: "22px",
    fontWeight: 700,
  },
};
