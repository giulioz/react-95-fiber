import React, { useCallback, useEffect, useRef } from 'react';
import { useWin95 } from '../reconciler/Win95';
import { CW_USEDEFAULT, WS_OVERLAPPEDWINDOW, WM_CLOSE } from '../emulator95/constants';
import { EventPayload, ResponseType } from '../emulator95/emulator';

export function Window({
  title,
  x,
  y,
  w,
  h,
  children,
  params,
  open,
  onClose,
}: {
  title?: string;
  x?: number;
  y?: number;
  w: number;
  h: number;
  children?: null | JSX.Element | (JSX.Element | null)[];
  params?: number;
  open?: boolean;
  onClose?: () => void;
}) {
  const windowRef = useRef<{ id: number }>();
  const { api } = useWin95();

  useEffect(() => {
    if (windowRef.current) {
      api.showWindow(windowRef.current?.id, open === false ? 0 : 1);
    }
  }, [open]);

  const handleEvent = useCallback(
    (e: EventPayload) => {
      if (e.type === ResponseType.Res_WinProc && e.message === WM_CLOSE && e.hwnd === windowRef.current?.id && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <w95Window
      ref={windowRef}
      type='WindowsApp'
      text={title || ''}
      params={params === undefined ? WS_OVERLAPPEDWINDOW : params}
      menuId={0}
      x={x === undefined ? CW_USEDEFAULT : x}
      y={y === undefined ? CW_USEDEFAULT : y}
      w={w}
      h={h}
      onEvent={handleEvent}
    >
      {children}
    </w95Window>
  );
}
