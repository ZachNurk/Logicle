/**
 * The Right side of our program. Panel handles the Axiom selection and submitting axioms
 * @file RulePanel.tsx
 */

import type { Axiom } from "../../logic/Axiom";

type RulePanelProps = {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  onApply?: () => void;
};


//TODO make the panel smaller so its coser to the Left panel

/**
 * UI element for the right side
 */
export default function RulePanel({ axioms, toggleSelected, onApply }: RulePanelProps) {
  return (
    <div style={styles.container}>
      {axioms.map((axiom) => (
        <div key={axiom.id} style={styles.axiomRow}>
        <button
          onClick={() => toggleSelected(axiom.id)}
          style={{
            ...styles.axiomButtonBase,
            backgroundColor: axiom.selected ? "#ff4107" : "#07b9ff",
          }}
        >
          {axiom.text}
        </button>
        <div style={styles.axiomDescription}>{axiom.description}</div>
        </div>
      ))}
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

  axiomRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  } satisfies React.CSSProperties,

  axiomDescription: {
    flex: 1,
    fontSize: 13,
    color: "#333",
    lineHeight: 1.2,
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

  axiomButtonBase: {
    padding: "10px 16px",
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
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
