import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";

import { Win95, Win95Ref } from "./reconciler/Win95";
import { WS_VISIBLE, WS_CHILD, WS_EX_CLIENTEDGE } from "./emulator95/constants";
import { Button } from "./components/Button";

export function Emulator() {
  const emulatorRef = useRef<Win95Ref>(null);
  (window as any).emulatorRef = emulatorRef;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function saveState() {
    emulatorRef.current.state.v86Emulator.save_state((error, state) => {
      const blob = new Blob([state]);

      const a = document.createElement("a");
      a["download"] = "state.bin";
      a.href = window.URL.createObjectURL(blob);
      a.dataset["downloadurl"] = [
        "application/octet-stream",
        a["download"],
        a.href,
      ].join(":");

      a.click();
      window.URL.revokeObjectURL(a.href);
    });
  }

  return (
    <>
      <button onClick={() => emulatorRef.current.state.v86Emulator.run()}>
        start
      </button>
      <button onClick={() => emulatorRef.current.state.v86Emulator.restart()}>
        restart
      </button>
      <button onClick={saveState}>save</button>

      <Win95 ref={emulatorRef}>
        <Button
          onClick={() => setOutput(`Button 1 pressed`)}
          x={10}
          y={10}
          w={70}
          h={20}
        >
          Test 1
        </Button>
        <Button
          onClick={() => setOutput(`Button 2 pressed`)}
          x={10}
          y={40}
          w={70}
          h={20}
        >
          Test 2
        </Button>
        <Button
          onClick={() => setOutput(`Button 3 pressed`)}
          x={10}
          y={70}
          w={70}
          h={20}
        >
          Test 3
        </Button>

        <w95Window
          type="Static"
          params={WS_VISIBLE | WS_CHILD}
          x={10}
          y={100}
          w={70}
          h={20}
        >
          Test text
        </w95Window>

        <w95Window
          type="Edit"
          params={WS_VISIBLE | WS_CHILD}
          extStyle={WS_EX_CLIENTEDGE}
          x={10}
          y={140}
          w={100}
          h={20}
        >
          Test text
        </w95Window>
      </Win95>

      <div>{output}</div>
      <input
        type="text"
        // onChange={(e) =>
        //   emulatorRef.current.api.setWindowText(8, e.target.value)
        // }
      />
    </>
  );
}

ReactDOM.render(<Emulator />, document.getElementById("root"));
