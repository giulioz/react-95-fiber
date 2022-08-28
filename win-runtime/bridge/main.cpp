#include <interop.h>
#include <stdio.h>
#include <windows.h>

HWND receiverWindow = NULL;

bool callbackFinished = false;
bool onACallback = false;

char msgBuffer[4096] = {0};

LRESULT CALLBACK WndProcReceiver(HWND hwnd, UINT message, WPARAM wParam,
                                 LPARAM lParam) {
  switch (message) {
  case WM_CLOSE:
    return 0;
  case WM_DEVICECHANGE:
    ExecuteLibFunction();
    return 1;
  default:
    return DefWindowProc(hwnd, message, wParam, lParam);
  }
  return 0;
}

char receiverClassName[] = "ReceiverWndClass";
char receiverWndName[] = "ReceiverWnd";
void StartReceiverWindow(HINSTANCE hInstance) {
  WNDCLASSEX wincl;
  wincl.hInstance = hInstance;
  wincl.lpszClassName = receiverClassName;
  wincl.lpfnWndProc = WndProcReceiver;
  wincl.style = NULL;
  wincl.cbSize = sizeof(WNDCLASSEX);
  wincl.hIcon = NULL;
  wincl.hIconSm = NULL;
  wincl.hCursor = NULL;
  wincl.lpszMenuName = NULL;
  wincl.cbClsExtra = 0;
  wincl.cbWndExtra = 0;
  wincl.hbrBackground = 0;
  RegisterClassEx(&wincl);

  receiverWindow = CreateWindow(receiverClassName, receiverWndName, NULL, NULL,
                                NULL, NULL, NULL, NULL, NULL, hInstance, NULL);
}

void ExecRemote() {
  switch (rpcBuffer.command) {
  case RPC_CMD_LOADLIBRARY:
    rpcBuffer.returnValue = (unsigned long)LoadLibrary(rpcBuffer.params);
    SignalReturn();
    break;

  case RPC_CMD_GETPROCADDRESS:
    rpcBuffer.returnValue = (unsigned long)GetProcAddress(
        ((HMODULE *)&rpcBuffer.params)[0], rpcBuffer.params + 4);
    SignalReturn();
    break;

  case RPC_CMD_CALL:
    SendMessage(receiverWindow, WM_DEVICECHANGE, 0, 0);
    break;

  case RPC_CMD_CALL_ASYNC:
    ExecuteLibFunction();
    break;
  }
}

// sprintf(msgBuffer, "rpcBuffer.command: %d", rpcBuffer.command);
// MessageBoxEx(NULL, msgBuffer, "Info", MB_OK, NULL);

unsigned long ProcessCallback(unsigned long hwnd, unsigned long message,
                              unsigned long wParam, unsigned long lParam) {
  onACallback = true;
  callbackFinished = false;
  _asm mov ax, RPC_HOST_CALLBACK;
  _asm mov dx, 0x504;
  _asm out dx, ax;
  while (!callbackFinished) {
    if (rpcBuffer.command == RPC_CMD_END_CALLBACK) {
      callbackFinished = true;
      rpcBuffer.command = RPC_CMD_NOOP;
    }
    if (rpcBuffer.command == RPC_CMD_CALL ||
        rpcBuffer.command == RPC_CMD_CALL_ASYNC) {
      ExecuteLibFunction();
      rpcBuffer.command = RPC_CMD_NOOP;
    }
  }
  onACallback = false;
  return rpcBuffer.returnValue;
}

DWORD WINAPI InterruptCallback() {
  if (!onACallback) {
    ExecRemote();
  }
  return 0;
}

DWORD WINAPI ReceiverThread(LPVOID lpParam) {
  HANDLE hVxD = CreateFile("\\\\.\\jscomm.vxd", 0, 0, 0, 0, 0, 0);
  DeviceIoControl(hVxD, 1, &InterruptCallback, sizeof(void *), NULL, NULL, NULL,
                  NULL);
  InitRPC((unsigned long)lpParam, ProcessCallback);
  while (true) {
    SleepEx(-1, true);
  }
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                   LPSTR lpCmdLine, int nShowCmd) {
  if (FindWindow(receiverClassName, receiverWndName) != NULL) {
    return 1;
  }

  StartReceiverWindow(hInstance);

  HANDLE receiverThread =
      CreateThread(NULL, 0, ReceiverThread, hInstance, 0, 0);

  MSG messages = {0};
  while (messages.message != WM_QUIT) {
    if (GetMessage(&messages, NULL, 0, 0) > 0) {
      TranslateMessage(&messages);
      DispatchMessage(&messages);
    }
  }

  return messages.wParam;
}
