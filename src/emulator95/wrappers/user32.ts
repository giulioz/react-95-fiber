import { RpcAdapter } from '../RpcAdapter';
import { readMemString, translatePhysicalToVirtual } from '../utils';

export class User32 {
  constructor(private rpcAdapter: RpcAdapter) {}

  async cacheAll() {
    await this.rpcAdapter.runSync(async () => {
      await this.rpcAdapter.cacheEntry('user32.dll', 'MessageBoxA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'SetWindowPos');
      await this.rpcAdapter.cacheEntry('user32.dll', 'RegisterClassExA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'DefWindowProcA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'CreateWindowExA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'DestroyWindow');
      await this.rpcAdapter.cacheEntry('user32.dll', 'SetWindowTextA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'GetWindowTextA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'DestroyIcon');
      await this.rpcAdapter.cacheEntry('user32.dll', 'SendMessageA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'SetWindowLongA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'GetWindowLongA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'ShowWindow');
      await this.rpcAdapter.cacheEntry('user32.dll', 'EnumDisplaySettingsA');
      await this.rpcAdapter.cacheEntry('user32.dll', 'ChangeDisplaySettingsA');
      await this.rpcAdapter.cacheEntry('shell32.dll', 'ExtractIconA');
      await this.rpcAdapter.cacheEntry('kernel32.dll', 'GetCurrentThreadId');
    });
  }

  async MessageBoxA(hWnd: number, lpText: string | number, lpCaption: string | number, uType: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(uType);
    typeof lpCaption === 'string' ? this.rpcAdapter.addStringParam(lpCaption, 16) : this.rpcAdapter.addIntParam(lpCaption);
    typeof lpText === 'string' ? this.rpcAdapter.addStringParam(lpText, 16) : this.rpcAdapter.addIntParam(lpText);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'MessageBoxA', 16);
  }

  async SetWindowPos(hWnd: number, hWndInsertAfter: number, X: number, Y: number, cx: number, cy: number, uFlags: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(uFlags);
    this.rpcAdapter.addIntParam(cy);
    this.rpcAdapter.addIntParam(cx);
    this.rpcAdapter.addIntParam(Y);
    this.rpcAdapter.addIntParam(X);
    this.rpcAdapter.addIntParam(hWndInsertAfter);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'SetWindowPos', 28);
  }

  async RegisterClassExA(lpWndClass: WNDCLASSEXA | number) {
    await this.rpcAdapter.beginCall();
    if (typeof lpWndClass === 'object') {
      const norm_lpfnWndProc =
        typeof lpWndClass.lpfnWndProc === 'function' ? this.rpcAdapter.addFunctionParam(lpWndClass.lpfnWndProc, true) : lpWndClass.lpfnWndProc;
      const norm_lpszMenuName =
        typeof lpWndClass.lpszMenuName === 'string' ? this.rpcAdapter.addStringParam(lpWndClass.lpszMenuName, 4, true) : lpWndClass.lpszMenuName;
      const norm_lpszClassName =
        typeof lpWndClass.lpszClassName === 'string' ? this.rpcAdapter.addStringParam(lpWndClass.lpszClassName, 4, true) : lpWndClass.lpszClassName;
      this.rpcAdapter.addStructParam(
        [
          lpWndClass.cbSize,
          lpWndClass.style,
          norm_lpfnWndProc,
          lpWndClass.cbClsExtra,
          lpWndClass.cbWndExtra,
          lpWndClass.hInstance,
          lpWndClass.hIcon,
          lpWndClass.hCursor,
          lpWndClass.hbrBackground,
          norm_lpszMenuName,
          norm_lpszClassName,
          lpWndClass.hIconSm,
        ],
        4,
      );
    } else {
      this.rpcAdapter.addIntParam(lpWndClass);
    }
    return this.rpcAdapter.callFull('user32.dll', 'RegisterClassExA', 4);
  }

  async DefWindowProcA(hWnd: number, Msg: number, wParam: number, lParam: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(lParam);
    this.rpcAdapter.addIntParam(wParam);
    this.rpcAdapter.addIntParam(Msg);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'DefWindowProcA', 4 * 4);
  }

  async CreateWindowExA(
    dwExStyle: number,
    lpClassName: string | number,
    lpWindowName: string | number,
    dwStyle: number,
    X: number,
    Y: number,
    nWidth: number,
    nHeight: number,
    hWndParent: number,
    hMenu: number,
    hInstance: number,
    lpParam: number,
  ) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(lpParam);
    this.rpcAdapter.addIntParam(hInstance);
    this.rpcAdapter.addIntParam(hMenu);
    this.rpcAdapter.addIntParam(hWndParent);
    this.rpcAdapter.addIntParam(nHeight);
    this.rpcAdapter.addIntParam(nWidth);
    this.rpcAdapter.addIntParam(Y);
    this.rpcAdapter.addIntParam(X);
    this.rpcAdapter.addIntParam(dwStyle);
    typeof lpWindowName === 'string' ? this.rpcAdapter.addStringParam(lpWindowName, 12 * 4) : this.rpcAdapter.addIntParam(lpWindowName);
    typeof lpClassName === 'string' ? this.rpcAdapter.addStringParam(lpClassName, 12 * 4) : this.rpcAdapter.addIntParam(lpClassName);
    this.rpcAdapter.addIntParam(dwExStyle);
    return this.rpcAdapter.callFull('user32.dll', 'CreateWindowExA', 12 * 4);
  }

  async DestroyWindow(hWnd: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'DestroyWindow', 4);
  }

  async SetWindowTextA(hWnd: number, lpString: string | number) {
    await this.rpcAdapter.beginCall();
    typeof lpString === 'string' ? this.rpcAdapter.addStringParam(lpString, 8) : this.rpcAdapter.addIntParam(lpString);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'SetWindowTextA', 8);
  }

  async GetWindowTextA(hWnd: number, lpString: number | null, nMaxCount: number | null): Promise<[number, string]> {
    await this.rpcAdapter.beginCall();
    nMaxCount = nMaxCount || this.rpcAdapter.bufferSize - this.rpcAdapter.bufferParamsOffset - 12;
    this.rpcAdapter.addIntParam(nMaxCount);
    lpString = lpString || this.rpcAdapter.bufferPtrVrt + this.rpcAdapter.bufferParamsOffset + 12;
    this.rpcAdapter.addIntParam(lpString);
    this.rpcAdapter.addIntParam(hWnd);
    const result = await this.rpcAdapter.callFull('user32.dll', 'GetWindowTextA', 12);
    const string = readMemString(this.rpcAdapter.cpu, translatePhysicalToVirtual(lpString, this.rpcAdapter.cpu));
    return [result, string];
  }

  async DestroyIcon(hIcon: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(hIcon);
    return this.rpcAdapter.callFull('user32.dll', 'DestroyIcon', 4);
  }

  async SendMessageA(hWnd: number, Msg: number, wParam: number, lParam: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(lParam);
    this.rpcAdapter.addIntParam(wParam);
    this.rpcAdapter.addIntParam(Msg);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'SendMessageA', 16);
  }

  async SetWindowLongA(hWnd: number, nIndex: number, dwNewLong: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(dwNewLong);
    this.rpcAdapter.addIntParam(nIndex);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'SetWindowLongA', 12);
  }

  async GetWindowLongA(hWnd: number, nIndex: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(nIndex);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'GetWindowLongA', 8);
  }

  async ShowWindow(hWnd: number, nCmdShow: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(nCmdShow);
    this.rpcAdapter.addIntParam(hWnd);
    return this.rpcAdapter.callFull('user32.dll', 'ShowWindow', 8);
  }

  async EnumDisplaySettingsA(lpszDeviceName: string | number, iModeNum: number, lpDevMode: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(lpDevMode);
    this.rpcAdapter.addIntParam(iModeNum);
    typeof lpszDeviceName === 'string' ? this.rpcAdapter.addStringParam(lpszDeviceName, 12) : this.rpcAdapter.addIntParam(lpszDeviceName);
    return this.rpcAdapter.callFull('user32.dll', 'EnumDisplaySettingsA', 12);
  }

  async ChangeDisplaySettingsA(lpDevMode: number, dwFlags: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(dwFlags);
    this.rpcAdapter.addIntParam(lpDevMode);
    return this.rpcAdapter.callFull('user32.dll', 'ChangeDisplaySettingsA', 8);
  }

  // shell32.dll
  async ExtractIconA(hInst: number, lpszExeFileName: string | number, nIconIndex: number) {
    await this.rpcAdapter.beginCall();
    this.rpcAdapter.addIntParam(nIconIndex);
    typeof lpszExeFileName === 'string' ? this.rpcAdapter.addStringParam(lpszExeFileName, 12) : this.rpcAdapter.addIntParam(lpszExeFileName);
    this.rpcAdapter.addIntParam(hInst);
    return this.rpcAdapter.callFull('shell32.dll', 'ExtractIconA', 12);
  }

  // kernel32.dll
  async GetCurrentThreadId() {
    await this.rpcAdapter.beginCall();
    return this.rpcAdapter.callFull('kernel32.dll', 'GetCurrentThreadId', 0);
  }

  // gdi32.dll
  async CreateFontIndirectA() {
    // TODO
  }

  // gdi32.dll
  async DeleteObject() {
    // TODO
  }
}

interface WNDCLASSEXA {
  cbSize: number;
  style: number;
  lpfnWndProc: Function | number;
  cbClsExtra: number;
  cbWndExtra: number;
  hInstance: number;
  hIcon: number;
  hCursor: number;
  hbrBackground: number;
  lpszMenuName: string | number;
  lpszClassName: string | number;
  hIconSm: number;
}
