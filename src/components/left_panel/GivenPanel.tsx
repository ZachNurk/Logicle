import type { ProofNode } from "../../logic/ProofNode";
import GivenButton from "./GivenButton";

type Props = {
  givenArray: ProofNode[];
  toggleSelected: (id: string) => void;
};

export default function GivenPanel({ givenArray, toggleSelected }: Props) {
  return (
    <div style={styles.container}>
      <div style={styles.topSlots.main}>
        {givenArray.map((node: ProofNode) => (
          <GivenButton onClick={() => toggleSelected(node.id)} Node={node} key={node.id} />
        ))}
      </div>
      <div style={styles.main}>
        <h1>Left content goes here...</h1>
      </div>
    </div>
  );
}

//<div key={label.id} style={styles.topSlots.slot}>
//            {label.text}
//          </div>

const styles = {
  resetButton: {
    backgroundColor: "#07b9ff",
    padding: "10px 16px" /* height-ish, width-ish */,
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px",
  } satisfies React.CSSProperties,

  container: {
    flex: 1, // take up an equal share of the avail space
    border: "5px solid #ccc",
    borderRadius: "20px",
    padding: 16,
    display: "flex", // make MY children flexbox
    flexDirection: "column",
    gap: 12,
  } satisfies React.CSSProperties,

  topSlots: {
    main: {
      display: "flex",
      gap: 10,
    } satisfies React.CSSProperties,
    slot: {
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: "8px 10px",
      fontSize: 12,
      background: "white",
      flex: "1 1 140px",
    } satisfies React.CSSProperties,
  },

  main: {
    flex: 1, // take up equal share of avail space
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 12,
  } satisfies React.CSSProperties,
};
