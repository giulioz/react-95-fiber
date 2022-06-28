.386p
include   VMM.INC


EXTRN _JSComm_DeviceInit:PROC


Declare_Virtual_Device JSCOMM, 1, 00, JSComm_Control, Undefined_Device_ID, VCD_Init_Order,,,


VxD_Locked_Code_Seg
   BeginProc JSComm_Control
      Control_Dispatch DEVICE_INIT, _JSComm_DeviceInit, cCall, <ebx>
      Control_Dispatch W32_DEVICEIOCONTROL, JSComm_DeviceIOControl, sCall, <ecx, ebx, edx, esi>
      clc
      ret
   EndProc JSComm_Control
VxD_Locked_Code_Ends


end
