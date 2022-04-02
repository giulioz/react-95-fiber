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
};

struct RemoteCommand {
  void *originalBuffer;
  unsigned int originalSize;
  CommandType type;
  unsigned int nParams;
  DataItem *params;
  RemoteCommand()
      : originalBuffer(NULL), originalSize(0), type(Cmd_Invalid), nParams(0),
        params(NULL) {}
  RemoteCommand(void *originalBuffer, unsigned int originalSize,
                CommandType type, unsigned int nParams, DataItem *params)
      : originalBuffer(originalBuffer), originalSize(originalSize), type(type),
        nParams(nParams), params(params) {}
  RemoteCommand heapCopy();
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
  Res_CmdOutput = 3,
};

struct WindowMessageResponse {
  UINT message;
  WPARAM wParam;
  LPARAM lParam;
};

struct CommandResponse {
  unsigned int seq;
  unsigned int dataLength;
};

union RemoteResponseData {
  unsigned int none;
  WindowMessageResponse wndProc;
  CommandResponse cmd;
};

struct RemoteResponse {
  ResponseType type;
  RemoteResponseData data;
};

RemoteCommand parseRemoteCommand(char *buffer, unsigned int size);
void deallocRemoteCommand(RemoteCommand &command);

#endif
