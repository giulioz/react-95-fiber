#include <interop.h>
#include <stdio.h>
#include <windows.h>

// char msgBuffer[256] = {0};
// sprintf(msgBuffer, "A: %d, B: %s", ((HMODULE*)&rpcBuffer.params)[0],
// rpcBuffer.params + 4); MessageBoxEx(NULL, msgBuffer, "Info", MB_OK, NULL);

int(__stdcall *tempFn)() = NULL;

void ExecRemote() {
  switch (rpcBuffer.command) {
  case RPC_CMD_LOADLIBRARY: {
    rpcBuffer.returnValue = (unsigned long)LoadLibrary(rpcBuffer.params);
    signalReturn();
    break;
  }

  case RPC_CMD_GETPROCADDRESS: {
    rpcBuffer.returnValue = (unsigned long)GetProcAddress(
        ((HMODULE *)&rpcBuffer.params)[0], rpcBuffer.params + 4);
    signalReturn();
    break;
  }

  case RPC_CMD_CALL: {
    tempFn = (int(__stdcall *)())rpcBuffer.callPtr;

    _asm {
      xor     ecx, ecx
    loopStart:
      cmp     ecx, DWORD PTR rpcBuffer+12
      jae     SHORT loopEnd
      mov     eax, DWORD PTR rpcBuffer[ecx+16]
      push    eax
      add     ecx, 4
      jmp     SHORT loopStart
    loopEnd:
    }

    rpcBuffer.returnValue = tempFn();

    signalReturn();
    break;
  }
  }
}

LRESULT CALLBACK WndProcReceiver(HWND hwnd, UINT message, WPARAM wParam,
                                 LPARAM lParam) {
  switch (message) {
  case WM_CLOSE:
    return 0;
  case WM_DEVICECHANGE:
    ExecRemote();
    return 0;
  default:
    return DefWindowProc(hwnd, message, wParam, lParam);
  }

  return 0;
}

void StartReceiverWindow(HINSTANCE hInstance) {
  char className[] = "ReceiverWndClass";
  WNDCLASSEX wincl;
  wincl.hInstance = hInstance;
  wincl.lpszClassName = className;
  wincl.lpfnWndProc = WndProcReceiver;
  wincl.style = NULL;
  wincl.cbSize = sizeof(WNDCLASSEX);
  wincl.hIcon = NULL;
  wincl.hIconSm = NULL;
  wincl.hCursor = NULL;
  wincl.lpszMenuName = NULL;
  wincl.cbClsExtra = 0;
  wincl.cbWndExtra = 0;
  wincl.hbrBackground = NULL;
  RegisterClassEx(&wincl);

  CreateWindow(className, "ReceiverWnd", NULL, NULL, NULL, NULL, NULL, NULL,
               NULL, hInstance, NULL);
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                   LPSTR lpCmdLine, int nShowCmd) {
  initRPC();
  StartReceiverWindow(hInstance);

  MSG messages = {0};
  char receiveBuffer[4096] = {0};
  while (messages.message != WM_QUIT) {
    if (GetMessage(&messages, NULL, 0, 0) > 0) {
      TranslateMessage(&messages);
      DispatchMessage(&messages);
    }
  }

  return messages.wParam;
}
