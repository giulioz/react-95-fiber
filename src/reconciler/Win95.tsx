import React, {
  useRef,
  HTMLAttributes,
  useLayoutEffect,
  PropsWithChildren,
  createContext,
  ReactNode,
  useContext,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import useMeasure from 'react-use-measure';
import mergeRefs from 'react-merge-refs';
import debounce from 'lodash/debounce';
import { LOWORD } from '../emulator95/constants';
import { Binaries, EmulatorAPI, EmulatorState, initEmulator } from '../emulator95/emulator';
import { reconciler } from './reconciler';

export interface Win95Ref {
  state: EmulatorState;
  api: EmulatorAPI;
}

export type RootNode = Win95Ref & {
  type: 'root';
  root: RootNode;
  id: 0;
  events: Map<number, ((e: EventPayload) => void)[]>;
};

const context = createContext<Win95Ref | null>(null);
const roots = new Map<HTMLDivElement, { root: any; state: RootNode }>();

export function useWin95() {
  const value = useContext(context);
  if (!value) {
    throw new Error('No context available!');
  }
  return value;
}

interface Win95Props {
  onReady?: () => void;
  binaries: Binaries;
}

export function render(element: ReactNode, rootDiv: HTMLDivElement, w95Props: Omit<Win95Props, 'binaries'>, binaries: Binaries) {
  const store = roots.get(rootDiv);
  let root = store?.root;
  const state = store?.state || {
    state: null,
    api: null,
    type: 'root',
    root: null,
    id: 0,
    events: new Map<number, (() => void)[]>(),
  };
  state.root = state;

  if (!root) {
    const emuReturn = initEmulator(
      rootDiv,
      {
        onReady: () => {
          w95Props.onReady?.();

          reconciler.updateContainer(<context.Provider value={state as RootNode}>{element}</context.Provider>, root, null, () => undefined);
        },
        onEvent: e => {
          if (e.type === ResponseType.Res_WinProc) {
            const controlIdent = LOWORD(e.wParam);
            const records = state.events.get(controlIdent);
            if (records) records.forEach(r => r(e));
          }
        },
      },
      binaries,
    );
    Object.assign(state, emuReturn);

    root = reconciler.createContainer(state, 1, false, null);
  }

  roots.set(rootDiv, { root, state: state as RootNode });

  if (state.state?.ready) {
    reconciler.updateContainer(<context.Provider value={state as RootNode}>{element}</context.Provider>, root, null, () => undefined);
  }

  return state;
}

export function unmountComponentAtNode(rootDiv: HTMLDivElement) {
  const store = roots.get(rootDiv);
  if (!store) return;

  const { root, state } = store;

  state.state.v86Emulator.stop();
  state.state.v86Emulator.destroy();

  reconciler.updateContainer(null, root, null, () => {
    roots.delete(rootDiv);
  });
}

export const Win95 = forwardRef<Win95Ref, PropsWithChildren<HTMLAttributes<HTMLDivElement> & Win95Props>>(function Win95(
  { children, style, onReady, binaries, ...rest },
  ref,
) {
  const emulatorDivRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<Win95Ref>(null);
  const [measureRef, bounds] = useMeasure();
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    emulatorRef.current = render(
      children,
      emulatorDivRef.current!,
      {
        onReady: () => {
          setReady(true);
          onReady?.();
        },
      },
      binaries,
    );
    if (typeof ref === 'function') ref(emulatorRef.current);
    else if (ref) ref.current = emulatorRef.current;
  }, [children, onReady]);

  const debouncedUpdateRes = useCallback(
    debounce((width: number, height: number) => emulatorRef.current?.api.setResolution(width, height), 300),
    [],
  );
  useLayoutEffect(() => {
    if (ready) {
      debouncedUpdateRes(bounds.width, bounds.height);
    }
  }, [bounds, ready]);

  useLayoutEffect(() => {
    const container = emulatorDivRef.current!;
    return () => unmountComponentAtNode(container);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    if (!emulatorRef.current || !emulatorRef.current.api) return;
    const rect = emulatorDivRef.current.getBoundingClientRect();
    emulatorRef.current.api.setMousePos(e.clientX - rect.x, e.clientY - rect.y);
  }

  return (
    <div
      ref={mergeRefs([emulatorDivRef, measureRef])}
      onContextMenu={e => e.preventDefault()}
      onMouseMove={handleMouseMove}
      onMouseDown={e => emulatorRef.current.api.sendMouseEvent(true, e.button as 0 | 2)}
      onMouseUp={e => emulatorRef.current.api.sendMouseEvent(false, e.button as 0 | 2)}
      {...rest}
    >
      <div
        style={{
          whiteSpace: 'pre',
          font: '14px monospace',
          lineHeight: '14px',
          ...(style || {}),
        }}
      />
      <canvas style={{ display: 'none' }} />
    </div>
  );
});
