import GivenPanel from "./components/left_panel/GivenPanel";
import RulePanel from "./components/right_panel/RulePanel";
import { useProofState } from "./logic/useProofState";

export default function App() {
  const { givens, rules, toggleSelected } = useProofState();

  return (
    <div style={styles.split}>
      <GivenPanel givenArray={givens} toggleSelected={toggleSelected} />
      <RulePanel rules={rules} />
    </div>
  );
}

const styles = {
  split: {
    display: "flex",
    height: "100vh",
    gap: "5px",
  } satisfies React.CSSProperties,
};
