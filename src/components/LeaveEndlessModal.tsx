import type { CSSProperties } from "react";
import { useState } from "react";
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
  const [hoveredButton, setHoveredButton] = useState<"cancel" | "confirm" | null>(null);

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
          <button
            type="button"
            style={{
              ...styles.actionButton,
              ...(hoveredButton === "cancel" ? styles.actionButtonPinkHover : {}),
            }}
            onClick={onClose}
            onMouseEnter={() => setHoveredButton("cancel")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Stay in endless
          </button>
          <button
            type="button"
            style={{
              ...styles.actionButton,
              ...(hoveredButton === "confirm" ? styles.actionButtonRedHover : {}),
            }}
            onClick={onConfirm}
            onMouseEnter={() => setHoveredButton("confirm")}
            onMouseLeave={() => setHoveredButton(null)}
          >
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
    margin: "0 0 24px 0",
    fontSize: "18px",
    lineHeight: 1.55,
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  actionButton: {
    padding: "12px 18px",
    borderRadius: "4px",
    border: `1px solid ${Colors.black}`,
    background: Colors.black,
    color: Colors.white,
    fontSize: "17px",
    fontWeight: 600,
    cursor: "pointer",
    transition:
      "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
  },
  actionButtonPinkHover: {
    color: Colors.black,
    transform: "translate(-2px, -2px)",
    background: Colors.lightPink,
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
  actionButtonRedHover: {
    color: Colors.white,
    transform: "translate(-2px, -2px)",
    background: "#ef4444",
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
};
