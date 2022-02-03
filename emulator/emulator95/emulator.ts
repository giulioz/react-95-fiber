import "../v86/libv86";

export interface EmulatorState {
  v86Emulator: V86Starter;
  mousePos: [number, number];
  ready: boolean;
}

export type EmulatorEvents = {
  onReady?: () => void;
  onEvent?: (data: string) => void;
};

export function initEmulator(
  screenContainer: HTMLDivElement,
  events: EmulatorEvents,
  options = { scale: 0.5, mouseUpdateInterval: 20 }
) {
  const v86Emulator = new V86Starter({
    screen_container: screenContainer,
    wasm_path: require("url:../v86/v86.wasm"),
    bios: { url: require("url:../v86/seabios.bin") },
    vga_bios: { url: require("url:../v86/vgabios.bin") },
    hda: { url: require("url:./os.img") },
    boot_order: 0x132,
    memory_size: 64 * 1024 * 1024,
    disable_mouse: true,
    // disable_keyboard: true,
    autostart: false,
  });

  v86Emulator.add_listener("screen-set-mode", (isGraphical) => {
    if (isGraphical) {
      v86Emulator.screen_set_scale(options.scale, options.scale);
    } else {
      v86Emulator.screen_set_scale(1, 1);
    }
  });

  const emuState: EmulatorState = {
    v86Emulator,
    mousePos: [0, 0],
    ready: false,
  };

  let buffer = "";
  v86Emulator.add_listener("serial0-output-char", (char) => {
    if (char !== "\r") {
      buffer += char;
      return;
    }

    if (buffer.endsWith("READY")) {
      events.onReady?.();
      emuState.ready = true;
    } else {
      events.onEvent?.(buffer);
    }
    buffer = "";
  });

  setInterval(() => {
    if (!emuState.ready) return;
    v86Emulator.serial0_send(
      `mp|${emuState.mousePos[0]}|${emuState.mousePos[1]}\r`
    );
  }, options.mouseUpdateInterval);

  const api = {
    setMousePos(x: number, y: number) {
      emuState.mousePos = [x, y];
    },

    setWindowSize(id: number, x: number, y: number, w: number, h: number) {
      v86Emulator.serial0_send(`setWSize|${id}|${x}|${y}|${w}|${h}\r`);
    },

    addChildWindow(window: {
      id: number;
      type: string;
      text: string;
      x: number;
      y: number;
      w: number;
      h: number;
      eventId: number;
    }) {
      v86Emulator.serial0_send(
        `addChildW|${window.id}|${window.type}|${window.text}|${window.x}|${window.y}|${window.w}|${window.h}|${window.eventId}\r`
      );
    },

    setWindowText(id: number, text: string) {
      v86Emulator.serial0_send(`setWText|${id}|${text}\r`);
    },

    sendMouseEvent(down: boolean, button: 0 | 2) {
      if (down) {
        if (button === 0) {
          v86Emulator.serial0_send(`me|2\r`);
        } else if (button === 2) {
          v86Emulator.serial0_send(`me|8\r`);
        }
      } else {
        if (button === 0) {
          v86Emulator.serial0_send(`me|4\r`);
        } else if (button === 2) {
          v86Emulator.serial0_send(`me|16\r`);
        }
      }
    },
  };

  return { state: emuState, api };
}
