import "../v86/libv86";

export enum CommandType {
  Cmd_Invalid = 0,
  Cmd_SetCursorPos = 1,
  Cmd_MouseEvent = 2,
  Cmd_SetWindowPos = 3,
  Cmd_CreateWindow = 4,
  Cmd_DestroyWindow = 5,
  Cmd_SetWindowText = 6,
  Cmd_MessageBoxEx = 7,
  Cmd_Ping = 8,
}

export enum DataType {
  Null = 0,
  Int = 1,
  UInt = 2,
  Float = 3,
  String = 4,
}

function buildRemoteCommand(
  type: CommandType,
  params: { type: DataType; value: string | number }[]
) {
  const magic = 0xc0ad;
  const paramsByteLength = params
    .map(
      (p) =>
        4 +
        (p.type === DataType.String ? (p.value as string).length + 1 + 4 : 4)
    )
    .reduce((a, b) => a + b, 0);
  const buffer = new ArrayBuffer(4 + 4 + 4 + paramsByteLength + 1);
  const view = new DataView(buffer);
  view.setUint32(0, magic, true);
  view.setUint32(4, type, true);
  view.setUint32(8, params.length, true);
  let stringPos = buffer.byteLength - 1;
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    view.setUint32(12 + i * 8, param.type, true);
    if (param.type === DataType.Int) {
      view.setInt32(12 + i * 8 + 4, param.value as number, true);
    } else if (param.type === DataType.UInt) {
      view.setUint32(12 + i * 8 + 4, param.value as number, true);
    } else if (param.type === DataType.Float) {
      view.setFloat32(12 + i * 8 + 4, param.value as number, true);
    } else if (param.type === DataType.String) {
      const str = param.value as string;
      stringPos--;
      view.setUint8(stringPos, 0);
      for (let sI = str.length - 1; sI >= 0; sI--) {
        stringPos--;
        view.setUint8(stringPos, str.charCodeAt(sI));
      }
      view.setUint32(12 + i * 8 + 4, stringPos, true);
    }
  }
  view.setUint8(buffer.byteLength - 1, "\r".charCodeAt(0));
  return buffer;
}

export interface EmulatorState {
  v86Emulator: V86Starter;
  mousePos: [number, number];
  ready: boolean;
}

export enum ResponseType {
  Res_Invalid = 0,
  Res_PingResponse = 1,
  Res_WinProc = 2,
}

export type EventPayload =
  | {
      type: ResponseType.Res_WinProc;
      message: number;
      wParam: number;
      lParam: number;
    }
  | { type: ResponseType.Res_PingResponse }
  | { type: ResponseType.Res_Invalid };

function parseEventPayload(data: ArrayBuffer): EventPayload {
  const dv = new DataView(data);
  const type = dv.getUint32(0, true) as ResponseType;
  if (type === ResponseType.Res_WinProc) {
    return {
      type,
      message: dv.getUint32(4, true),
      wParam: dv.getUint32(8, true),
      lParam: dv.getInt32(12, true),
    };
  } else {
    return { type };
  }
}

export type EmulatorEvents = {
  onReady?: () => void;
  onEvent?: (data: EventPayload) => void;
};

export type EmulatorAPI = ReturnType<typeof initEmulator>["api"];

export function initEmulator(
  screenContainer: HTMLDivElement,
  events: EmulatorEvents,
  options = { scale: 0.5, mouseUpdateInterval: 20, fromState: false }
) {
  const v86Emulator = new V86Starter({
    screen_container: screenContainer,
    wasm_path: require("url:../v86/v86.wasm"),
    bios: { url: require("url:../v86/seabios.bin") },
    vga_bios: { url: require("url:../v86/vgabios.bin") },
    hda: { url: require("url:./os.img") },
    initial_state: options.fromState && { url: require("url:./state.bin") },
    boot_order: 0x132,
    memory_size: 32 * 1024 * 1024,
    disable_mouse: true,
    // disable_keyboard: true,
    autostart: options.fromState,
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

  const buffer = [];
  v86Emulator.add_listener("serial0-output-char", (char) => {
    if (char !== "\r") {
      buffer.push(char.charCodeAt(0));
      return;
    }

    if (buffer.length === 16) {
      events.onEvent?.(parseEventPayload(new Uint8Array(buffer).buffer));

      if (!emuState.ready) {
        events.onReady?.();
        emuState.ready = true;
      }
    }
    buffer.splice(0, buffer.length);
  });

  function sendSerial(data: ArrayBuffer) {
    const bytes = new Uint8Array(data);
    for (let i = 0; i < bytes.length; i++) {
      v86Emulator.bus.send("serial0-input", bytes[i]);
    }
  }

  const api = {
    sendSerial,

    startBridge() {
      v86Emulator.keyboard_send_scancodes([0x1d, 0x13]);
      v86Emulator.keyboard_send_scancodes([0x9d, 0x93]);
      v86Emulator.keyboard_send_text(
        '"c:\\windows\\start menu\\Programs\\StartUp\\bridge.exe"'
      );
      v86Emulator.keyboard_send_scancodes([0x1c]);
      v86Emulator.keyboard_send_scancodes([0x9c]);
    },

    setMousePos(x: number, y: number) {
      emuState.mousePos = [x, y];
    },

    setWindowPos(id: number, x: number, y: number, w: number, h: number) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_SetWindowPos, [
          { type: DataType.UInt, value: id },
          { type: DataType.Int, value: x },
          { type: DataType.Int, value: y },
          { type: DataType.Int, value: w },
          { type: DataType.Int, value: h },
        ])
      );
    },

    createWindow(window: {
      id: number;
      type: string;
      text: string;
      params: number;
      x: number;
      y: number;
      w: number;
      h: number;
      parentId: number;
      menuId: number;
    }) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_CreateWindow, [
          { type: DataType.UInt, value: window.id },
          { type: DataType.String, value: window.type },
          { type: DataType.String, value: window.text },
          { type: DataType.UInt, value: window.params },
          { type: DataType.Int, value: window.x },
          { type: DataType.Int, value: window.y },
          { type: DataType.Int, value: window.w },
          { type: DataType.Int, value: window.h },
          { type: DataType.UInt, value: window.parentId },
          { type: DataType.UInt, value: window.menuId },
        ])
      );
    },

    destroyWindow(id: number) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_DestroyWindow, [
          { type: DataType.UInt, value: id },
        ])
      );
    },

    setWindowText(id: number, text: string) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_SetWindowText, [
          { type: DataType.UInt, value: id },
          { type: DataType.String, value: text },
        ])
      );
    },

    sendMouseEvent(down: boolean, button: 0 | 2) {
      if (down) {
        if (button === 0) {
          sendSerial(
            buildRemoteCommand(CommandType.Cmd_MouseEvent, [
              { type: DataType.UInt, value: 2 },
            ])
          );
        } else if (button === 2) {
          sendSerial(
            buildRemoteCommand(CommandType.Cmd_MouseEvent, [
              { type: DataType.UInt, value: 8 },
            ])
          );
        }
      } else {
        if (button === 0) {
          sendSerial(
            buildRemoteCommand(CommandType.Cmd_MouseEvent, [
              { type: DataType.UInt, value: 4 },
            ])
          );
        } else if (button === 2) {
          sendSerial(
            buildRemoteCommand(CommandType.Cmd_MouseEvent, [
              { type: DataType.UInt, value: 16 },
            ])
          );
        }
      }
    },
  };

  setInterval(() => {
    if (!emuState.ready) return;
    sendSerial(
      buildRemoteCommand(CommandType.Cmd_SetCursorPos, [
        { type: DataType.Int, value: emuState.mousePos[0] },
        { type: DataType.Int, value: emuState.mousePos[1] },
      ])
    );
  }, options.mouseUpdateInterval);

  setInterval(() => {
    sendSerial(buildRemoteCommand(CommandType.Cmd_Ping, []));
  }, 2000);

  return { state: emuState, api };
}
