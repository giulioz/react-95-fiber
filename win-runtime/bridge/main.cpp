#include <iostream>
#include <map>
#include <queue>
#include <string>
#include <vector>
#include <windows.h>

#include "RemoteCommand.h"
#include "SerialComm.h"

HFONT defaultFont;
std::map<int, HWND> handles;

bool running = true;
CRITICAL_SECTION commandsQueueMutex;
std::queue<RemoteCommand> commandsQueue;

void InvalidCommandError(RemoteCommand &command) {
  char buffer[512] = {0};
  sprintf(buffer, "Invalid command: %d", command.type);
  MessageBoxEx(NULL, buffer, "Error", MB_OK, NULL);
}

void spoolRemoteCommandUI() {
  EnterCriticalSection(&commandsQueueMutex);
  if (commandsQueue.empty()) {
    LeaveCriticalSection(&commandsQueueMutex);
    return;
  }
  RemoteCommand command = commandsQueue.front();
  commandsQueue.pop();
  LeaveCriticalSection(&commandsQueueMutex);

  unsigned int hwndI = command.params[0].dt_uint.value;
  switch (command.type) {
  case Cmd_SetWindowPos:
    SetWindowPos(handles[hwndI], NULL, command.params[1].dt_int.value,
                 command.params[2].dt_int.value, command.params[3].dt_int.value,
                 command.params[4].dt_int.value, SWP_NOZORDER);
    break;
  case Cmd_CreateWindow:

    handles[hwndI] = CreateWindowEx(
        command.params[1].dt_uint.value, command.params[2].dt_string.value,
        command.params[3].dt_string.value, command.params[4].dt_uint.value,
        command.params[5].dt_int.value, command.params[6].dt_int.value,
        command.params[7].dt_int.value, command.params[8].dt_int.value,
        handles[command.params[9].dt_uint.value],
        (HMENU)command.params[10].dt_uint.value, NULL, NULL);
    SendMessage(handles[hwndI], WM_SETFONT, WPARAM(defaultFont), TRUE);
    break;
  case Cmd_DestroyWindow:
    DestroyWindow(handles[hwndI]);
    break;
  case Cmd_SetWindowText:
    SetWindowText(handles[hwndI], command.params[1].dt_string.value);
    break;
  default:
    InvalidCommandError(command);
    break;
  }

  deallocRemoteCommand(command);
}

void processRemoteCommand(RemoteCommand &command, char *buffer,
                          unsigned int size) {
  switch (command.type) {
  case Cmd_SetCursorPos:
    SetCursorPos(command.params[0].dt_uint.value,
                 command.params[1].dt_uint.value);
    break;
  case Cmd_MouseEvent:
    mouse_event(command.params[0].dt_uint.value, 0, 0, NULL, NULL);
    break;
  case Cmd_Ping: {
    RemoteResponse msg = {Res_PingResponse, 0};
    SendData((char *)&msg, 8);
    break;
  }
  default: {
    RemoteCommand copy = command.heapCopy(size);

    EnterCriticalSection(&commandsQueueMutex);
    commandsQueue.push(copy);
    LeaveCriticalSection(&commandsQueueMutex);
    break;
  }
  }
}

DWORD WINAPI ReceiverThreadFunc(void *data) {
  while (running) {
    char buffer[4096] = {0};
    unsigned long readt = RecieveData(buffer);
    if (readt >= sizeof(RemoteCommandHeader)) {
      RemoteCommand cmd = parseRemoteCommand(buffer);
      processRemoteCommand(cmd, buffer, readt);
    }
  }
  return 0;
}

LRESULT CALLBACK wndProc(HWND hwnd, UINT message, WPARAM wParam,
                         LPARAM lParam) {
  WindowMessageResponse wndMsg = {message, wParam, lParam};
  RemoteResponse msg = {Res_WinProc};
  msg.data.wndProc = wndMsg;
  SendData((char *)&msg, 16);

  switch (message) {
    // case WM_DESTROY:
    //   PostQuitMessage(0);
    //   return 0;

  default:
    return DefWindowProc(hwnd, message, wParam, lParam);
  }

  return 0;
}

int RegisterWindowClass(HINSTANCE hInstance, char *className) {
  WNDCLASSEX wincl;

  wincl.hInstance = hInstance;
  wincl.lpszClassName = className;
  wincl.lpfnWndProc = wndProc;
  wincl.style = CS_DBLCLKS;
  wincl.cbSize = sizeof(WNDCLASSEX);

  /* Use default icon and mouse-pointer */
  wincl.hIcon = LoadIcon(NULL, IDI_APPLICATION);
  wincl.hIconSm = LoadIcon(NULL, IDI_APPLICATION);
  wincl.hCursor = LoadCursor(NULL, IDC_ARROW);
  wincl.lpszMenuName = NULL; /* No menu */
  wincl.cbClsExtra = 0;      /* No extra bytes after the window class */
  wincl.cbWndExtra = 0;      /* structure or the window instance */
  /* Use Windows's default color as the background of the window */
  wincl.hbrBackground = (HBRUSH)COLOR_BACKGROUND;

  return RegisterClassEx(&wincl);
}

char szClassName[] = "WindowsApp";

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                   LPSTR lpCmdLine, int nShowCmd) {
  InitializeCriticalSection(&commandsQueueMutex);
  HANDLE msgHandlerThread =
      CreateThread(NULL, 0, ReceiverThreadFunc, NULL, 0, NULL);

  defaultFont = (HFONT)GetStockObject(DEFAULT_GUI_FONT);

  RegisterWindowClass(hInstance, szClassName);

  HWND hwnd =
      CreateWindowEx(0,             /* Extended possibilites for variation */
                     szClassName,   /* Classname */
                     "Windows App", /* Title Text */
                     WS_VISIBLE | WS_OVERLAPPEDWINDOW, /* default window */
                     CW_USEDEFAULT, /* Windows decides the position */
                     CW_USEDEFAULT, /* where the window ends up on the screen */
                     544,           /* The programs width */
                     375,           /* and height in pixels */
                     HWND_DESKTOP, /* The window is a child-window to desktop */
                     NULL,         /* No menu */
                     hInstance,    /* Program Instance handler */
                     NULL          /* No Window Creation data */
      );
  handles[0] = hwnd;

  defaultFont = (HFONT)GetStockObject(DEFAULT_GUI_FONT);

  // ShowWindow(hwnd, nShowCmd);

  MSG messages = {0};
  while (messages.message != WM_QUIT) {
    if (PeekMessage(&messages, NULL, 0, 0, PM_REMOVE) > 0) {
      TranslateMessage(&messages);
      DispatchMessage(&messages);
    }

    spoolRemoteCommandUI();
  }

  running = false;
  WaitForSingleObject(msgHandlerThread, INFINITE);
  DeleteCriticalSection(&commandsQueueMutex);

  return messages.wParam;
}
