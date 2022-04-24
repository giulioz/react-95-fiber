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
  Res_Ping = 1,
  Res_WinProc = 2,
  Res_CmdOutputHandle = 3,
  Res_CmdOutputLong = 4,
};

struct WindowMessageResponse {
  UINT hwndId;
  UINT message;
  WPARAM wParam;
  LPARAM lParam;
};

struct CommandResponseHandle {
  unsigned int seq;
  unsigned int handle;
};

struct CommandResponseLong {
  unsigned int seq;
  unsigned int dataLength;
};

union RemoteResponseData {
  unsigned int none;
  WindowMessageResponse wndProc;
  CommandResponseHandle cmdHandle;
  CommandResponseLong cmdLong;
};

struct RemoteResponse {
  ResponseType type;
  RemoteResponseData data;
};

RemoteCommand parseRemoteCommand(char *buffer, unsigned int size);

#endif
