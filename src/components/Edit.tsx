import React, { useCallback, useRef } from 'react';
import { EventPayload, ResponseType } from '../emulator95/emulator';
import { Win95Ref } from '../reconciler/Win95';
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
  const editRef = useRef<{ id: number }>();
  const handleEvent = useCallback(
    async (e: EventPayload, ref: Win95Ref) => {
      if (editRef.current && e.type === ResponseType.Res_WinProc && e.message === WM_COMMAND && HIWORD(e.wParam) === EN_CHANGE && onChange) {
        const value = await ref.api.getWindowText(editRef.current.id);
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <w95Window ref={editRef} type='Edit' params={WS_VISIBLE | WS_CHILD} extStyle={WS_EX_CLIENTEDGE} x={x} y={y} w={w} h={h} onEvent={handleEvent}>
      {children}
    </w95Window>
  );
}
