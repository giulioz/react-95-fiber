; VflatD_Query
;
; mov   dx, VflatD_Query          ; Function number
; call  VFlatDApiProcAdr
; jz    errorhandler
; mov   VerNum, eax
; mov   FrameBufSelector, ebx
; mov   FrameBufSize, ecx
; mov   FrameBufBase, edx
;
; Retrieves the VFLATD version number and other information. Uses Flags.
;
; Returns the following information and clears the carry flag if successful; otherwise, sets the carry flag.
; EAX = VFLATD version
; EBX = GDT selector to the frame buffer
; ECX = Size of frame buffer
; EDX = Linear base of frame buffer. (if linear mode)
VflatD_Query EQU 0

; VflatD_Create_Physical_Frame_Buffer
;
; mov   dl, VflatD_Create_Physical_Frame_Buffer  ; Function number
; mov   dh, Flags                         ; Must be zero
; mov   eax, FrameBufBase                 ; Physical base of frame buffer
; mov   ecx, FrameBufSize                 ; Size of frame buffer, in bytes
; call  VFlatDApiProcAdr
; jc    errorhandler
; mov   VideoSelector, ax
; mov    VideoAddress, edx
;
; Retrieves a GDT selector to a flat video buffer. Uses Flags.
; * Returns a selector for the logical frame buffer in AX, returns a linear address for that frame
;   buffer in EDX, and clears the carry flag if successful; otherwise, sets the carry flag.
;
; Flags
;   Options flags. Currently, no flags are defined; this parameter must be zero.
; FrameBufBase
;   Physical base of frame buffer. The physical base is the address of the frame buffer in physical memory.
; FrameBufSize
;   Size of frame buffer, in bytes.
VflatD_Create_Physical_Frame_Buffer EQU 4
