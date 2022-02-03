import ReactDOM from "react-dom";

import React, { useRef, useState } from "react";

import { useEmulator } from "./emulator95/useEmulator";

export function Emulator() {
  const screenContainerRef = useRef<HTMLDivElement>();
  const [output, setOutput] = useState("");

  const { state, api } = useEmulator(screenContainerRef.current, {
    onReady() {
      api.addChildWindow({
        id: 5,
        type: "Button",
        text: "Button 1",
        x: 10,
        y: 10,
        w: 70,
        h: 20,
        eventId: 5,
      });
      api.addChildWindow({
        id: 6,
        type: "Button",
        text: "Button 2",
        x: 10,
        y: 40,
        w: 70,
        h: 20,
        eventId: 6,
      });
      api.addChildWindow({
        id: 7,
        type: "Button",
        text: "Button 3",
        x: 10,
        y: 70,
        w: 70,
        h: 20,
        eventId: 7,
      });
      api.addChildWindow({
        id: 8,
        type: "Static",
        text: "Write below",
        x: 10,
        y: 100,
        w: 200,
        h: 200,
        eventId: 8,
      });
    },
    onEvent(str) {
      const num = Number(str);
      if (!isNaN(num)) {
        setOutput(`Button ${num - 5} pressed`);
      }
    },
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = screenContainerRef.current.getBoundingClientRect();
    api.setMousePos(e.clientX - rect.x, e.clientY - rect.y);
  }

  return (
    <>
      <button onClick={() => state.v86Emulator.run()}>start</button>
      <button onClick={() => state.v86Emulator.restart()}>restart</button>

      <div
        ref={screenContainerRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseMove={handleMouseMove}
        onMouseDown={(e) => api.sendMouseEvent(true, e.button as 0 | 2)}
        onMouseUp={(e) => api.sendMouseEvent(false, e.button as 0 | 2)}
      >
        <div
          style={{
            whiteSpace: "pre",
            font: "14px monospace",
            lineHeight: "14px",
          }}
        />
        <canvas style={{ display: "none" }} />
      </div>

      <div>{output}</div>
      <input
        type="text"
        onChange={(e) => api.setWindowText(8, e.target.value)}
      />
    </>
  );
}

ReactDOM.render(<Emulator />, document.getElementById("root"));
