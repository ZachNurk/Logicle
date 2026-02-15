
const Button = ({ onClick }: {onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) => {
    return (
        <button style={styles.resetButton} onClick={onClick}>Update Givens</button>
    )
}


export default Button;



const styles = {
    resetButton: {
    backgroundColor: "#07b9ff",
    padding: "10px 16px" /* height-ish, width-ish */,
    fontSize: "14px",
    width: "140px",
    height: "44px",
    borderRadius: "5px"
  } satisfies React.CSSProperties,
}
 