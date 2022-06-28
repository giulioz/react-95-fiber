#ifndef INTEROP_H
#define INTEROP_H

#ifdef __cplusplus
extern "C" {
#endif

typedef enum RpcAdapterCommand_GUEST {
  RPC_CMD_LOADLIBRARY = 1,
  RPC_CMD_GETPROCADDRESS = 2,
  RPC_CMD_CALL = 3,
} RpcAdapterCommand_GUEST;

typedef enum RpcAdapterCommand_HOST {
  RPC_HOST_EVAL = 0,
  RPC_HOST_SETUP = 1,
  RPC_HOST_RETURN = 2,
} RpcAdapterCommand_HOST;

typedef struct RpcBuffer {
  RpcAdapterCommand_GUEST command;
  unsigned long returnValue;
  unsigned long callPtr;
  unsigned long stackSize;
  char params[256];
} RpcBuffer;

extern RpcBuffer rpcBuffer;

void initRPC();
void signalReturn();

unsigned long jsEval(char *strPtr);
unsigned long jsCall(unsigned short interfaceId, void *dataPtr,
                     unsigned long dataSize);

#ifdef __cplusplus
}
#endif

#endif
