import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';

// import v86WASMFn from 'v86-module/build/v86.wasm';
// import seabios from 'v86-module/bios/seabios.bin?url';
// import vgabios from 'v86-module/bios/vgabios.bin?url';
import { v86WASM, seabios, vgabios } from 'v86-module/build/binaries';
import osImgUrl from '../../binaries/os.img?url';
import { Win95, Win95Ref, Button, WS_VISIBLE, WS_CHILD, WS_EX_CLIENTEDGE, Binaries } from '../../src';

export function App({ binaries }: { binaries: Binaries }) {
  const emulatorRef = useRef<Win95Ref>(null);
  (window as any).emulatorRef = emulatorRef;

  const [result, setResult] = useState(0);

  return (
    <>
      <button onClick={() => emulatorRef.current.state.v86Emulator.run()}>start</button>
      <button onClick={() => emulatorRef.current.state.v86Emulator.restart()}>restart</button>

      <Win95 ref={emulatorRef} binaries={binaries}>
        <w95Window type='Edit' params={WS_VISIBLE | WS_CHILD} extStyle={WS_EX_CLIENTEDGE} x={10} y={10} w={80} h={20}>
          {result}
        </w95Window>

        {new Array(10).fill(0).map((_, i) => (
          <Button onClick={() => setResult(i)} x={10 + (i % 3) * 30} y={40 + Math.floor(i / 3) * 30} w={20} h={20}>
            {i}
          </Button>
        ))}
      </Win95>
    </>
  );
}

async function main() {
  const binaries = { v86WASM: await v86WASM, seabios: await seabios, vgabios: await vgabios, osImgUrl };
  ReactDOM.render(<App binaries={binaries} />, document.getElementById('root'));
}
main();
