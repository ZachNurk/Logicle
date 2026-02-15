import type { ProofNode } from "../../logic/ProofNode";

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  Node: ProofNode;
};

export default function GivenButton({ onClick, Node }: ButtonProps) {
  if (Node.selected) {
    return (
      <button style={styles.GivenButtonSelect} onClick={onClick}>
        {Node.text}
      </button>
    );
  }

  return (
    <button style={styles.GivenButton} onClick={onClick}>
      {Node.text}
    </button>
  );
}


const baseButton = {
  padding: "10px 16px",
  fontSize: "14px",
  width: "140px",
  height: "44px",
  borderRadius: "5px",
}

const styles = {
  GivenButton: {
    backgroundColor: "#07b9ff",
    ...baseButton
  } satisfies React.CSSProperties,
  GivenButtonSelect: {
    backgroundColor: "#ff4107",
    ...baseButton
  } satisfies React.CSSProperties
};
