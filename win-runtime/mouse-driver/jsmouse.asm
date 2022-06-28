.386p
include   VMM.INC
include   VMD.INC


EXTRN _JSMouse_DeviceInit:PROC
; EXTRN _JSMouse_DeviceIOControl:PROC


Declare_Virtual_Device JSMOUSE, 1, 00, JSMouse_Control, Undefined_Device_ID, VCD_Init_Order,,,


VxD_Locked_Code_Seg
   BeginProc JSMouse_Control
;      Control_Dispatch DEVICE_INIT, JSMouse_DeviceInit, cCall, <ebx>
      Control_Dispatch SYS_DYNAMIC_DEVICE_INIT, _JSMouse_DeviceInit, cCall, <ebx>
      Control_Dispatch SYS_DYNAMIC_DEVICE_EXIT, _JSMouse_DeviceExit, cCall, <ebx>
;      Control_Dispatch W32_DEVICEIOCONTROL, _JSMouse_DeviceIOControl
      clc
      ret
   EndProc JSMouse_Control
VxD_Locked_Code_Ends


end
