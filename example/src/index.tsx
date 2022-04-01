import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';

import v86WASMFn from 'v86/build/v86.wasm';
import seabiosUrl from 'v86/bios/seabios.bin?url';
import vgabiosUrl from 'v86/bios/vgabios.bin?url';
import osImgUrl from '../../binaries/os.img?url';
import { Win95, Win95Ref, Button, WS_VISIBLE, WS_CHILD, WS_EX_CLIENTEDGE, Binaries, WS_OVERLAPPEDWINDOW, CW_USEDEFAULT } from '../../src';

import './style.css';

export function App({ binaries }: { binaries: Binaries }) {
  const emulatorRef = useRef<Win95Ref>(null);
  (window as any).emulatorRef = emulatorRef;

  const [result, setResult] = useState(0);

  return (
    <>
      <Win95 ref={emulatorRef} binaries={binaries} className='w95Window'>
        <w95Window
          type='WindowsApp'
          text='Test window'
          params={WS_VISIBLE | WS_OVERLAPPEDWINDOW}
          x={CW_USEDEFAULT}
          y={CW_USEDEFAULT}
          w={500}
          h={400}
          menuId={0}
        >
          <w95Window type='Edit' params={WS_VISIBLE | WS_CHILD} extStyle={WS_EX_CLIENTEDGE} x={10} y={10} w={200} h={20}>
            {result.toString()}
          </w95Window>

          <Button onClick={() => setResult(Math.random())} x={10} y={40} w={120} h={20}>
            Get new random
          </Button>
        </w95Window>
      </Win95>

      <div className='controls'>
        <button onClick={() => emulatorRef.current.state.v86Emulator.run()}>Start</button>
        <button onClick={() => emulatorRef.current.state.v86Emulator.restart()}>Restart</button>
      </div>
    </>
  );
}

async function main() {
  const binaries = { v86WASMFn, seabiosUrl, vgabiosUrl, osImgUrl };
  ReactDOM.render(<App binaries={binaries} />, document.getElementById('root'));
}
main();
