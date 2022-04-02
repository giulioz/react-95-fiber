import React from 'react';
import { WS_VISIBLE, CW_USEDEFAULT, WS_OVERLAPPEDWINDOW } from '../emulator95/constants';

export function Window({
  title,
  x,
  y,
  w,
  h,
  children,
  params,
}: {
  title?: string;
  x?: number;
  y?: number;
  w: number;
  h: number;
  children: JSX.Element | JSX.Element[];
  params?: number;
}) {
  return (
    <w95Window
      type='WindowsApp'
      text={title || ''}
      params={params === undefined ? WS_VISIBLE | WS_OVERLAPPEDWINDOW : params}
      menuId={0}
      x={x === undefined ? CW_USEDEFAULT : x}
      y={y === undefined ? CW_USEDEFAULT : y}
      w={w}
      h={h}
    >
      {children}
    </w95Window>
  );
}
