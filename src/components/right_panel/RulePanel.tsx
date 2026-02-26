/**
 * The Right side of our program. Panel handles the Axiom selection and submitting axioms
 * @file RulePanel.tsx
 */

import type { Axiom } from "../../logic/Axiom";
import { useState } from "react";
import "./RulePanel.css";

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
    <div className="container">
      <div className="axiom-grid">
        {axioms.map((axiom) => (
            <div key={axiom.id} className="axiom-button">
              <button
                onClick={() => toggleSelected(axiom.id)}
                title={axiom.description}
                className={`axiom-button-base ${axiom.selected ? "axiom-button-base--selected" : ""}`}
              >
                {axiom.text}
              </button>

              <div
                className="info-button-wrapper"
                
              >
                <button
                  type="button"
                  className="rule-panel-info-btn info-button"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setHoveredId(axiom.id)}
                  onMouseLeave={() => setHoveredId((current) => (current === axiom.id ? null : current))}
                >
                  i
                </button>
                {hoveredId === axiom.id && (
                  <div className="tooltip">
                    {axiom.description}
                  </div>
                )}
              </div>
            </div>
        ))}
      </div>
      {onApply && (
        <button onClick={onApply} className="apply-button">
          Apply selected
        </button>
      )}
    </div>
  );
}
