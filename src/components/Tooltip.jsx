const Tooltip = ({ pos, toolTipPos, containerRef }) => {
  let style = {
    position: "absolute",
    backgroundColor: "black",
    color: "orange",
    padding: "5px",
    borderRadius: "5px",
    width: "50px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  };

  switch (toolTipPos) {
    case "top":
      style = {
        ...style,
        top: `${pos.y - 40}px`,
        left: `${pos.x + 20}px`,
      };
      if (pos.y < 40) {
        style = {
          ...style,
          top: `${pos.y + 110}px`,
        };
      }
      break;

    case "bottom":
      style = {
        ...style,
        top: `${pos.y + 110}px`,
        left: `${pos.x + 20}px`,
      };
      if (
        containerRef.current &&
        pos.y > containerRef.current.offsetHeight - 145
      ) {
        style = {
          ...style,
          top: `${pos.y - 40}px`,
        };
      }
      break;

    case "left":
      style = {
        ...style,
        top: `${pos.y + 35}px`,
        left: `${pos.x - 70}px`,
      };
      if (containerRef.current && pos.x < 70) {
        style = {
          ...style,
          left: `${pos.x + 110}px`,
        };
      }
      break;

    case "right":
      style = {
        ...style,
        top: `${pos.y + 35}px`,
        left: `${pos.x + 110}px`,
      };
      if (
        containerRef.current &&
        pos.x > (containerRef.current.offsetWidth || 0) - 175
      ) {
        style = {
          ...style,
          left: `${pos.x - 70}px`,
        };
      }
      break;
  }

  return containerRef.current ? <div style={style}>Tooltip!</div> : null;
};

export default Tooltip;
