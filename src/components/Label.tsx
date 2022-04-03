import React from 'react';
import { WS_VISIBLE, WS_CHILD } from '../emulator95/constants';

export function Label({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: string | JSX.Element | (string | JSX.Element)[] }) {
  return (
    <w95Window type='Static' params={WS_VISIBLE | WS_CHILD} x={x} y={y} w={w} h={h}>
      {children}
    </w95Window>
  );
}
