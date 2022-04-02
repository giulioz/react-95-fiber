import React from 'react';
import { WS_VISIBLE, WS_CHILD, WS_EX_CLIENTEDGE, EN_CHANGE, WM_COMMAND, HIWORD, LOWORD } from '../emulator95/constants';

export function Edit({
  onChange,
  x,
  y,
  w,
  h,
  children,
}: {
  onChange?: (value: string) => void;
  x: number;
  y: number;
  w: number;
  h: number;
  children: string | JSX.Element;
}) {
  return (
    <w95Window
      type='Edit'
      params={WS_VISIBLE | WS_CHILD}
      extStyle={WS_EX_CLIENTEDGE}
      x={x}
      y={y}
      w={w}
      h={h}
      onEvent={async (e, ref) => {
        if (e.message === WM_COMMAND && HIWORD(e.wParam) === EN_CHANGE && onChange) {
          const controlIdent = LOWORD(e.wParam);
          const value = await ref.api.getWindowText(controlIdent);
          onChange(value);
        }
      }}
    >
      {children}
    </w95Window>
  );
}
