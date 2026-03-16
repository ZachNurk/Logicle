/**
 * The Right side of our program. Panel handles the Axiom selection and submitting axioms
 * @file RulePanel.tsx
 */

import type { Axiom } from "../../logic/Axiom";
import "./RulePanel.css";

type RulePanelProps = {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  applyAxiom: (axiom: Axiom, sideOverride?: "left" | "right") => void;
  selectedSide: "" | "left" | "right";
  onSelectSide: (side: "left" | "right") => void;
};

export default function RulePanel({
  axioms,
  toggleSelected,
  applyAxiom,
  selectedSide,
  onSelectSide,
}: RulePanelProps) {
  const selectedAxiom = axioms.find((a) => a.selected);


  return (
    <div className="rule-panel container">
      <div className="grid-container">
        {axioms.map((axiom) => (
          <div key={axiom.id} className="axiom-cell">
            <button
              type="button"
              className={`axiom-button ${axiom.selected ? "button-active" : ""}`}
              onClick={
                axiom.applyType === "6" || axiom.applyType === "7"
                  ? undefined
                  : axiom.applyType === "2"
                    ? () => toggleSelected(axiom.id)
                    : () => applyAxiom(axiom)
              }
            >
              <span className="axiom-label">{axiom.text}</span>
              <span
                className="info-dot-wrapper"
                role="presentation"
                aria-hidden
              >
                <span className="info-dot">i</span>
                <span className="info-tooltip">
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
        <div className="side-selector">
          <span className="side-label">Choose side:</span>
          <button
            type="button"
            className={`axiom-button ${selectedSide === "left" ? "button-active" : ""}`}
            onClick={() => {
              onSelectSide("left");
              applyAxiom(selectedAxiom, "left");
            }}
          >
            Left
          </button>
          <button
            type="button"
            className={`axiom-button ${selectedSide === "right" ? "button-active" : ""}`}
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
