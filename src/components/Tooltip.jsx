import React, { Component } from "react";
import ReactDOM from "react-dom";

class CustomTooltip extends Component {
  render() {
    const { position, content, direction } = this.props;

    let adjustedTop = 0;
    let adjustedLeft = 0;

    if (direction === "top") {
      adjustedTop =
        position.y - position?.parentContainer?.y <= 50
          ? position.y + 105
          : position.y - 40;
      adjustedLeft = position.x + 35;
    } else if (direction === "left") {
      adjustedLeft =
        position.x - position?.parentContainer?.x <= 45
          ? position.x + 105
          : position.x - 45;
      adjustedTop = position.y + 35;
    } else if (direction === "bottom") {
      adjustedTop =
        Math.abs(position.y - position?.parentContainer?.y - 300) <= 40
          ? position.y - 45
          : position.y + 105;
      adjustedLeft = position.x + 35;
    } else if (direction === "right") {
      adjustedTop = position.y + 35;
      adjustedLeft =
        Math.abs(position.x - position?.parentContainer?.x - 300) <= 45
          ? position.x - 45
          : position.x + 105;
    }

    const tooltipStyle = {
      position: "fixed",
      top: `${adjustedTop}px`,
      left: `${adjustedLeft}px`,
      border: "1px solid #ccc",
      padding: "5px",
      color: "#000",
      background: "#a52a2a",
      zIndex: 1000,
    };

    return ReactDOM.createPortal(
      <div style={tooltipStyle}>{content}</div>,
      document.body
    );
  }
}

export default CustomTooltip;
