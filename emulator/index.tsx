import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";

import { Win95, Win95Ref } from "./reconciler/Win95";
import { WS_VISIBLE, WS_CHILD } from "./emulator95/constants";

export function Emulator() {
  const emulatorRef = useRef<Win95Ref>(null);
  (window as any).emulatorRef = emulatorRef;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <>
      <button onClick={() => emulatorRef.current.state.v86Emulator.run()}>
        start
      </button>
      <button onClick={() => emulatorRef.current.state.v86Emulator.restart()}>
        restart
      </button>

      <Win95 ref={emulatorRef}>
        <w95Window
          type="Button"
          onCommand={() => setOutput(`Button 1 pressed`)}
          params={WS_VISIBLE | WS_CHILD}
          x={10}
          y={10}
          w={70}
          h={20}
        >
          Test 1
        </w95Window>
        <w95Window
          type="Button"
          onCommand={() => setOutput(`Button 2 pressed`)}
          params={WS_VISIBLE | WS_CHILD}
          x={10}
          y={40}
          w={70}
          h={20}
        >
          Test 2
        </w95Window>
        <w95Window
          type="Button"
          onCommand={() => setOutput(`Button 3 pressed`)}
          params={WS_VISIBLE | WS_CHILD}
          x={10}
          y={70}
          w={70}
          h={20}
        >
          Test 3
        </w95Window>

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
