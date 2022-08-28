#ifndef INTEROP_H
#define INTEROP_H

#ifdef __cplusplus
extern "C" {
#endif

typedef enum RpcAdapterCommand_GUEST {
  RPC_CMD_NOOP = 0,
  RPC_CMD_LOADLIBRARY = 1,
  RPC_CMD_GETPROCADDRESS = 2,
  RPC_CMD_CALL = 3,
  RPC_CMD_CALL_ASYNC = 4,
  RPC_CMD_END_CALLBACK = 5,
} RpcAdapterCommand_GUEST;

typedef enum RpcAdapterCommand_HOST {
  RPC_HOST_EVAL = 0,
  RPC_HOST_SETUP = 1,
  RPC_HOST_RETURN = 2,
  RPC_HOST_CALLBACK = 3,
  RPC_HOST_CALL_STUB_OPENGL32 = 4,
} RpcAdapterCommand_HOST;

typedef struct RpcBuffer {
  RpcAdapterCommand_GUEST command;
  unsigned long returnValue;
  unsigned long callPtr;
  unsigned long stackSize;
  char params[4096];
} RpcBuffer;

extern RpcBuffer rpcBuffer;

void InitRPC(unsigned long hInstance,
             unsigned long (*ProcessCallback)(unsigned long hwnd,
                                              unsigned long message,
                                              unsigned long wParam,
                                              unsigned long lParam));
void SignalReturn();
void SignalCallback();
void Signal(RpcAdapterCommand_HOST signal);
void ExecuteLibFunction();

unsigned long JsEval(char *strPtr);
unsigned long JsCall(unsigned short interfaceId, void *dataPtr,
                     unsigned long dataSize);

#ifdef __cplusplus
}
#endif

#endif
