import React from 'react';
import { Icon, Window } from '../../src';

export function IconsViewer({ open, onClose }: { open: boolean; onClose?: () => void }) {
  return (
    <>
      <Window title='All icons (shell32.dll)' w={256 + 30} h={320 + 20} open={open} onClose={onClose}>
        {open
          ? new Array(80).fill(0).map((_, i) => <Icon iconFile='shell32.dll' iconId={i} x={10 + (i % 8) * 32} y={10 + Math.floor(i / 8) * 32} w={32} h={32} />)
          : null}
      </Window>

      <Window title='All icons (pifmgr.dll)' w={256 + 30} h={192 + 20} open={open} onClose={onClose}>
        {open
          ? new Array(38).fill(0).map((_, i) => <Icon iconFile='pifmgr.dll' iconId={i} x={10 + (i % 8) * 32} y={10 + Math.floor(i / 8) * 32} w={32} h={32} />)
          : null}
      </Window>

      <Window title='All icons (moricons.dll)' w={256 + 30} h={256 + 20} open={open} onClose={onClose}>
        {open
          ? new Array(80).fill(0).map((_, i) => <Icon iconFile='moricons.dll' iconId={i} x={10 + (i % 8) * 32} y={10 + Math.floor(i / 8) * 32} w={32} h={32} />)
          : null}
      </Window>

      <Window title='All icons (setupx.dll)' w={256 + 30} h={192 + 20} open={open} onClose={onClose}>
        {open
          ? new Array(38).fill(0).map((_, i) => <Icon iconFile='setupx.dll' iconId={i} x={10 + (i % 8) * 32} y={10 + Math.floor(i / 8) * 32} w={32} h={32} />)
          : null}
      </Window>

      <Window title='All icons (user.exe)' w={256 + 30} h={192 + 20} open={open} onClose={onClose}>
        {open
          ? new Array(38).fill(0).map((_, i) => <Icon iconFile='user.exe' iconId={i} x={10 + (i % 8) * 32} y={10 + Math.floor(i / 8) * 32} w={32} h={32} />)
          : null}
      </Window>
    </>
  );
}
