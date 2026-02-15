


type RightPanelProps = {
  rules: string[];
};

export default function RightPanel({ rules }: RightPanelProps) {
   return (
    <div style={styles.container}>
      {rules.map((label) => (
        <div key={label} style={styles.slot}>
          {label}
        </div>
      ))}
      <div style={styles.main}>
        <h1>Right side content...</h1>
      </div>
    </div>
  );
}

const styles = {
  

  container: {
    border: "5px solid #ccc",
    borderRadius: "20px",
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12, // space between children
  } satisfies React.CSSProperties,

  varsCol: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  } satisfies React.CSSProperties,

  slot: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 12,
    background: "white",
  } satisfies React.CSSProperties,

  main: {
    flex: 1,
    border: "1px solid #eee",
    borderRadius: 8,
    padding: 12,
  } satisfies React.CSSProperties,
};

