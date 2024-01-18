import { useState } from "react";
import "./App.css";

export default function App() {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  let startDragPosition = { x: 0, y: 0 };
  const handleMouseDown = (e) => {
    e.preventDefault();

    startDragPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (e) => {
    const newX =
      e.clientX - (startDragPosition.x === 0 ? e.clientX : startDragPosition.x);
    const newY =
      e.clientY - (startDragPosition.y === 0 ? e.clientY : startDragPosition.y);

    const parentRect = document
      .getElementById("container")
      ?.getBoundingClientRect();
    const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.width - 100;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setDragOffset({ x: boundedX, y: boundedY });
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className="wrapper">
      <div id="container" className="holder">
        <div
          className="box"
          style={{
            top: `${dragOffset.y}px`,
            left: `${dragOffset.x}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          Drag the <br /> box
        </div>
      </div>
    </div>
  );
}
