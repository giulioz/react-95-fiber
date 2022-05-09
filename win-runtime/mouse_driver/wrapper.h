#ifndef WRAPPER_H
#define WRAPPER_H

#include "basedef.h"
#include "vmm.h"

#pragma warning (disable:4003)
#define VMOUSE_Service   Declare_Service

Begin_Service_Table(VMD)
VMOUSE_Service	(VMD_Get_Version, LOCAL)
VMOUSE_Service	(VMD_Set_Mouse_Type, LOCAL)
VMOUSE_Service	(VMD_Get_Mouse_Owner, LOCAL)
VMOUSE_Service	(VMD_Post_Pointer_Message)
VMOUSE_Service	(VMD_Set_Cursor_Proc)
VMOUSE_Service	(VMD_Call_Cursor_Proc)
VMOUSE_Service	(VMD_Set_Mouse_Data)
VMOUSE_Service	(VMD_Get_Mouse_Data)
VMOUSE_Service	(VMD_Manipulate_Pointer_Message)
VMOUSE_Service	(VMD_Set_Middle_Button)
VMOUSE_Service	(VMD_Enable_Disable_Mouse_Events)
VMOUSE_Service	(VMD_Post_Absolute_Pointer_Message)
End_Service_Table(VMD)

typedef struct Mouse_Instance {
  WORD MI_Flags;		// status flags (defined below)
  WORD MI_IO_Base;		// base to read
  BYTE MI_IRQNumber;		// irq#
  BYTE MI_PortNum;		// port number (serial mice ?)
  WORD MI_MouseType;		// type of mouse (defined above)
  DWORD MI_Reference;		// reference data
  DWORD MI_hDevNode;		// dev node being handled
  DWORD MI_hIRQ;		// VPICD's irq handle
  DWORD MI_HWINT;		// hardware int proc
  DWORD MI_Reset;		// Reset routine
  DWORD MI_Disable;		// disable routine
  DWORD MI_Initialize;		// initialization routine
            // It detects and virtualizes hardware.
  DWORD MI_LoadHandle;		// load handle of loaded VxD.
} Mouse_Instance;

#define VMD_Type_Undefined 0
#define VMD_Type_Bus 1
#define VMD_Type_Serial 2
#define VMD_Type_InPort 3
#define VMD_Type_PS2 4
#define VMD_Type_HP 5
#define VMD_Type_Serial_w_port (VMD_Type_Serial || 0x80)
#define VMD_Type_MSeries 6
#define VMD_Type_CSeries 7

// Instance is allocated
#define MIF_Alloc_Bit 0
#define MIF_Alloc 1 << MIF_Alloc_Bit
// Interrupt is active
#define MIF_Active_Bit 1
#define MIF_Active 1 << MIF_Active_Bit
// Device detected
#define MIF_Detected_Bit 2
#define MIF_Detected 1 << MIF_Detected_Bit
// Device not detected
#define MIF_BadDevNode_Bit 3
#define MIF_BadDevNode 1 << MIF_BadDevNode_Bit
// No DevNode for device
#define MIF_NewConfig_Bit 4
#define MIF_NewConfig 1 << MIF_NewConfig_Bit
// Wrong IO in DevNode
#define MIF_BadIO_Bit 5
#define MIF_BadIO 1 << MIF_BadIO_Bit
// Wrong IRQ in DevNode
#define MIF_BadIRQ_Bit 6
#define MIF_BadIRQ 1 << MIF_BadIRQ_Bit
// Do not virtualize IRQ
#define MIF_NoIRQ_Bit 7
#define MIF_NoIRQ 1 << MIF_NoIRQ_Bit
// BUSMOUSE
#define MIF_BUSMOUSE_Bit 8
#define MIF_BUSMOUSE 1 << MIF_BUSMOUSE_Bit
// INPORT
#define MIF_INPMOUSE_Bit 9
#define MIF_INPMOUSE 1 << MIF_INPMOUSE_Bit
// AUX (PS/2) mouse
#define MIF_AUXMOUSE_Bit 0
#define MIF_AUXMOUSE 1 << MIF_AUXMOUSE_Bit
// 3rd party mouse
#define MIF_OTHERMOUSE_Bit 1
#define MIF_OTHERMOUSE 1 << MIF_OTHERMOUSE_Bit

void VXDINLINE Post_Absolute_Pointer_Message(DWORD poxX, DWORD poxY) {
  _asm    mov esi, poxX;
  _asm    mov edi, poxY;
  _asm    xor al, al;
  VxDCall(VMD_Post_Absolute_Pointer_Message);
}

DWORD VXDINLINE Get_Mouse_Data() {
  DWORD instance;
  _asm    mov instance, ecx;
  return instance;
}

void VXDINLINE Set_Mouse_Data() {
  VxDCall(VMD_Set_Mouse_Data);
}

DWORD VXDINLINE inpd(WORD port) {
  DWORD result;
  _asm    mov dx, port;
  _asm    in eax, dx;
  _asm    mov result, eax;
  return result;
}

#endif
