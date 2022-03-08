#ifndef REMOTECOMMAND_H
#define REMOTECOMMAND_H

#include <windows.h>

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

RemoteCommand parseRemoteCommand(char *buffer);

#endif
