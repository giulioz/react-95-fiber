import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import v86WASMFn from 'v86/build/v86.wasm';
import seabiosUrl from 'v86/bios/seabios.bin?url';
import vgabiosUrl from 'v86/bios/vgabios.bin?url';
import osImgUrl from '../../binaries/os.img?url';
import { Win95, Binaries } from '../../src';

import { Intro } from './Intro';
import { IconsViewer } from './IconsViewer';
import { Calculator } from './Calculator';

import './style.css';

export function App({ binaries }: { binaries: Binaries }) {
  const [iconsViewerOpen, setIconsViewerOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <Win95 binaries={binaries} className='w95Window'>
      <Intro openIconsViewer={() => setIconsViewerOpen(true)} openCalculator={() => setCalculatorOpen(true)} />

      <IconsViewer open={iconsViewerOpen} onClose={() => setIconsViewerOpen(false)} />
      <Calculator open={calculatorOpen} onClose={() => setCalculatorOpen(false)} />

      {/* <Window title='Stress test' w={50 * 16 + 8} h={600}>
        {new Array(1500).fill(0).map((_, i) => (
          <Button x={(i % 50) * 16} y={Math.floor(i / 50) * 16} w={16} h={16}>
            {i.toString()}
            <w95Font height={10} weight={700} />
          </Button>
        ))}
      </Window> */}
    </Win95>
  );
}

async function main() {
  const binaries = { v86WASMFn, seabiosUrl, vgabiosUrl, osImgUrl };
  ReactDOM.render(<App binaries={binaries} />, document.getElementById('root'));
}
main();
