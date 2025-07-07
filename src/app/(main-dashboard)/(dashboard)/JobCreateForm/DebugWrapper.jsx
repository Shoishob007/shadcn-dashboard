import React from "react";

export function DebugWrapper({ children, label }) {
  const handleClick = (e) => {
    console.log(`${label} - Click event:`, {
      target: e.target,
      currentTarget: e.currentTarget,
      defaultPrevented: e.defaultPrevented,
      propagationStopped: e.isPropagationStopped?.(),
    });
  };

  const handleMouseDown = (e) => {
    console.log(`${label} - MouseDown event:`, {
      target: e.target,
      currentTarget: e.currentTarget,
    });
  };

  return (
    <div
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
}
