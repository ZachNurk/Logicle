/**
 * The Right side of our program. Panel handles the Axiom selection and submitting axioms
 * @file RulePanel.tsx
 */

import type { Axiom } from "../../logic/Axiom";
import "./RulePanel.css";

type RulePanelProps = {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  onApply?: () => void;
  selectedSide: "left" | "right";
  onSelectSide: (side: "left" | "right") => void;
};

export default function RulePanel({
  axioms,
  toggleSelected,
  onApply,
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
              // TODO make it so we have a pop up to specify left or right or to make result AND or OR. SPLIT
              // constructive dilemma into 2 functions.
              onClick={axiom.applyType === "6" || axiom.applyType === "7" ?  undefined : () => toggleSelected(axiom.id)}
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
            onClick={() => onSelectSide("left")}
          >
            Left
          </button>
          <button
            type="button"
            className={`axiom-button ${selectedSide === "right" ? "button-active" : ""}`}
            onClick={() => onSelectSide("right")}
          >
            Right
          </button>
        </div>
      )}

      {onApply && (
        <button type="button" className="button apply-button" onClick={onApply}>
          Apply selected
        </button>
      )}
    </div>
  );
}
