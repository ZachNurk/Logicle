/**
 * Left side panel of our program. Handles displaying our nodes
 * @file GivenPanel.tsx
 */

import type { ProofNode } from "../../logic/ProofNode";
import "./GivenPanel.css";

/**
 * UI element of the left panel
 */
export default function GivenPanel({
  givenArray,
  solutionNode,
  toggleSelected,
}: {
  givenArray: ProofNode[];
  solutionNode: ProofNode;
  toggleSelected: (id: string) => void;
}) {
  return (
    <div className="container">
      <div className="top-slots-main">
        {(givenArray ?? []).filter((node) => node.isStarter === true && node.context === false).map((node) => (
          <button
            key={node.id}
            onClick={() => toggleSelected(node.id)}
            className={`given-button-base ${node.selected ? "given-button-base--selected" : ""}`}
          >
            {node.text}
          </button>
        ))}
      </div>

      <div className="main">
        <div className="top-slots-main">
          {(givenArray ?? []).filter((node) => node.isStarter !== true).map((node) => (
            <button
              key={node.id}
              onClick={() => toggleSelected(node.id)}
              className={`given-button-base ${node.selected ? "given-button-base--selected" : ""}`}
            >
              {node.text}
            </button>
          ))}
        </div>
        <button
          key={solutionNode.id}
          disabled
          className="given-button-base solution-button"
        >
          {solutionNode.text}
        </button>
      </div>
    </div>
  );
}
