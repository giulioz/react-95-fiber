import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';

import v86WASMFn from 'v86/build/v86.wasm';
import seabiosUrl from 'v86/bios/seabios.bin?url';
import vgabiosUrl from 'v86/bios/vgabios.bin?url';
import osImgUrl from '../../binaries/os.img?url';
import { Win95, Binaries, Win95Ref, WM_CREATE, WS_VISIBLE, WS_CHILD } from '../../src';
import { RpcAdapter } from '../../src/emulator95/RpcAdapter';
import { translateVirtualToPhysical } from '../../src/emulator95/utils';

import { Intro } from './Intro';
import { IconsViewer } from './IconsViewer';
import { Calculator } from './Calculator';

import './style.css';

export function App({ binaries }: { binaries: Binaries }) {
  const [iconsViewerOpen, setIconsViewerOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const ref = useRef<Win95Ref>(null);

  async function handleReady() {
    const cpu = ref.current?.state.v86Emulator.v86.cpu;
    const rpcAdapter = cpu.devices.rpcAdapter as RpcAdapter;

    await rpcAdapter.wrappers.user32.RegisterClassExA({
      cbSize: 48,
      style: 0,
      lpfnWndProc: async () => {
        const paramsAddr = translateVirtualToPhysical(cpu.reg32[5], cpu) / 4 + 2;
        const hWnd = cpu.mem32s[paramsAddr];
        const Msg = cpu.mem32s[paramsAddr + 1];
        const wParam = cpu.mem32s[paramsAddr + 2];
        const lParam = cpu.mem32s[paramsAddr + 3];

        if (Msg === WM_CREATE) {
          await rpcAdapter.wrappers.user32.CreateWindowExA(0, 'Button', 'Beep', WS_VISIBLE | WS_CHILD, 20, 50, 80, 25, hWnd, 1, 0, 0);
        } else {
          const defResult = await rpcAdapter.wrappers.user32.DefWindowProcA(hWnd, Msg, wParam, lParam);
          cpu.mem32s[rpcAdapter.bufferPtr / 4 + 1] = defResult;
        }
      },
      cbClsExtra: 0,
      cbWndExtra: 0,
      hInstance: rpcAdapter.bridgeHInstance,
      hIcon: 0,
      hCursor: 0,
      hbrBackground: 5,
      lpszMenuName: 0,
      lpszClassName: 'MyWindow',
      hIconSm: 0,
    });

    const hwnd = await rpcAdapter.wrappers.user32.CreateWindowExA(0, 'MyWindow', 'Test Window', 0, 0, 0, 400, 400, 0, 0, rpcAdapter.bridgeHInstance, 0);
    await rpcAdapter.wrappers.user32.ShowWindow(hwnd, 1);
  }

  return (
    <Win95 binaries={binaries} className='w95Window' ref={ref} onReady={handleReady}>
      {/* <Intro openIconsViewer={() => setIconsViewerOpen(true)} openCalculator={() => setCalculatorOpen(true)} />

      <IconsViewer open={iconsViewerOpen} onClose={() => setIconsViewerOpen(false)} />
      <Calculator open={calculatorOpen} onClose={() => setCalculatorOpen(false)} /> */}

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
