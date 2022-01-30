#include <iostream>
#include <map>
#include <string>
#include <vector>
#include <windows.h>

#include "SerialComm.h"

LRESULT CALLBACK WindowProcedure(HWND, UINT, WPARAM, LPARAM);

char szClassName[] = "WindowsApp";
const char *readyMsg = "READY\r";

std::map<int, HWND> handles;

std::vector<std::string> split(std::string s, std::string delimiter) {
  size_t pos_start = 0, pos_end, delim_len = delimiter.length();
  std::string token;
  std::vector<std::string> res;

  while ((pos_end = s.find(delimiter, pos_start)) != std::string::npos) {
    token = s.substr(pos_start, pos_end - pos_start);
    pos_start = pos_end + delim_len;
    res.push_back(token);
  }

  res.push_back(s.substr(pos_start));
  return res;
}

void runRemoteCommand(HWND hwnd, char *buffer) {
  // MessageBoxEx(hwnd, buffer, "Incoming Message", MB_OK, NULL);
  std::string str = buffer;
  std::vector<std::string> params = split(str, "|");

  if (params[0] == "mp") {
    SetCursorPos(atoi(params[1].c_str()), atoi(params[2].c_str()));
  } else if (params[0] == "me") {
    mouse_event(atoi(params[1].c_str()), 0, 0, NULL, NULL);
  } else if (params[0] == "setWSize") {
    SetWindowPos(handles[atoi(params[1].c_str())], NULL,
                 atoi(params[2].c_str()), atoi(params[3].c_str()),
                 atoi(params[4].c_str()), atoi(params[6].c_str()),
                 SWP_NOZORDER);
  } else if (params[0] == "addChildW") {
    handles[atoi(params[1].c_str())] = CreateWindow(
        params[2].c_str(), params[3].c_str(), WS_VISIBLE | WS_CHILD,
        atoi(params[4].c_str()), atoi(params[5].c_str()),
        atoi(params[6].c_str()), atoi(params[7].c_str()), hwnd,
        (HMENU)atoi(params[8].c_str()), NULL, NULL);
  } else if (params[0] == "setWText") {
    SetWindowText(handles[atoi(params[1].c_str())], params[2].c_str());
  } else {
    MessageBoxEx(hwnd, ("Invalid Command! " + str).c_str(), "Info", MB_OK,
                 NULL);
  }
}

int WINAPI WinMain(HINSTANCE hThisInstance, HINSTANCE hPrevInstance,
                   LPSTR lpszArgument, int nFunsterStil)

{
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

  SetupSerialPort(hwnd);

  ShowWindow(hwnd, nFunsterStil);

  SendData(readyMsg, std::strlen(readyMsg));

  while (messages.message != WM_QUIT) {
    if (PeekMessage(&messages, NULL, 0, 0, PM_REMOVE) > 0) {
      TranslateMessage(&messages);
      DispatchMessage(&messages);
    }

    char buffer[4096] = {0};
    unsigned long readt = RecieveData(buffer);
    if (readt > 0) {
      runRemoteCommand(hwnd, buffer);
    }
  }

  return messages.wParam;
}

LRESULT CALLBACK WindowProcedure(HWND hwnd, UINT message, WPARAM wParam,
                                 LPARAM lParam) {
  char buffer[256] = {0};

  switch (message) {
  case WM_DESTROY:
    CloseSerialPort();
    PostQuitMessage(0);
    return 0;

  case WM_COMMAND:
    itoa(LOWORD(wParam), buffer, 10);
    std::strcat(buffer, "\r");
    SendData(buffer, std::strlen(buffer));
    break;

  default:
    return DefWindowProc(hwnd, message, wParam, lParam);
  }

  return 0;
}
