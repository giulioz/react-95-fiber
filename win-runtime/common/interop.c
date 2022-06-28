#include <interop.h>
#include <string.h>

RpcBuffer rpcBuffer = {0};

void initRPC() { jsCall(RPC_HOST_SETUP, &rpcBuffer, 0); }

void signalReturn() {
  _asm mov ax, RPC_HOST_RETURN;
  _asm mov dx, 0x504;
  _asm out dx, ax;
}

unsigned long jsEval(char *strPtr) {
  int length = strlen(strPtr);
  return jsCall(RPC_HOST_EVAL, strPtr, length);
}

unsigned long jsCall(unsigned short interfaceId, void *dataPtr,
                     unsigned long dataSize) {
  unsigned long returnValue;
  _asm mov ebx, dataPtr;
  _asm mov ecx, dataSize;
  _asm mov ax, interfaceId;
  _asm mov dx, 0x504;
  _asm out dx, ax;
  _asm mov returnValue, eax;
  return returnValue;
}
