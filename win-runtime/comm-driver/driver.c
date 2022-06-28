#include "basedef.h"
#include "vmm.h"
#include "vpicd.h"
#include "shell.h"

typedef struct DIOCParams {
  DWORD Internal1;  // ptr to client regs
  DWORD VMHandle;   // VM handle
  DWORD Internal2;  // DDB
  DWORD dwIoControlCode;
  DWORD lpvInBuffer;
  DWORD cbInBuffer;
  DWORD lpvOutBuffer;
  DWORD cbOutBuffer;
  DWORD lpcbBytesReturned;
  DWORD lpoOverlapped;
  DWORD hDevice;
  DWORD tagProcess;
} DIOCPARAMETERS;
typedef DIOCPARAMETERS* LPDIOC;

#define BSF_POSTMESSAGE 0x00000010
#define BSF_FORCEIFHUNG 0x00000020
#define WM_DEVICECHANGE 0x0219

const unsigned short COMM_PORT_IRQ = 5;

static HVM m_SysVmHandle;
static VID irqDesc = {0};
static DWORD irqHandle;

static unsigned long handle = 0;

static char buf[32] = {0};
char* itoa(int val, int base) {
  int i = 30;
  for (; val && i; --i, val /= base) buf[i] = "0123456789abcdef"[val % base];
  return &buf[i + 1];
}

struct SHEXPACKETWithFile {
  SHEXPACKET info;
  char exeName[32];
} SHEXPACKETWithFile;

const char* exeName = "notepad.exe";

void ShellOpen() {
  int i;
  struct SHEXPACKETWithFile packet = {0};
  struct SHEXPACKETWithFile* packetPtr = &packet;

  packet.info.dwTotalSize = sizeof(SHEXPACKETWithFile);
  packet.info.dwSize = sizeof(SHEXPACKET);
  packet.info.ibOp = 0;
  packet.info.ibFile = sizeof(SHEXPACKET);
  packet.info.ibParams = 0;
  packet.info.ibDir = 0;
  packet.info.dwReserved = 0;
  packet.info.nCmdShow = 1;
  for (i = 0; i < 11; i++) {
    packet.exeName[i] = exeName[i];
  }

  _asm push packetPtr;
  VxDCall(_SHELL_ShellExecute);
  _asm add esp, 4;
}

void _cdecl AppyCallback(DWORD data) {
  SHELL_BroadcastSystemMessage(BSF_POSTMESSAGE | BSF_FORCEIFHUNG, NULL, WM_DEVICECHANGE, 0, 0);
}

void IntProc() {
  SHELL_CallAtAppyTime(AppyCallback, 0, 0, 0);

  // SHELL_SYSMODAL_Message(m_SysVmHandle, 0, itoa(handle, 16), "JSComm");
  // SHELL_SYSMODAL_Message(m_SysVmHandle, 0, "Received", "JSComm");
  VPICD_Phys_EOI(irqHandle);
}

BOOL _cdecl JSComm_DeviceInit() {
  m_SysVmHandle = Get_Sys_VM_Handle();

  irqDesc.VID_IRQ_Number = COMM_PORT_IRQ;
  irqDesc.VID_Hw_Int_Proc = IntProc;
  irqDesc.VID_Options = VPICD_OPT_SHARE_PMODE_ONLY;
  irqHandle = VPICD_Virtualize_IRQ(&irqDesc);
  VPICD_Phys_EOI(irqHandle);
  VPICD_Physically_Unmask(irqHandle);

  // SHELL_SYSMODAL_Message(m_SysVmHandle, 0, "Loaded", "JSComm");

  return 1;
}

DWORD _stdcall JSComm_DeviceIOControl(DWORD dwService, DWORD dwDDB,
                                      DWORD hDevice, LPDIOC lpDIOCParms) {
  DWORD dwRetVal = 0;

  if (lpDIOCParms->dwIoControlCode == 1) {
    handle = *((unsigned long*)lpDIOCParms->lpvInBuffer);
  }

  return (dwRetVal);
}
