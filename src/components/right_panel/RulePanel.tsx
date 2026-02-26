/**
 * The Right side of our program. Panel handles the Axiom selection and submitting axioms
 * @file RulePanel.tsx
 */

import type { Axiom } from "../../logic/Axiom";
import { useState } from "react";

const AXIOM_BUTTON_Z = 900;
const INFO_TOOLTIP_Z = AXIOM_BUTTON_Z + 1;
const TOOLTIP_Z = INFO_TOOLTIP_Z + 1;
const AXIOM_ROW_GAP_PX = 10;
const AXIOM_COLUMN_GAP_PX = 1;


type RulePanelProps = {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  onApply?: () => void;
};

//TODO make the panel smaller so its coser to the Left panel

/**
 * UI element for the right side
 */
export default function RulePanel({
  axioms,
  toggleSelected,
  onApply,
}: RulePanelProps) {
  // hook tracks the currently hovered axiom
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={styles.container}>
      <div style={styles.axiomGrid}>
        {axioms.map((axiom) => (
            <div key={axiom.id} style={styles.axiomButton}>
              <button
                onClick={() => toggleSelected(axiom.id)}
                title={axiom.description}
                style={{
                  ...styles.axiomButtonBase,
                  backgroundColor: axiom.selected ? "#ff4107" : "#07b9ff",
                }}
              >
                {axiom.text}
              </button>

              <button
                type="button"
                style={styles.infoButton}
                // prevent clicking info from toggling selection (optional but usually desired)
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setHoveredId(axiom.id)}
                onMouseLeave={() => setHoveredId((current) => (current === axiom.id ? null : current))}
              >
                i
              </button>
            {hoveredId === axiom.id && (
              <div style={styles.tooltip}>
                {axiom.description}
              </div>
            )}
            </div>
        ))}
      </div>
      {onApply && (
        <button onClick={onApply} style={styles.applyButton}>
          Apply selected
        </button>
      )}
      <div style={styles.main}>
        <h1>Right side content...</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    border: "5px solid #ccc",
    borderRadius: "20px",
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12, // space between children
  } satisfies React.CSSProperties,

  axiomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: `${AXIOM_ROW_GAP_PX}px ${AXIOM_COLUMN_GAP_PX}px`,
  } satisfies React.CSSProperties,

  axiomButton: {
    position: "relative" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  } satisfies React.CSSProperties,

  axiomButtonBase: {
    padding: "10px 16px", // Makes sure text doesnt sit under info icon
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    textAlign: "left"
  } satisfies React.CSSProperties,


  infoButton: {
    display: "inline-block",
    marginLeft: -30,
    zIndex: INFO_TOOLTIP_Z,

  } satisfies React.CSSProperties,

  tooltip: {
    position: "absolute" as const,
    top: 0,
    left: "100%",
    marginLeft: 8,
    zIndex: TOOLTIP_Z,
    background: "black",
    color: "white",
    padding: "5px",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  } satisfies React.CSSProperties,

  slot: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 12,
    background: "white",
  } satisfies React.CSSProperties,

  main: {
    flex: 1,
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 12,
  } satisfies React.CSSProperties,

 
  applyButton: {
    padding: "10px 20px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#07b9ff",
  } satisfies React.CSSProperties,
};
