import React, { useState } from "react";
import Tooltip from "./components/Tooltip";

const MyComponent = () => {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [absoluteBoxPosition, setAbsoluteBoxPosition] = useState({
    parentContainer: { x: 0, y: 0 },
    x: 0,
    y: 0,
  });
  const [containerPosition, setContainerPosition] = useState({
    x: 610,
    y: 150,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("top");

  const handleBoxMouseOver = () => {
    const parentRect = document
      .getElementById("customContainer")
      ?.getBoundingClientRect();
    const boxRect = document
      .getElementById("customBox")
      ?.getBoundingClientRect();
    setAbsoluteBoxPosition({
      parentContainer: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: boxRect?.y || 0,
      x: boxRect?.x || 0,
    });
    setIsHovered(true);
  };

  const handleBoxMouseOut = () => {
    setIsHovered(false);
  };

  let startBoxPosition = { x: 0, y: 0 };
  const handleBoxMouseDown = (e) => {
    e.preventDefault();

    startBoxPosition = {
      x: e.clientX - boxPosition.x,
      y: e.clientY - boxPosition.y,
    };
    setIsDragging(true);

    const parentRect = document
      .getElementById("customContainer")
      ?.getBoundingClientRect();
    const boxRect = document
      .getElementById("customBox")
      ?.getBoundingClientRect();
    setAbsoluteBoxPosition({
      parentContainer: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: boxRect?.y || 0,
      x: boxRect?.x || 0,
    });

    document.addEventListener("mousemove", handleBoxMouseMove);
    document.addEventListener("mouseup", handleBoxMouseUp);
  };

  const handleBoxMouseMove = (e) => {
    const newX =
      e.clientX - (startBoxPosition.x === 0 ? e.clientX : startBoxPosition.x);
    const newY =
      e.clientY - (startBoxPosition.y === 0 ? e.clientY : startBoxPosition.y);

    const parentRect = document
      .getElementById("customContainer")
      ?.getBoundingClientRect();

    const boxRect = document
      .getElementById("customBox")
      ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - 100;
    const maxY = parentRect?.height && parentRect.height - 100;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setBoxPosition({ x: boundedX, y: boundedY });
    setAbsoluteBoxPosition({
      parentContainer: { x: parentRect?.x || 0, y: parentRect?.y || 0 },
      y: boxRect?.y || 0,
      x: boxRect?.x || 0,
    });
  };

  const handleBoxMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleBoxMouseMove);
    document.removeEventListener("mouseup", handleBoxMouseUp);
  };

  const tooltipContent = "CustomToolTip";

  let startContainerPosition = { x: 610, y: 150 };
  const handleContainerMouseDown = (e) => {
    startContainerPosition = {
      x: e.clientX - containerPosition.x,
      y: e.clientY - containerPosition.y,
    };

    document.addEventListener("mousemove", handleContainerMouseMove);
    document.addEventListener("mouseup", handleContainerMouseUp);
  };

  const handleContainerMouseMove = (e) => {
    const newX =
      e.clientX -
      (startContainerPosition.x === 0 ? e.clientX : startContainerPosition.x);
    const newY =
      e.clientY -
      (startContainerPosition.y === 0 ? e.clientY : startContainerPosition.y);

    const parentRect = document
      .getElementById("main-container")
      ?.getBoundingClientRect();

    const maxX = parentRect?.width && parentRect.width - 400;
    const maxY = parentRect?.height && parentRect.height - 400;

    const boundedX = Math.min(Math.max(newX, 0), maxX ? maxX : 0);
    const boundedY = Math.min(Math.max(newY, 0), maxY ? maxY : 0);

    setContainerPosition({ x: boundedX, y: boundedY });
  };

  const handleContainerMouseUp = () => {
    document.removeEventListener("mousemove", handleContainerMouseMove);
    document.removeEventListener("mouseup", handleContainerMouseUp);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          marginBottom: 70,
          marginTop: 60,
          position: "fixed",
          top: 10,
          left: "45%",
        }}
      >
        <label style={{ marginRight: "10px" }}>Position: </label>
        <select
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        >
          <option value={""} disabled>
            Direction
          </option>
          <option value={"top"}>Top</option>
          <option value={"left"}>Left</option>
          <option value={"right"}>Right</option>
          <option value={"bottom"}>Bottom</option>
        </select>
      </div>
      <div
        id="main-container"
        style={{
          alignItems: "center",
          height: "99.5vh",
        }}
      >
        <div
          id="customContainer"
          style={{
            width: "400px",
            height: "400px",
            position: "relative",
            top: `${containerPosition.y}px`,
            left: `${containerPosition.x}px`,
            border: "1px solid #ccc",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "calc(100% - 31px)",
              width: 30,
              height: 30,
              border: "1px solid black",
              textAlign: "center",
              cursor: "grab",
            }}
            onMouseDown={handleContainerMouseDown}
          >
            *
          </div>

          <div
            id="resize-bottom"
            style={{
              width: 400,
              height: 5,
              cursor: "ns-resize",
              position: "absolute",
              top: "100%",
              left: 0,
            }}
          ></div>
          <div
            id="resize-top"
            style={{
              width: 400,
              height: 5,
              cursor: "ns-resize",
              position: "absolute",
              top: -2,
              left: 0,
            }}
          ></div>
          <div
            id="resize-left"
            style={{
              height: 400,
              width: 5,
              cursor: "ew-resize",
              position: "absolute",
              left: -1,
              top: 0,
            }}
          ></div>
          <div
            id="resize-right"
            style={{
              height: 400,
              width: 5,
              cursor: "ew-resize",
              position: "absolute",
              top: 0,
              left: "100%",
            }}
          ></div>

          <div
            id="resize-tl"
            style={{
              width: 5,
              height: 5,
              cursor: "nwse-resize",
              position: "absolute",
              top: -5,
              left: -5,
            }}
          ></div>
          <div
            id="resize-tr"
            style={{
              width: 5,
              height: 5,
              cursor: "nesw-resize",
              position: "absolute",
              top: -5,
              left: "100.5%",
            }}
          ></div>
          <div
            id="resize-bl"
            style={{
              width: 5,
              height: 5,
              cursor: "nesw-resize",
              position: "absolute",
              top: "100.5%",
              left: -5,
            }}
          ></div>
          <div
            id="resize-br"
            style={{
              width: 5,
              height: 5,
              cursor: "nwse-resize",
              position: "absolute",
              top: "100.5%",
              left: "100.5%",
            }}
          ></div>
          <div
            id="customBox"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#a52a2a",
              color: "white",
              position: "absolute",
              top: `${boxPosition.y}px`,
              left: `${boxPosition.x}px`,
              cursor: "move",
            }}
            onMouseDown={handleBoxMouseDown}
            onMouseOver={handleBoxMouseOver}
            onMouseOut={handleBoxMouseOut}
          >
            Move the box
          </div>
          {!isDragging && isHovered && (
            <Tooltip
              position={absoluteBoxPosition}
              direction={direction}
              content={tooltipContent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
