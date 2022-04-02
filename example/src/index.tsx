import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';

import v86WASMFn from 'v86/build/v86.wasm';
import seabiosUrl from 'v86/bios/seabios.bin?url';
import vgabiosUrl from 'v86/bios/vgabios.bin?url';
import osImgUrl from '../../binaries/os.img?url';
import { Win95, Win95Ref, Button, Binaries, Window, Edit, Label } from '../../src';

import './style.css';

export function App({ binaries }: { binaries: Binaries }) {
  const emulatorRef = useRef<Win95Ref>(null);
  (window as any).emulatorRef = emulatorRef;

  const [randomN, setRandomN] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Win95 ref={emulatorRef} binaries={binaries} className='w95Window'>
        <Window title='Test window' w={500} h={400}>
          <Edit x={10} y={10} w={200} h={20} onChange={setInputValue}>
            {randomN.toString()}
          </Edit>

          <Button onClick={() => setRandomN(Math.random())} x={10} y={40} w={120} h={20}>
            Get new random
          </Button>

          <Label x={10} y={80} w={120} h={20}>
            {inputValue}
          </Label>
        </Window>
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
