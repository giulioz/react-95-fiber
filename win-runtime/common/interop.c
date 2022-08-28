#include <interop.h>
#include <string.h>

RpcBuffer rpcBuffer = {0};

void InitRPC(unsigned long hInstance,
             unsigned long (*ProcessCallback)(unsigned long hwnd,
                                              unsigned long message,
                                              unsigned long wParam,
                                              unsigned long lParam)) {
  memset(&rpcBuffer, 0, sizeof(RpcBuffer));
  rpcBuffer.returnValue = ProcessCallback;
  rpcBuffer.callPtr = hInstance;
  JsCall(RPC_HOST_SETUP, &rpcBuffer, 0);
}

void SignalReturn() {
  _asm mov ax, RPC_HOST_RETURN;
  _asm mov dx, 0x504;
  _asm out dx, ax;
}

void SignalCallback() {
  _asm mov ax, RPC_HOST_CALLBACK;
  _asm mov dx, 0x504;
  _asm out dx, ax;
}

void Signal(RpcAdapterCommand_HOST signal) {
  unsigned short signalShort = (unsigned short)signal;
  _asm mov ax, signalShort;
  _asm mov dx, 0x504;
  _asm out dx, ax;
}

int(__stdcall *tempFn)() = NULL;
void ExecuteLibFunction() {
  tempFn = (int(__stdcall *)())rpcBuffer.callPtr;
  _asm {
      xor     ecx, ecx
    loopStart:
      cmp     ecx, DWORD PTR rpcBuffer+12
      jae     SHORT loopEnd
      mov     eax, DWORD PTR rpcBuffer[ecx+16]
      push    eax
      add     ecx, 4
      jmp     SHORT loopStart
    loopEnd:
  }

  rpcBuffer.returnValue = tempFn();
  SignalReturn();
}

unsigned long JsEval(char *strPtr) {
  int length = strlen(strPtr);
  return JsCall(RPC_HOST_EVAL, strPtr, length);
}

unsigned long JsCall(unsigned short interfaceId, void *dataPtr,
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
