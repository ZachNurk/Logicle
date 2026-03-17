/**
 * The right side panel of our program. Handles axiom selection and application.
 * @file RulePanel.tsx
 */

import type { Axiom } from "../logic/Axiom";
import type { CSSProperties } from "react";
import { useState } from "react";
import { Colors } from "../constants/theme";

type AxiomPanelProps = {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  applyAxiom: (axiom: Axiom, sideOverride?: "left" | "right") => void;
  selectedSide: "" | "left" | "right";
  onSelectSide: (side: "left" | "right") => void;
};

export default function AxiomPanel({
  axioms,
  toggleSelected,
  applyAxiom,
  selectedSide,
  onSelectSide,
}: AxiomPanelProps) {
  const [hoveredAxiomId, setHoveredAxiomId] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const selectedAxiom = axioms.find((a) => a.selected);


  return (
    <div style={{ ...styles.rulePanelContainer, ...styles.container }}>
      <div style={styles.gridContainer}>
        {axioms.map((axiom) => (
          <div
            key={axiom.id}
            style={{
              ...styles.axiomCell,
            }}
          >
            <button
              type="button"
              style={{
                ...styles.axiomButton,
                // raises tooltip and hover anim
                ...(hoveredButton === axiom.id || hoveredAxiomId === axiom.id
                  ? { ...styles.axiomButtonHover, ...styles.axiomButtonRaised }
                  : {}),
                ...(axiom.selected ? styles.axiomButtonActive : {}),
                ...(axiom.selected ? styles.axiomButtonActive : {}),
              }}
              onClick={
                axiom.applyType === "6" || axiom.applyType === "7"
                  ? undefined
                  : axiom.applyType === "2"
                    ? () => toggleSelected(axiom.id)
                    : () => applyAxiom(axiom)
              }
              onMouseEnter={() => setHoveredButton(axiom.id)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <span style={styles.axiomLabel}>{axiom.text}</span>
              <span
                style={styles.infoDotWrapper}
                role="presentation"
                aria-hidden
                onMouseEnter={() => setHoveredAxiomId(axiom.id)}
                onMouseLeave={() => setHoveredAxiomId(null)}
              >
                <span style={styles.infoDot}>i</span>
                <span
                  style={{
                    ...styles.infoTooltip,
                    display: hoveredAxiomId === axiom.id ? "block" : "none",
                  }}
                >
                  {axiom.description}
                  {axiom.description2 ? (
                    <>
                      <br />
                      {axiom.description2}
                    </>
                  ) : null}
                </span>
              </span>
            </button>
          </div>
        ))}
      </div>

      {selectedAxiom?.applyType === "2" && (
        <div style={styles.sideSelector}>
          <span style={styles.sideLabel}>Choose side:</span>
          <button
            type="button"
            style={{
              ...styles.axiomButton,
              ...(selectedSide === "left" ? styles.axiomButtonActive : {}),
            }}
            onClick={() => {
              onSelectSide("left");
              applyAxiom(selectedAxiom, "left");
            }}
          >
            Left
          </button>
          <button
            type="button"
            style={{
              ...styles.axiomButton,
              ...(selectedSide === "right" ? styles.axiomButtonActive : {}),
            }}
            onClick={() => {
              onSelectSide("right");
              applyAxiom(selectedAxiom, "right");
            }}
          >
            Right
          </button>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    border: `4px solid ${Colors.black}`,
    borderRadius: "20px",
    padding: "16px",
  },
  rulePanelContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "stretch",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gridAutoRows: "minmax(52px, 1fr)",
    gap: "10px",
    padding: "0",
  },
  axiomCell: {
    position: "relative",
    minHeight: 0,
    display: "flex",
  },
  axiomButton: {
    position: "relative",
    flex: 1,
    minHeight: "44px",
    width: "100%",
    color: Colors.white,
    cursor: "pointer",
    border: `1px solid ${Colors.black}`,
    borderRadius: "4px",
    padding: "0.8em 2em",
    paddingRight: "2.5em",
    background: Colors.black,
    transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
    textAlign: "center",
  },
  axiomButtonRaised: {
    zIndex: 21,
  },
  axiomButtonActive: {
    color: Colors.black,
    background: Colors.white,
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
  axiomLabel: {
    display: "block",
  },
  infoDotWrapper: {
    position: "absolute",
    top: "50%",
    right: "6px",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoDot: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: Colors.white,
    color: Colors.black,
    fontSize: "12px",
    fontStyle: "italic",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
  },
  infoTooltip: {
    position: "absolute",
    left: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    marginLeft: "8px",
    padding: "6px 10px",
    background: Colors.darkPink,
    color: Colors.white,
    fontSize: "12px",
    fontStyle: "normal",
    whiteSpace: "nowrap",
    maxWidth: "320px",
    borderRadius: "4px",
    zIndex: 1000,
    pointerEvents: "none",
  },
  sideSelector: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sideLabel: {
    fontWeight: 600,
  },
  axiomButtonHover: {
    color: Colors.black,
    transform: "translate(-2px, -2px)",
    background: Colors.lightPink,
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
};
