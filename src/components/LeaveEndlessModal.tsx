import type { CSSProperties } from "react";
import { Colors } from "../constants/theme";

type LeaveEndlessModalProps = {
  onClose: () => void;
  /** Confirm leaving endless — switch to daily */
  onConfirm: () => void;
  endlessSolves: number;
};

export default function LeaveEndlessModal({
  onClose,
  onConfirm,
  endlessSolves,
}: LeaveEndlessModalProps) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        <button type="button" style={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2 style={styles.title}>Return to daily?</h2>

        <p style={styles.lead}>
          Going to the daily puzzle will end this endless run. Your{" "}
          <strong>Solved this run</strong> score ({endlessSolves}) will reset
          the next time you play endless.
        </p>

        <div style={styles.actions}>
          <button type="button" style={styles.cancelButton} onClick={onClose}>
            Stay in endless
          </button>
          <button type="button" style={styles.confirmButton} onClick={onConfirm}>
            Go to daily
          </button>
        </div>
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
    minWidth: "320px",
    maxWidth: "420px",
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
    margin: "0 0 24px 0",
    fontSize: "15px",
    lineHeight: 1.55,
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  cancelButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: Colors.surface1,
    color: "#333",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  confirmButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
