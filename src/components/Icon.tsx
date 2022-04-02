import React, { useEffect, useRef } from 'react';
import { useWin95 } from '../reconciler/Win95';
import { WS_VISIBLE, WS_CHILD, SS_ICON, STM_SETICON } from '../emulator95/constants';

export function Icon({ iconId, iconFile = 'shell32.dll', x, y, w, h }: { iconId: number; iconFile?: string; x: number; y: number; w: number; h: number }) {
  const { api } = useWin95();
  const staticRef = useRef<{ id: number }>();

  useEffect(() => {
    async function loadIcon() {
      const iconHandle = await api.extractIcon(iconFile, iconId);
      if (iconHandle && staticRef.current) {
        api.sendMessage(staticRef.current.id, STM_SETICON, iconHandle, 0);
      }
    }
    loadIcon();
  }, []);

  return <w95Window ref={staticRef} type='Static' params={WS_VISIBLE | WS_CHILD | SS_ICON} x={x} y={y} w={w} h={h} />;
}
