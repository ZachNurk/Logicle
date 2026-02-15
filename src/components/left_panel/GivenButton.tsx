type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function GivenButton({ onClick }: ButtonProps) {
  return (
    <button style={styles.resetButton} onClick={onClick}>
      Update Givens
    </button>
  );
}

const styles = {
  resetButton: {
    backgroundColor: "#07b9ff",
    padding: "10px 16px",
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px",
  } satisfies React.CSSProperties,
};
