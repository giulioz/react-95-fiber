#include <iostream>
#include <map>
#include <string>
#include <vector>
#include <windows.h>

#include "SerialComm.h"

LRESULT CALLBACK WindowProcedure(HWND, UINT, WPARAM, LPARAM);

HFONT defaultFont;
char szClassName[] = "WindowsApp";

std::map<int, HWND> handles;

enum DataType {
  Null = 0,
  Int = 1,
  UInt = 2,
  Float = 3,
  String = 4,
};

struct DataItemUint {
  DataType type;
  unsigned int value;
};

struct DataItemInt {
  DataType type;
  int value;
};

struct DataItemFloat {
  DataType type;
  float value;
};

struct DataItemString {
  DataType type;
  char *value;
};

union DataItem {
  DataType type;
  DataItemUint dt_uint;
  DataItemInt dt_int;
  DataItemFloat dt_float;
  DataItemString dt_string;
};

enum CommandType {
  Cmd_Invalid = 0,
  Cmd_SetCursorPos = 1,
  Cmd_MouseEvent = 2,
  Cmd_SetWindowPos = 3,
  Cmd_CreateWindow = 4,
  Cmd_DestroyWindow = 5,
  Cmd_SetWindowText = 6,
  Cmd_MessageBoxEx = 7,
  Cmd_Ping = 8,
};

struct RemoteCommand {
  CommandType type;
  unsigned int nParams;
  DataItem *params;
  RemoteCommand() : type(Cmd_Invalid), nParams(0), params(NULL) {}
  RemoteCommand(CommandType type, unsigned int nParams, DataItem *params)
      : type(type), nParams(nParams), params(params) {}
};

struct RemoteCommandHeader {
  unsigned int magic; // 0xC0AD
  CommandType type;
  unsigned int nParams;
};

enum ResponseType {
  Res_Invalid = 0,
  Res_PingResponse = 1,
  Res_WinProc = 2,
};

struct WindowMessageResponse {
  UINT message;
  WPARAM wParam;
  LPARAM lParam;
};

union RemoteResponseData {
  unsigned int none;
  WindowMessageResponse wndProc;
};

struct RemoteResponse {
  ResponseType type;
  RemoteResponseData data;
};

RemoteCommand parseRemoteCommand(char *buffer) {
  RemoteCommandHeader header = *(RemoteCommandHeader *)buffer;
  if (header.magic != 0xC0AD) {
    return RemoteCommand();
  }
  DataItem *params = (DataItem *)(buffer + sizeof(RemoteCommandHeader));
  for (size_t i = 0; i < header.nParams; i++) {
    if (params[i].type == String) {
      // Relocate strings
      params[i].dt_string.value = buffer + params[i].dt_uint.value;
    }
  }
  return RemoteCommand(header.type, header.nParams, params);
}

void InvalidCommandError(HWND hwnd, RemoteCommand command) {
  char buffer[512] = {0};
  sprintf(buffer, "Invalid command: %d", command.type);
  MessageBoxEx(hwnd, buffer, "Error", MB_OK, NULL);
}

void runRemoteCommand(HWND hwnd, RemoteCommand command) {
  switch (command.type) {
  case Cmd_SetCursorPos:
    SetCursorPos(command.params[0].dt_uint.value,
                 command.params[1].dt_uint.value);
    break;
  case Cmd_MouseEvent:
    mouse_event(command.params[0].dt_uint.value, 0, 0, NULL, NULL);
    break;
  case Cmd_SetWindowPos:
    SetWindowPos(handles[command.params[0].dt_uint.value], NULL,
                 command.params[1].dt_int.value, command.params[2].dt_int.value,
                 command.params[3].dt_int.value, command.params[4].dt_int.value,
                 SWP_NOZORDER);
    break;
  case Cmd_CreateWindow:
    handles[command.params[0].dt_uint.value] = CreateWindowEx(
        command.params[1].dt_uint.value, command.params[2].dt_string.value,
        command.params[3].dt_string.value, command.params[4].dt_uint.value,
        command.params[5].dt_int.value, command.params[6].dt_int.value,
        command.params[7].dt_int.value, command.params[8].dt_int.value,
        handles[command.params[9].dt_uint.value],
        (HMENU)command.params[10].dt_uint.value, NULL, NULL);
    SendMessage(handles[command.params[0].dt_uint.value], WM_SETFONT,
                WPARAM(defaultFont), TRUE);
    break;
  case Cmd_DestroyWindow:
    DestroyWindow(handles[command.params[0].dt_uint.value]);
    break;
  case Cmd_SetWindowText:
    SetWindowText(handles[command.params[0].dt_uint.value],
                  command.params[1].dt_string.value);
    break;
  case Cmd_Ping: {
    RemoteResponse msg = {Res_PingResponse, 0};
    SendData((char *)&msg, 8);
    break;
  }
  default:
    InvalidCommandError(hwnd, command);
    break;
  }
}

int WINAPI WinMain(HINSTANCE hThisInstance, HINSTANCE hPrevInstance,
                   LPSTR lpszArgument, int nFunsterStil) {
  HWND hwnd;        /* This is the handle for our window */
  MSG messages;     /* Here messages to the application are saved */
  WNDCLASSEX wincl; /* Data structure for the windowclass */

  /* The Window structure */
  wincl.hInstance = hThisInstance;
  wincl.lpszClassName = szClassName;
  wincl.lpfnWndProc = WindowProcedure; /* This function is called by windows */
  wincl.style = CS_DBLCLKS;            /* Catch double-clicks */
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

  if (!RegisterClassEx(&wincl))
    return 0;

  hwnd =
      CreateWindowEx(0,             /* Extended possibilites for variation */
                     szClassName,   /* Classname */
                     "Windows App", /* Title Text */
                     WS_OVERLAPPEDWINDOW, /* default window */
                     CW_USEDEFAULT,       /* Windows decides the position */
                     CW_USEDEFAULT, /* where the window ends up on the screen */
                     544,           /* The programs width */
                     375,           /* and height in pixels */
                     HWND_DESKTOP, /* The window is a child-window to desktop */
                     NULL,         /* No menu */
                     hThisInstance, /* Program Instance handler */
                     NULL           /* No Window Creation data */
      );
  handles[0] = hwnd;

  defaultFont = (HFONT)GetStockObject(DEFAULT_GUI_FONT);

  ShowWindow(hwnd, nFunsterStil);

  while (messages.message != WM_QUIT) {
    if (PeekMessage(&messages, NULL, 0, 0, PM_REMOVE) > 0) {
      TranslateMessage(&messages);
      DispatchMessage(&messages);
    }

    char buffer[4096] = {0};
    unsigned long readt = RecieveData(buffer);
    if (readt >= sizeof(RemoteCommandHeader)) {
      RemoteCommand cmd = parseRemoteCommand(buffer);
      runRemoteCommand(hwnd, cmd);
    }
  }

  return messages.wParam;
}

LRESULT CALLBACK WindowProcedure(HWND hwnd, UINT message, WPARAM wParam,
                                 LPARAM lParam) {
  WindowMessageResponse wndMsg = {message, wParam, lParam};
  RemoteResponse msg = {Res_WinProc};
  msg.data.wndProc = wndMsg;
  SendData((char *)&msg, 16);

  switch (message) {
  case WM_DESTROY:
    PostQuitMessage(0);
    return 0;

  default:
    return DefWindowProc(hwnd, message, wParam, lParam);
  }

  return 0;
}
