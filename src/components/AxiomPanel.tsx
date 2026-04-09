/**
 * The right side panel of our program. Handles axiom selection and application.
 * @file RulePanel.tsx
 */

import type { Axiom } from "../logic/Axiom";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Colors } from "../constants/theme";

type AxiomPanelProps = {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  applyAxiom: (
    axiom: Axiom,
    sideOverride?: "left" | "right",
    additionText?: string,
  ) => void;
  selectedSide: "" | "left" | "right";
  onSelectSide: (side: "left" | "right") => void;
  deleteSelectedNode: () => void;
  resetNodes: () => void;
  invalidAxiomIds: string[];
};

export default function AxiomPanel({
  axioms,
  toggleSelected,
  applyAxiom,
  selectedSide,
  onSelectSide,
  deleteSelectedNode,
  resetNodes,
  invalidAxiomIds,
}: AxiomPanelProps) {
  const [hoveredAxiomId, setHoveredAxiomId] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [resetHovered, setResetHovered] = useState(false);
  const [additionLetter, setAdditionLetter] = useState("A");
  const [isChoosingAddition, setIsChoosingAddition] = useState(true);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const selectedAxiom = axioms.find((a) => a.selected);
  const additionSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (!selectedAxiom || selectedAxiom.id !== "Add" || !isChoosingAddition) return;
    const id = window.requestAnimationFrame(() => {
      additionSelectRef.current?.focus();
    });
    // if component re-renders before we get the focus on the scrollable, cancel
    return () => window.cancelAnimationFrame(id);
  }, [selectedAxiom, isChoosingAddition]);

  return (
    <div style={{ ...styles.rulePanelContainer, ...styles.container }}>
      <div style={styles.gridContainer}>
        {axioms.map((axiom) => {
          const isInvalid = invalidAxiomIds.includes(axiom.id);
          const showSidePicker = axiom.selected && axiom.applyType === "2";
          const showAddMenu = axiom.selected && axiom.id === "Add";
          return (
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
                  ...(!isInvalid &&
                  (hoveredButton === axiom.id || hoveredAxiomId === axiom.id)
                    ? {
                        ...styles.axiomButtonHover,
                        ...styles.axiomButtonRaised,
                      }
                    : {}),
                  ...(axiom.selected ? styles.axiomButtonActive : {}),
                  ...(isInvalid ? styles.axiomButtonInvalid : {}),
                }}
                onClick={
                  axiom.applyType === "2"
                    ? () => toggleSelected(axiom.id)
                    : axiom.id === "Add"
                      ? () => {
                          setIsChoosingAddition(true);
                          toggleSelected(axiom.id);
                        }
                      : () => {
                          toggleSelected(axiom.id);
                          applyAxiom(axiom);
                        }
                }
                onMouseEnter={() => {
                  if (!isInvalid) setHoveredButton(axiom.id);
                }}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span style={styles.axiomLabel}>{axiom.text}</span>
                <span
                  style={styles.infoDotWrapper}
                  role="presentation"
                  aria-hidden
                  onMouseEnter={() => {
                    if (!isInvalid) setHoveredAxiomId(axiom.id);
                  }}
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
              {showSidePicker && (
                <div
                  style={styles.sidePickerOverlay}
                  onClick={() => toggleSelected(axiom.id)}
                >
                  <button
                    type="button"
                    style={{
                      ...styles.sidePickerButton,
                      ...(selectedSide === "left"
                        ? styles.axiomButtonActive
                        : {}),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSide("left");
                      applyAxiom(axiom, "left");
                    }}
                  >
                    Left
                  </button>
                  <button
                    type="button"
                    style={{
                      ...styles.sidePickerButton,
                      ...(selectedSide === "right"
                        ? styles.axiomButtonActive
                        : {}),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSide("right");
                      applyAxiom(axiom, "right");
                    }}
                  >
                    Right
                  </button>
                </div>
              )}
              {showAddMenu && (
                <div
                  style={styles.sidePickerOverlay}
                  onClick={() => {
                    setIsChoosingAddition(true);
                    toggleSelected(axiom.id);
                  }}
                >
                  <form
                    style={styles.additionForm}
                    onClick={(e) => e.stopPropagation()}
                    onSubmit={(e) => {
                      e.preventDefault();
                      applyAxiom(axiom, undefined, additionLetter);
                    }}
                  >
                    <label style={styles.additionLabel}>Add letter:</label>
                    {isChoosingAddition ? (
                      <select
                        ref={additionSelectRef}
                        value={additionLetter}
                        onChange={(e) => {
                          setAdditionLetter(e.target.value);
                          setIsChoosingAddition(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setIsChoosingAddition(false);
                        
                          }
                        }}
                        style={styles.additionSelect}
                        size={5}
                      >
                        {alphabet.map((letter) => (
                          <option key={letter} value={letter}>
                            {letter}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <button
                        type="button"
                        style={styles.sidePickerButton}
                        onClick={() => setIsChoosingAddition(true)}
                      >
                        {additionLetter}
                      </button>
                    )}
                    <button type="submit" style={styles.sidePickerButton}>
                      Apply
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        style={{
          ...styles.deleteButton,
          ...(deleteHovered ? styles.axiomButtonHover : {}),
        }}
        onClick={deleteSelectedNode}
        onMouseEnter={() => setDeleteHovered(true)}
        onMouseLeave={() => setDeleteHovered(false)}
      >
        Delete Selected Node
      </button>
      <button
        style={{
          ...styles.deleteButton,
          ...(resetHovered ? styles.axiomButtonHover : {}),
        }}
        onClick={resetNodes}
        onMouseEnter={() => setResetHovered(true)}
        onMouseLeave={() => setResetHovered(false)}
      >
        Reset
      </button>
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
    height: "100%",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gridAutoRows: "1fr",
    gap: "10px",
    padding: "0",
    flex: 1,
    minHeight: 0,
  },
  axiomCell: {
    position: "relative",
    minHeight: 0,
    display: "flex",
  },
  axiomButton: {
    position: "relative",
    flex: 1,
    minHeight: "48px",
    width: "100%",
    fontSize: "15px",
    color: Colors.white,
    cursor: "pointer",
    border: `1px solid ${Colors.black}`,
    borderRadius: "4px",
    padding: "0.8em 2em",
    paddingRight: "2.5em",
    background: Colors.black,
    transition:
      "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
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
  axiomButtonInvalid: {
    background: "#ef4444",
    color: Colors.white,
    animation: "horizontal-shaking 0.5s linear",
    pointerEvents: "none",
    cursor: "default",
  },
  axiomLabel: {
    display: "block",
    lineHeight: 1.35,
  },
  infoDotWrapper: {
    position: "absolute",
    top: "50%",
    right: "6px",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    /** Tooltip is absolutely positioned; keeps layout sized to the dot */
    width: "24px",
    height: "24px",
  },
  infoDot: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: Colors.white,
    color: Colors.black,
    fontSize: "13px",
    fontStyle: "italic",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
  },
  infoTooltip: {
    position: "absolute",
    left: "50%",
    bottom: "calc(100% + 8px)",
    transform: "translateX(-50%)",
    padding: "12px 16px",
    background: Colors.darkPink,
    color: Colors.black,
    fontSize: "15px",
    fontWeight: "bold",
    lineHeight: 1.45,
    fontStyle: "normal",
    whiteSpace: "normal",
    width: "max-content",
    maxWidth: "min(420px, 92vw)",
    borderRadius: "8px",
    border: `2px solid ${Colors.white}`,
    zIndex: 1000,
    pointerEvents: "none",
    boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
  sideSelector: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sideLabel: {
    fontWeight: 600,
  },
  sidePickerOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    gap: "8px",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "4px",
    zIndex: 30,
  },
  sidePickerButton: {
    minWidth: "72px",
    padding: "8px 10px",
    fontSize: "15px",
    border: `1px solid ${Colors.black}`,
    borderRadius: "4px",
    background: Colors.white,
    cursor: "pointer",
  },
  additionForm: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  additionLabel: {
    fontSize: "12px",
    color: Colors.black,
    fontWeight: 600,
  },
  additionSelect: {
    minWidth: "70px",
    padding: "6px 8px",
    border: `1px solid ${Colors.black}`,
    borderRadius: "4px",
    background: Colors.white,
    color: Colors.black,
  },
  deleteButton: {
    width: "100%",
    marginTop: "12px",
    minHeight: "44px",
    color: Colors.white,
    cursor: "pointer",
    border: `1px solid ${Colors.black}`,
    borderRadius: "4px",
    padding: "0.8em 2em",
    background: Colors.black,
    transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s, color 0.2s",
    textAlign: "center",
  },
  axiomButtonHover: {
    color: Colors.black,
    transform: "translate(-2px, -2px)",
    background: Colors.lightPink,
    boxShadow: `0.25rem 0.25rem ${Colors.black}`,
  },
};
