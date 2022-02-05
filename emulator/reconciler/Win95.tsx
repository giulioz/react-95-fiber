import React, {
  useRef,
  HTMLAttributes,
  useLayoutEffect,
  PropsWithChildren,
  createContext,
  ReactNode,
  useContext,
  forwardRef,
} from "react";
import { WM_COMMAND } from "../emulator95/constants";
import {
  EmulatorAPI,
  EmulatorState,
  initEmulator,
  ResponseType,
} from "../emulator95/emulator";

import { reconciler } from "./reconciler";

export interface Win95Ref {
  state: EmulatorState;
  api: EmulatorAPI;
}

export type RootNode = Win95Ref & {
  type: "root";
  root: RootNode;
  id: 0;
  events: Map<number, () => void>;
};

const context = createContext<Win95Ref | null>(null);
const roots = new Map<HTMLDivElement, { root: any; state: RootNode }>();

export function useWin95() {
  const value = useContext(context);
  if (!value) {
    throw new Error("No context available!");
  }
  return value;
}

interface Win95Props {
  onReady?: () => void;
}

export function render(
  element: ReactNode,
  rootDiv: HTMLDivElement,
  w95Props: Win95Props
) {
  const store = roots.get(rootDiv);
  let root = store?.root;
  const state = store?.state || {
    state: null,
    api: null,
    type: "root",
    root: null,
    id: 0,
    events: new Map<number, () => void>(),
  };
  state.root = state;

  if (!root) {
    const emuReturn = initEmulator(rootDiv, {
      onReady: () => {
        w95Props.onReady?.();

        reconciler.updateContainer(
          <context.Provider value={state as RootNode}>
            {element}
          </context.Provider>,
          root,
          null,
          () => undefined
        );
      },
      onEvent: (e) => {
        if (e.type === ResponseType.Res_WinProc && e.message === WM_COMMAND) {
          const record = state.events.get(e.wParam);
          if (record) record();
        }
      },
    });
    Object.assign(state, emuReturn);

    root = reconciler.createContainer(state, 1, false, null);
  }

  roots.set(rootDiv, { root, state: state as RootNode });

  if (state.state?.ready) {
    reconciler.updateContainer(
      <context.Provider value={state as RootNode}>{element}</context.Provider>,
      root,
      null,
      () => undefined
    );
  }

  return state;
}

export function unmountComponentAtNode(rootDiv: HTMLDivElement) {
  const store = roots.get(rootDiv);
  if (!store) return;

  const { root } = store;

  reconciler.updateContainer(null, root, null, () => {
    // TODO: cleanup
    roots.delete(rootDiv);
  });
}

export const Win95 = forwardRef<
  Win95Ref,
  PropsWithChildren<HTMLAttributes<HTMLDivElement> & Win95Props>
>(function Win95({ children, style, onReady }, ref) {
  const emulatorDivRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<Win95Ref>(null);

  useLayoutEffect(() => {
    emulatorRef.current = render(children, emulatorDivRef.current!, {
      onReady,
    });
    if (typeof ref === "function") ref(emulatorRef.current);
    else ref.current = emulatorRef.current;
  }, [children, onReady]);

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
      ref={emulatorDivRef}
      onContextMenu={(e) => e.preventDefault()}
      onMouseMove={handleMouseMove}
      onMouseDown={(e) =>
        emulatorRef.current.api.sendMouseEvent(true, e.button as 0 | 2)
      }
      onMouseUp={(e) =>
        emulatorRef.current.api.sendMouseEvent(false, e.button as 0 | 2)
      }
    >
      <div
        style={{
          whiteSpace: "pre",
          font: "14px monospace",
          lineHeight: "14px",
          ...(style || {}),
        }}
      />
      <canvas style={{ display: "none" }} />
    </div>
  );
});
