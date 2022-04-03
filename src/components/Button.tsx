import React from 'react';
import { WS_VISIBLE, WS_CHILD, WM_COMMAND } from '../emulator95/constants';

export function Button({
  onClick,
  x,
  y,
  w,
  h,
  children,
}: {
  onClick?: () => void;
  x: number;
  y: number;
  w: number;
  h: number;
  children: string | JSX.Element | (string | JSX.Element)[];
}) {
  return (
    <w95Window type='Button' onEvent={e => e.message === WM_COMMAND && onClick && onClick()} params={WS_VISIBLE | WS_CHILD} x={x} y={y} w={w} h={h}>
      {children}
    </w95Window>
  );
}
