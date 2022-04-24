import { V86Starter } from 'v86';
import { CommBus } from './commBus';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export enum CommandType {
  Cmd_Invalid = 0,
  Cmd_SetCursorPos = 1,
  Cmd_MouseEvent = 2,
  Cmd_SetWindowPos = 3,
  Cmd_CreateWindow = 4,
  Cmd_DestroyWindow = 5,
  Cmd_SetWindowText = 6,
  Cmd_GetWindowText = 7,
  Cmd_MessageBoxEx = 8,
  Cmd_Ping = 9,
  Cmd_ExtractIcon = 10,
  Cmd_DestroyIcon = 11,
  Cmd_SendMessage = 12,
  Cmd_SetWindowLong = 13,
  Cmd_GetWindowLong = 14,
  Cmd_CreateFont = 15,
  Cmd_DeleteObject = 16,
  Cmd_ShowWindow = 17,
  Cmd_SetResolution = 18,
}

export enum MouseCommandType {
  MouseCmd_Nothing = 0,
  MouseCmd_LeftDown = 1,
  MouseCmd_LeftUp = 2,
  MouseCmd_RightDown = 3,
  MouseCmd_RightUp = 4,
  MouseCmd_MiddleDown = 5,
  MouseCmd_MiddleUp = 6,
  MouseCmd_Wheel = 7,
}

export enum DataType {
  Null = 0,
  Int = 1,
  UInt = 2,
  Float = 3,
  String = 4,
}

function buildRemoteCommand(type: CommandType, params: { type: DataType; value: string | number }[]) {
  const magic = 0xc0ad;
  const paramsByteLength = params.map(p => 4 + (p.type === DataType.String ? (p.value as string).length + 1 + 4 : 4)).reduce((a, b) => a + b, 0);
  const buffer = new ArrayBuffer(4 + 4 + 4 + paramsByteLength);
  const view = new DataView(buffer);
  view.setUint32(0, magic, true);
  view.setUint32(4, type, true);
  view.setUint32(8, params.length, true);
  let stringPos = buffer.byteLength;
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
  return buffer;
}

export interface EmulatorState {
  v86Emulator: V86Starter;
  ready: boolean;
}

export enum ResponseType {
  Res_Invalid = 0,
  Res_Ping = 1,
  Res_WinProc = 2,
  Res_CmdOutputHandle = 3,
  Res_CmdOutputLong = 4,
}

export type EventPayload =
  | {
      type: ResponseType.Res_WinProc;
      hwnd: number;
      message: number;
      wParam: number;
      lParam: number;
    }
  | {
      type: ResponseType.Res_CmdOutputHandle;
      seq: number;
      handle: number;
    }
  | {
      type: ResponseType.Res_CmdOutputLong;
      seq: number;
      length: number;
      data: ArrayBuffer;
    }
  | { type: ResponseType.Res_Ping }
  | { type: ResponseType.Res_Invalid };

function parseEventPayload(data: ArrayBuffer): EventPayload | null {
  if (data.byteLength < 4) return null;
  const dv = new DataView(data);
  const type = dv.getUint32(0, true) as ResponseType;
  if (type === ResponseType.Res_WinProc) {
    if (data.byteLength !== 20) return null;
    return {
      type,
      hwnd: dv.getUint32(4, true),
      message: dv.getUint32(8, true),
      wParam: dv.getUint32(12, true),
      lParam: dv.getInt32(16, true),
    };
  } else if (type === ResponseType.Res_CmdOutputHandle) {
    if (data.byteLength !== 12) return null;
    return {
      type,
      seq: dv.getUint32(4, true),
      handle: dv.getUint32(8, true),
    };
  } else if (type === ResponseType.Res_CmdOutputLong) {
    if (data.byteLength !== 12 + dv.getUint32(8, true)) return null;
    return {
      type,
      seq: dv.getUint32(4, true),
      length: dv.getUint32(8, true),
      data: data.slice(12),
    };
  } else {
    return { type };
  }
}

export type EmulatorEvents = {
  onReady?: () => void;
  onEvent?: (data: EventPayload) => void;
};

export type Binaries = {
  v86WASM?: ArrayBuffer;
  v86WASMFn?: any;
  seabios?: ArrayBuffer;
  seabiosUrl?: string;
  vgabios?: ArrayBuffer;
  vgabiosUrl?: string;
  osImg?: ArrayBuffer;
  osImgUrl?: string;
};

function wrapWasm(wasmAB: ArrayBuffer) {
  return async (param: any) => (await WebAssembly.instantiate(wasmAB, param)).instance.exports;
}

export type EmulatorAPI = ReturnType<typeof initEmulator>['api'];

export function initEmulator(screenContainer: HTMLDivElement, events: EmulatorEvents, binaries: Binaries, options = { scale: 0.5, fromState: false }) {
  const v86Emulator = new V86Starter({
    screen_container: screenContainer,
    wasm_fn: binaries.v86WASM ? wrapWasm(binaries.v86WASM) : binaries.v86WASMFn,
    bios: binaries.seabios ? { buffer: binaries.seabios } : { url: binaries.seabiosUrl },
    vga_bios: binaries.vgabios ? { buffer: binaries.vgabios } : { url: binaries.vgabiosUrl },
    hda: binaries.osImg ? { buffer: binaries.osImg } : { url: binaries.osImgUrl },
    // initial_state: options.fromState && { url: './state.bin' },
    boot_order: 0x132,
    memory_size: 32 * 1024 * 1024,
    disable_mouse: true,
    // disable_keyboard: true,
    autostart: options.fromState || true,
  });

  (window as any).emulator = v86Emulator;

  v86Emulator.add_listener('emulator-started', () => {
    v86Emulator.v86.cpu.devices.commBus = new CommBus(v86Emulator.v86.cpu, pkg => {
      const parsed = parseEventPayload(pkg);
      if (!parsed) return;

      events.onEvent?.(parsed);
      if ((parsed.type === ResponseType.Res_CmdOutputHandle || parsed.type === ResponseType.Res_CmdOutputLong) && seqListeners.has(parsed.seq)) {
        seqListeners.get(parsed.seq)?.(parsed);
        seqListeners.delete(parsed.seq);
      }

      if (!emuState.ready) {
        events.onReady?.();
        emuState.ready = true;
      }
    });
  });

  const emuState: EmulatorState = {
    v86Emulator,
    ready: false,
  };

  function sendSerial(data: ArrayBuffer) {
    const commBus = v86Emulator.v86.cpu.devices.commBus as CommBus;
    commBus && commBus.sendData(data);
  }
  function sendMousePos(x: number, y: number) {
    const cmd = x | (y << 16);
    const commBus = v86Emulator.v86.cpu.devices.commBus as CommBus;
    commBus && commBus.sendDataMousePos(cmd);
  }
  function sendMouseEvt(command: MouseCommandType, param: number) {
    const cmd = command | (param << 8);
    const commBus = v86Emulator.v86.cpu.devices.commBus as CommBus;
    commBus && commBus.sendDataMouseEvt(cmd);
  }

  let seqNumber = 0;
  function getSeqNumber() {
    const s = seqNumber;
    seqNumber = (seqNumber + 1) & 0xffffff;
    return s;
  }
  const seqListeners = new Map<number, (e: EventPayload) => void>();

  const createdFonts: {
    lfWidth: number;
    lfHeight: number;
    lfWeight: number;
    lfItalic: number;
    lfUnderline: number;
    lfStrikeOut: number;
    lfFaceName?: string;
    handle: number;
  }[] = [];

  const api = {
    sendSerial,

    startBridge() {
      v86Emulator.keyboard_send_scancodes([0x1d, 0x13]);
      v86Emulator.keyboard_send_scancodes([0x9d, 0x93]);
      v86Emulator.keyboard_send_text('"c:\\windows\\bridge.exe"');
      v86Emulator.keyboard_send_scancodes([0x1c]);
      v86Emulator.keyboard_send_scancodes([0x9c]);
    },

    setMousePos(x: number, y: number) {
      sendMousePos(x, y);
    },

    sendMouseEvent(down: boolean, button: 0 | 2) {
      if (down) {
        if (button === 0) {
          sendMouseEvt(MouseCommandType.MouseCmd_LeftDown, 0);
        } else if (button === 2) {
          sendMouseEvt(MouseCommandType.MouseCmd_RightDown, 0);
        }
      } else {
        if (button === 0) {
          sendMouseEvt(MouseCommandType.MouseCmd_LeftUp, 0);
        } else if (button === 2) {
          sendMouseEvt(MouseCommandType.MouseCmd_RightUp, 0);
        }
      }
    },

    setWindowPos(id: number, x: number, y: number, w: number, h: number) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_SetWindowPos, [
          { type: DataType.UInt, value: id },
          { type: DataType.Int, value: x },
          { type: DataType.Int, value: y },
          { type: DataType.Int, value: w },
          { type: DataType.Int, value: h },
        ]),
      );
    },

    createWindow(window: {
      id: number;
      extStyle: number;
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
          { type: DataType.UInt, value: window.extStyle },
          { type: DataType.String, value: window.type },
          { type: DataType.String, value: window.text },
          { type: DataType.UInt, value: window.params },
          { type: DataType.Int, value: window.x },
          { type: DataType.Int, value: window.y },
          { type: DataType.Int, value: window.w },
          { type: DataType.Int, value: window.h },
          { type: DataType.UInt, value: window.parentId },
          { type: DataType.UInt, value: window.menuId },
        ]),
      );
    },

    destroyWindow(id: number) {
      sendSerial(buildRemoteCommand(CommandType.Cmd_DestroyWindow, [{ type: DataType.UInt, value: id }]));
    },

    setWindowText(id: number, text: string) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_SetWindowText, [
          { type: DataType.UInt, value: id },
          { type: DataType.String, value: text },
        ]),
      );
    },

    getWindowText(id: number) {
      return new Promise<string>(resolve => {
        const seq = getSeqNumber();
        seqListeners.set(seq, e => {
          if (e.type === ResponseType.Res_CmdOutputLong) {
            resolve(decoder.decode(e.data).split('\0')[0]);
          }
        });
        sendSerial(
          buildRemoteCommand(CommandType.Cmd_GetWindowText, [
            { type: DataType.UInt, value: id },
            { type: DataType.UInt, value: seq },
          ]),
        );
      });
    },

    extractIcon(file: string, id: number) {
      return new Promise<number>(resolve => {
        const seq = getSeqNumber();
        seqListeners.set(seq, e => {
          if (e.type === ResponseType.Res_CmdOutputHandle) {
            resolve(e.handle);
          }
        });
        sendSerial(
          buildRemoteCommand(CommandType.Cmd_ExtractIcon, [
            { type: DataType.UInt, value: seq },
            { type: DataType.String, value: file },
            { type: DataType.UInt, value: id },
          ]),
        );
      });
    },

    destroyIcon(handle: number) {
      sendSerial(buildRemoteCommand(CommandType.Cmd_DestroyIcon, [{ type: DataType.UInt, value: handle }]));
    },

    sendMessage(id: number, msg: number, wParam: number, lParam: number) {
      return new Promise<number>(resolve => {
        const seq = getSeqNumber();
        seqListeners.set(seq, e => {
          if (e.type === ResponseType.Res_CmdOutputHandle) {
            resolve(e.handle);
          }
        });
        sendSerial(
          buildRemoteCommand(CommandType.Cmd_SendMessage, [
            { type: DataType.UInt, value: id },
            { type: DataType.UInt, value: msg },
            { type: DataType.UInt, value: wParam },
            { type: DataType.Int, value: lParam },
            { type: DataType.UInt, value: seq },
          ]),
        );
      });
    },

    setWindowLong(id: number, nIndex: number, newLong: number) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_SetWindowLong, [
          { type: DataType.UInt, value: id },
          { type: DataType.Int, value: nIndex },
          { type: DataType.UInt, value: newLong },
        ]),
      );
    },

    getWindowLong(id: number, nIndex: number) {
      return new Promise<number>(resolve => {
        const seq = getSeqNumber();
        seqListeners.set(seq, e => {
          if (e.type === ResponseType.Res_CmdOutputHandle) {
            resolve(e.handle);
          }
        });
        sendSerial(
          buildRemoteCommand(CommandType.Cmd_GetWindowLong, [
            { type: DataType.UInt, value: id },
            { type: DataType.Int, value: nIndex },
            { type: DataType.UInt, value: seq },
          ]),
        );
      });
    },

    createFont(params: {
      lfWidth: number;
      lfHeight: number;
      lfWeight: number;
      lfItalic: number;
      lfUnderline: number;
      lfStrikeOut: number;
      lfFaceName?: string;
    }) {
      const found = createdFonts.find(
        f =>
          f.lfWidth === params.lfWidth &&
          f.lfHeight === params.lfHeight &&
          f.lfWeight === params.lfWeight &&
          f.lfItalic === params.lfItalic &&
          f.lfUnderline === params.lfUnderline &&
          f.lfStrikeOut === params.lfStrikeOut &&
          f.lfFaceName === params.lfFaceName,
      );
      if (found) return found.handle;

      return new Promise<number>(resolve => {
        const seq = getSeqNumber();
        seqListeners.set(seq, e => {
          if (e.type === ResponseType.Res_CmdOutputHandle) {
            createdFonts.push({ ...params, handle: e.handle });
            resolve(e.handle);
          }
        });
        sendSerial(
          buildRemoteCommand(CommandType.Cmd_CreateFont, [
            { type: DataType.UInt, value: seq },
            { type: DataType.Int, value: params.lfWidth },
            { type: DataType.Int, value: params.lfHeight },
            { type: DataType.Int, value: params.lfWeight },
            { type: DataType.Int, value: params.lfItalic },
            { type: DataType.Int, value: params.lfUnderline },
            { type: DataType.Int, value: params.lfStrikeOut },
            ...(params.lfFaceName ? [{ type: DataType.String, value: params.lfFaceName }] : []),
          ]),
        );
      });
    },

    deleteObject(handle: number) {
      sendSerial(buildRemoteCommand(CommandType.Cmd_DeleteObject, [{ type: DataType.UInt, value: handle }]));
    },

    showWindow(id: number, state: number) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_ShowWindow, [
          { type: DataType.UInt, value: id },
          { type: DataType.Int, value: state },
        ]),
      );
    },

    setResolution(w: number, h: number) {
      sendSerial(
        buildRemoteCommand(CommandType.Cmd_SetResolution, [
          { type: DataType.Int, value: w },
          { type: DataType.Int, value: h },
        ]),
      );
    },
  };

  setInterval(() => {
    sendSerial(buildRemoteCommand(CommandType.Cmd_Ping, []));
  }, 2000);

  return { state: emuState, api };
}
