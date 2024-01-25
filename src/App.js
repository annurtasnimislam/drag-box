import { useState } from "react";
import "./App.css";
import DragBox from "./components/DragBox";

export default function App() {
  const [selectedOption, setSelectedOption] = useState("top");

  return (
    <div className="app">
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value={"left"}>left</option>
        <option value={"right"}>right</option>
        <option value={"top"}>top</option>
        <option value={"bottom"}>bottom</option>
      </select>

      <DragBox toolTipPos={selectedOption} />
    </div>
  );
}
