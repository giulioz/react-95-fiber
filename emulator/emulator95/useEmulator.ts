import { useEffect, useRef, useState } from "react";
import { EmulatorEvents, initEmulator } from "./emulator";

export function useEmulator(
  screenContainer: HTMLDivElement,
  events: EmulatorEvents
) {
  const eventsRef = useRef<EmulatorEvents>(events);
  useEffect(() => void (eventsRef.current = events), [events]);

  const emulator = useState(() =>
    initEmulator(screenContainer, {
      onReady() {
        setReady(true);
        events.onReady?.();
      },
      onEvent(str) {
        events.onEvent?.(str);
      },
    })
  )[0];
  const [ready, setReady] = useState(false);

  return { ready, state: emulator.state, api: emulator.api };
}
