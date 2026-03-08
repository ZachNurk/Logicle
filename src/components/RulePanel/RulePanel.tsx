/**
 * The Right side of our program. Panel handles the Axiom selection and submitting axioms
 * @file RulePanel.tsx
 */

import type { Axiom } from "../../logic/Axiom";
import "./RulePanel.css";

export default function RulePanel({
  axioms,
  toggleSelected,
  onApply,
}: {
  axioms: Axiom[];
  toggleSelected: (id: string) => void;
  onApply?: () => void;
}) {
  return (
    <div className="container">
      <div className="grid-container">
        {axioms.map((axiom) => (
          <div key={axiom.id} className="axiom-cell">
            <button
              type="button"
              className={`axiom-button ${axiom.selected ? "button-active" : ""}`}
              onClick={() => toggleSelected(axiom.id)}
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

      {onApply && (
        <button type="button" className="button apply-button" onClick={onApply}>
          Apply selected
        </button>
      )}
    </div>
  );
}
