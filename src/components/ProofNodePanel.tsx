/**
 * Left side panel of our program. Handles displaying our proof nodes.
 * @file GivenPanel.tsx
 */

import type { ProofNode } from "../logic/ProofNode";
import type { CSSProperties } from "react";
import { Colors } from "../constants/theme";


/**
 * UI element of the left panel
 */
export default function ProofNodePanel({
  givenArray,
  solutionNode,
  toggleSelected,
}: {
  givenArray: ProofNode[];
  solutionNode: ProofNode;
  toggleSelected: (id: string) => void;
}) {
  



  return (
    <div style={{ ...styles.container, ...styles.givenPanel }}>
      <div style={styles.topSlotsMain}>
        {(givenArray ?? []).filter((node) => node.isStarter === true && node.context === false).map((node) => (
          <button
            key={node.id}
            onClick={() => toggleSelected(node.id)}
            style={{
              ...styles.givenButtonBase,
              ...(node.selected ? styles.givenButtonBaseSelected : {}),
            }}
          >
            {node.text}
          </button>
        ))}
      </div>

      <div style={styles.main}>
        <div style={styles.topSlotsMain}>
          {(givenArray ?? []).filter((node) => node.isStarter !== true).map((node) => (
            <button
              key={node.id}
              onClick={() => toggleSelected(node.id)}
              style={{
                ...styles.givenButtonBase,
                ...(node.selected ? styles.givenButtonBaseSelected : {}),
              }}
            >
              {node.text}
            </button>
          ))}
        </div>
        <button
          key={solutionNode.id}
          disabled
          style={{ ...styles.givenButtonBase, ...styles.solutionButton }}
        >
          {solutionNode.text}
        </button>
      </div>
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
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  givenPanel: {},
  topSlotsMain: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  givenButtonBase: {
    padding: "10px 16px",
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: Colors.darkPink,
  },
  givenButtonBaseSelected: {
    backgroundColor: Colors.gray,
  },
  solutionButton: {
    cursor: "default",
    backgroundColor: Colors.lightPink,
    color: "black",
  },
  main: {
    flex: 1,
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "12px",
  },
};