#include <iostream>
#include <map>
#include <queue>
#include <stdlib.h>
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
  char hexBuffer[2048] = {0};
  for (int i = 0; i < command.originalSize; i++) {
    sprintf(&hexBuffer[i * 2], "%02X", ((char *)command.originalBuffer)[i]);
  }

  char msgBuffer[4096] = {0};
  sprintf(msgBuffer, "Invalid command %d with %d params: %s", command.type,
          command.nParams, hexBuffer);
  MessageBoxEx(NULL, msgBuffer, "Error", MB_OK, NULL);
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
    SendMessage(handles[hwndI], WM_SETFONT, (WPARAM)defaultFont,
                MAKELPARAM(TRUE, 0));
    break;

  case Cmd_DestroyWindow:
    DestroyWindow(handles[hwndI]);
    break;

  case Cmd_SetWindowText:
    SetWindowText(handles[hwndI], command.params[1].dt_string.value);
    break;

  case Cmd_GetWindowText: {
    const int strLength = 1024;
    char textBuff[strLength];
    GetWindowText(handles[hwndI], textBuff, strLength);

    CommandResponseLong cmdMsg = {command.params[1].dt_uint.value, strLength};
    RemoteResponse msg = {Res_CmdOutputLong};
    msg.data.cmdLong = cmdMsg;

    char finalBuff[strLength + sizeof(CommandResponseLong) + 4];
    memcpy(finalBuff, &msg, sizeof(CommandResponseLong) + 4);
    memcpy(finalBuff + sizeof(CommandResponseLong) + 4, textBuff, strLength);
    SendData(finalBuff, strLength + sizeof(CommandResponseLong) + 4);
    break;
  }

  case Cmd_ExtractIcon: {
    HICON handle = ExtractIcon(NULL, command.params[1].dt_string.value,
                               command.params[2].dt_uint.value);
    CommandResponseHandle cmdMsg = {hwndI, (unsigned int)handle};
    RemoteResponse msg = {Res_CmdOutputHandle};
    msg.data.cmdHandle = cmdMsg;
    SendData((char *)(&msg), 12);
    break;
  }

  case Cmd_DestroyIcon:
    DestroyIcon((HICON)hwndI);
    break;

  case Cmd_SendMessage: {
    LRESULT result = SendMessage(
        handles[hwndI], command.params[1].dt_uint.value,
        command.params[2].dt_uint.value, command.params[3].dt_int.value);
    CommandResponseHandle cmdMsg = {command.params[4].dt_uint.value, result};
    RemoteResponse msg = {Res_CmdOutputHandle};
    msg.data.cmdHandle = cmdMsg;
    SendData((char *)(&msg), 12);
    break;
  }

  case Cmd_SetWindowLong:
    SetWindowLong(handles[hwndI], command.params[1].dt_int.value,
                  command.params[2].dt_uint.value);
    break;

  case Cmd_GetWindowLong: {
    LONG result = GetWindowLong(handles[hwndI], command.params[1].dt_int.value);
    CommandResponseHandle cmdMsg = {command.params[2].dt_uint.value, result};
    RemoteResponse msg = {Res_CmdOutputHandle};
    msg.data.cmdHandle = cmdMsg;
    SendData((char *)(&msg), 12);
    break;
  }

  case Cmd_CreateFont: {
    NONCLIENTMETRICS metrics;
    metrics.cbSize = sizeof(NONCLIENTMETRICS);
    SystemParametersInfo(SPI_GETNONCLIENTMETRICS, sizeof(NONCLIENTMETRICS),
                         &metrics, 0);
    metrics.lfMessageFont.lfWidth = command.params[1].dt_int.value;
    metrics.lfMessageFont.lfHeight = command.params[2].dt_int.value;
    metrics.lfMessageFont.lfWeight = command.params[3].dt_int.value;
    metrics.lfMessageFont.lfItalic = command.params[4].dt_int.value;
    metrics.lfMessageFont.lfUnderline = command.params[5].dt_int.value;
    metrics.lfMessageFont.lfStrikeOut = command.params[6].dt_int.value;
    if (command.nParams >= 7) {
      strncpy(metrics.lfMessageFont.lfFaceName,
              command.params[7].dt_string.value, 32);
    }
    HFONT handle = CreateFontIndirect(&metrics.lfMessageFont);

    CommandResponseHandle cmdMsg = {hwndI, (unsigned int)handle};
    RemoteResponse msg = {Res_CmdOutputHandle};
    msg.data.cmdHandle = cmdMsg;
    SendData((char *)(&msg), 12);
    break;
  }

  case Cmd_DeleteObject:
    DeleteObject((HICON)hwndI);
    break;

  case Cmd_ShowWindow:
    ShowWindow(handles[hwndI], command.params[1].dt_int.value);
    break;

  default:
    InvalidCommandError(command);
    break;
  }

  deallocRemoteCommand(command);
}

void processRemoteCommand(RemoteCommand &command) {
  switch (command.type) {
  case Cmd_SetCursorPos:
    SetCursorPos(command.params[0].dt_uint.value,
                 command.params[1].dt_uint.value);
    break;
  case Cmd_MouseEvent:
    mouse_event(command.params[0].dt_uint.value, 0, 0, NULL, NULL);
    break;
  case Cmd_Ping: {
    RemoteResponse msg = {Res_Ping, 0};
    SendData((char *)&msg, 8);
    break;
  }
  default: {
    RemoteCommand copy = command.heapCopy();

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
      RemoteCommand cmd = parseRemoteCommand(buffer, readt);
      processRemoteCommand(cmd);
    }
  }
  return 0;
}

LRESULT CALLBACK wndProc(HWND hwnd, UINT message, WPARAM wParam,
                         LPARAM lParam) {
  unsigned long hwndId = (unsigned long)hwnd;
  for (std::map<int, HWND>::iterator iter = handles.begin();
       iter != handles.end(); iter++) {
    if (iter->second == hwnd)
      hwndId = iter->first;
  }

  WindowMessageResponse wndMsg = {hwndId, message, wParam, lParam};
  RemoteResponse msg = {Res_WinProc};
  msg.data.wndProc = wndMsg;
  SendData((char *)&msg, 20);

  switch (message) {
  case WM_CLOSE:
    return 0;
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
  wincl.hbrBackground = (HBRUSH)COLOR_WINDOW;

  return RegisterClassEx(&wincl);
}

char szClassName[] = "WindowsApp";

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                   LPSTR lpCmdLine, int nShowCmd) {
  InitializeCriticalSection(&commandsQueueMutex);
  HANDLE msgHandlerThread =
      CreateThread(NULL, 0, ReceiverThreadFunc, NULL, 0, NULL);

  NONCLIENTMETRICS metrics;
  metrics.cbSize = sizeof(NONCLIENTMETRICS);
  SystemParametersInfo(SPI_GETNONCLIENTMETRICS, sizeof(NONCLIENTMETRICS),
                       &metrics, 0);
  defaultFont = CreateFontIndirect(&metrics.lfMessageFont);

  RegisterWindowClass(hInstance, szClassName);

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
