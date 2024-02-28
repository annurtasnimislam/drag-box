import { useState } from "react";
import classes from "./App.module.css";
import DragBox from "./components/DragBox";

export default function App() {
  const [toolPos, setToolPos] = useState("top");
  console.log(toolPos);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        {/* <p>Position of Tooltip:</p>
        <select
          className={classes.option}
          value={toolPos}
          onChange={(e) => setToolPos(e.target.value)}
        >
          <option value={"left"}>Left</option>
          <option value={"right"}>Right</option>
          <option value={"top"}>Top</option>
          <option value={"bottom"}>Bottom</option>
        </select> */}
      </div>
      <DragBox toolTipPos={toolPos} />
    </div>
  );
}
