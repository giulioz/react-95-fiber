import React, { useCallback, useEffect, useRef } from 'react';
import { EventPayload, ResponseType } from '../emulator95/emulator';
import { useWin95, Win95Ref } from '../reconciler/Win95';
import { WS_VISIBLE, WS_CHILD, WM_COMMAND, BS_CHECKBOX, BM_GETCHECK, BM_SETCHECK, BST_CHECKED, BST_UNCHECKED } from '../emulator95/constants';

export function Checkbox({
  value,
  onChange,
  x,
  y,
  w,
  h,
  children,
}: {
  value?: boolean;
  onChange?: (value: boolean) => void;
  x: number;
  y: number;
  w: number;
  h: number;
  children: string | JSX.Element;
}) {
  const buttonRef = useRef<{ id: number }>();
  const handleEvent = useCallback(
    async (e: EventPayload, ref: Win95Ref) => {
      if (buttonRef.current && e.type === ResponseType.Res_WinProc && e.message === WM_COMMAND) {
        const checked = await ref.api.sendMessage(buttonRef.current.id, BM_GETCHECK, 0, 0);
        ref.api.sendMessage(buttonRef.current.id, BM_SETCHECK, checked ? BST_UNCHECKED : BST_CHECKED, 0);
        onChange && onChange(checked === BST_UNCHECKED);
      }
    },
    [onChange],
  );

  const { api } = useWin95();
  useEffect(() => {
    if (buttonRef.current) {
      api.sendMessage(buttonRef.current.id, BM_SETCHECK, value ? BST_CHECKED : BST_UNCHECKED, 0);
    }
  }, [value]);

  return (
    <w95Window ref={buttonRef} type='Button' onEvent={handleEvent} params={WS_VISIBLE | WS_CHILD | BS_CHECKBOX} x={x} y={y} w={w} h={h}>
      {children}
    </w95Window>
  );
}
