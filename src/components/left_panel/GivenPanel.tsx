/**
 * Left side panel of our program. Handles displaying our nodes
 * @file GivenPanel.tsx
 */

import type { ProofNode } from "../../logic/ProofNode";

type Props = {
  givenArray: ProofNode[];
  toggleSelected: (id: string) => void;
};

/**
 * UI element of the left panel
 */
export default function GivenPanel({ givenArray, toggleSelected }: Props) {
  return (
    <div style={styles.container}>
      <div style={styles.topSlots.main}>
        {givenArray.map((node) => (
          <button
            key={node.id}
            onClick={() => toggleSelected(node.id)}
            style={{
              ...styles.givenButtonBase,
              backgroundColor: node.selected ? "#ff4107" : "#07b9ff",
            }}
          >
            {node.text}
          </button>
        ))}
      </div>

      <div style={styles.main}>
        <h1>Left content goes here...</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    border: "5px solid #ccc",
    borderRadius: "20px",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  } satisfies React.CSSProperties,

  topSlots: {
    main: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
    } satisfies React.CSSProperties,
  },

  givenButtonBase: {
    padding: "10px 16px",
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  } satisfies React.CSSProperties,

  main: {
    flex: 1,
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 12,
  } satisfies React.CSSProperties,
};