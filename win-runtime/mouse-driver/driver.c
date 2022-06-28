#include "basedef.h"
#include "vmm.h"
#include "vpicd.h"
#include "wrapper.h"

const unsigned short MOUSE_PORT_EVT = 0x508;
const unsigned short MOUSE_PORT_POS = 0x512;
const unsigned short MOUSE_PORT_IRQ = 12;

enum MouseCommandType {
  MouseCmd_Nothing = 0,
  MouseCmd_LeftDown = 1,
  MouseCmd_LeftUp = 2,
  MouseCmd_RightDown = 3,
  MouseCmd_RightUp = 4,
  MouseCmd_MiddleDown = 5,
  MouseCmd_MiddleUp = 6,
  MouseCmd_Wheel = 7,
};

static HVM m_SysVmHandle;
static VID irqDesc = {0};
static DWORD irqHandle;
static BYTE mouseState = 0;

void IntProc() {
  // Handle mouse pos
  unsigned long posPortValue = inpd(MOUSE_PORT_POS);
  int posX = posPortValue & 0x0000FFFF;
  int posY = (posPortValue & 0xFFFF0000) >> 16;

  // Handle mouse events
  unsigned long eventPortValue = inpd(MOUSE_PORT_EVT);
  unsigned char cmd = eventPortValue & 0x000000FF;
  int param = eventPortValue >> 8;

  switch (cmd) {
    case MouseCmd_LeftDown:
      mouseState |= BUTTON_LEFT;
      break;
    case MouseCmd_LeftUp:
      mouseState &= ~BUTTON_LEFT;
      break;
    case MouseCmd_RightDown:
      mouseState |= BUTTON_RIGHT;
      break;
    case MouseCmd_RightUp:
      mouseState &= ~BUTTON_RIGHT;
      break;
    case MouseCmd_MiddleDown:
      mouseState |= BUTTON_MIDDLE;
      break;
    case MouseCmd_MiddleUp:
      mouseState &= ~BUTTON_MIDDLE;
      break;
    case MouseCmd_Wheel:
      // mouseState = BUTTON_WHEEL;
      break;

    default:
      break;
  }

  Post_Absolute_Pointer_Message(posX, posY, mouseState);

  VPICD_Phys_EOI(irqHandle);
}

BOOL _cdecl JSMouse_DeviceInit() {
  Mouse_Instance *instance;

  m_SysVmHandle = Get_Sys_VM_Handle();
  instance = Get_Mouse_Data();

  instance->MI_Flags &= ~MIF_BadDevNode;
  instance->MI_Flags |= MIF_Detected;
  instance->MI_MouseType = VMD_Type_PS2;
  Set_Mouse_Data(instance);

  irqDesc.VID_IRQ_Number = MOUSE_PORT_IRQ;
  irqDesc.VID_Hw_Int_Proc = IntProc;
  irqDesc.VID_Options = VPICD_OPT_SHARE_PMODE_ONLY;
  irqHandle = VPICD_Virtualize_IRQ(&irqDesc);
  VPICD_Phys_EOI(irqHandle);
  VPICD_Physically_Unmask(irqHandle);

  return 1;
}

BOOL _cdecl JSMouse_DeviceExit() {
  m_SysVmHandle = 0;
  return 1;
}

// BOOL _cdecl JSMouse_DeviceIOControl() {
//   return 1;
// }
