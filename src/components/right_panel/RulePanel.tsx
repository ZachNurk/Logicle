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
          <button
            key={axiom.id}
            type="button"
            className={`axiom-button ${axiom.selected ? "button-active" : ""}`}
            onClick={() => toggleSelected(axiom.id)}
            title={axiom.description}
          >
            <span className="axiom-label">{axiom.text}</span>
            <span
              className="info-dot"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="presentation"
              aria-hidden
            >
              i
            </span>
          </button>
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
