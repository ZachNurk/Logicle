
import { useState } from "react";

import GivenPanel from "./components/left_panel/GivenPanel";
import RulePanel from "./components/right_panel/RulePanel";




const App = () => {
  
   const [givens, setGivens] = useState<string[]>([]);

  const sampleGivens = ["Given1", "Given2", "Given3", "Given4"]; // TODO turn into objects that have fields: selected, rule, rule function???
  const rules = ["Rule1", "Rule2", "Rule3", "Rule4"];

  const updateGivens = () => {
    setGivens(sampleGivens);
  };

  return (
    <div style={styles.split}>
      <GivenPanel givenArray={givens}/>
      <RulePanel rules={rules} onUpdate={updateGivens}/>
    </div>
  );
};

const styles = {
  split: {
    display: "flex", // says to use flexbox for children, children defined by our HTML
    height: "100vh", // vh --> viewport height
    gap: "5px"
  } satisfies React.CSSProperties, // check that this works
};

export default App;
