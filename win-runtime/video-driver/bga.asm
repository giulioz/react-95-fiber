; bga.asm - Code for handling the Bochs Graphics Adapter
;
; Many virtualization programs including Bochs, VirtualBox and QEMU provide this
; VESA BIOS extension as a convenient way to configure VESA modes.
; Due to the large amount of port I/O and low-level calls, this module is
; implemented in assembly language.

.MODEL MEDIUM
.386


INCLUDE vflatd.inc


;-------------------------------------------------------------------------------
; Imports
;-------------------------------------------------------------------------------
EXTERN _dwFrameBufSize    : DWORD
EXTERN _dwVideoMemSize    : DWORD
EXTERN _wXResolution      : WORD
EXTERN _wYResolution      : WORD
EXTERN _wBPP              : WORD
EXTERN _wFrameBufSelector : WORD

EXTERN pci_config_read_dword      : NEAR
EXTERN pci_config_write_dword     : NEAR
EXTERN pci_get_device_config_base : NEAR

;-------------------------------------------------------------------------------
; Defines
;-------------------------------------------------------------------------------
GET_DEVICE_API_ENTRY_POINT EQU 1684h
VFLATD_VXD                 EQU 11Fh

; Bochs Graphics Adapter ports
VBE_DISPI_IOPORT_INDEX EQU 01CEh
VBE_DISPI_IOPORT_DATA  EQU 01CFh
; Bochs Graphics Adapter register indexes
VBE_DISPI_INDEX_ID     EQU 0000h
VBE_DISPI_INDEX_XRES   EQU 0001h
VBE_DISPI_INDEX_YRES   EQU 0002h
VBE_DISPI_INDEX_BPP    EQU 0003h
VBE_DISPI_INDEX_ENABLE EQU 0004h
VBE_DISPI_INDEX_BANK   EQU 0005h


;-------------------------------------------------------------------------------
; Variables
;-------------------------------------------------------------------------------
PUBLIC _vflatdEntry
PUBLIC _dwFrameBufAddr
_DATA_BSS SEGMENT PUBLIC 'FAR_DATA'
    _vflatdEntry       DD 0  ; vflatd.vxd entry point
    _dwFrameBufAddr    DD 0
    dwPhysFrameBufAddr DD 0  ; physical address of the linear frame buffer
_DATA_BSS ENDS
ASSUME ds:_DATA_BSS


;-------------------------------------------------------------------------------
; Code (16-bit)
;-------------------------------------------------------------------------------
_INIT SEGMENT WORD PUBLIC USE16 'CODE'

; Detects the Bochs Graphics adapter and the size and location of its VRAM
; Called from the DriverInit on startup
; Returns
;   1 on success, 0 on failure
bga_hardware_detect_ PROC FAR PUBLIC
    push esi
    cli  ; disable interrupts so we don't get preempted while manipulating ports

    ; check ID of adapter (must be between 0xB0C0 and 0xB0C5)
    mov ax, VBE_DISPI_INDEX_ID
    call bga_read_reg
    cmp ax, 0B0C0h
    jb failure
    cmp ax, 0B0C5h
    ja failure

    ; probe for PCI device
    mov eax, 11111234h
    call pci_get_device_config_base
    cmp eax, -1
    jne found_pci
    mov eax, 01001B36h  ; QEMU QXL also supports this
    call pci_get_device_config_base
    cmp eax, -1
    je failure

  found_pci:

    mov al, 10h
    mov esi, eax  ; save config address of BAR0

    ; Read the frame buffer address from BAR0
    call pci_config_read_dword
    push eax  ; save original BAR0
    and al, 0F0h  ; clear lower 4 bits to get the actual address
    mov dwPhysFrameBufAddr, eax

    ; Get the size of the frame buffer by writing all 1s, then reading it back
    ; to see what is masked
    mov eax, esi
    xor ebx, ebx
    not ebx
    call pci_config_write_dword
    mov eax, esi
    call pci_config_read_dword
    and al, 0F0h
    not eax
    inc eax
    mov _dwVideoMemSize, eax

    ; Restore original BAR0 value
    mov eax, esi
    pop ebx
    call pci_config_write_dword

  success:
    mov ax, 1
    jmp done
  failure:
    xor ax, ax
  done:

    sti  ; re-enable interrupts
    pop esi
    retf
bga_hardware_detect_ ENDP

; Enables the Bochs Graphics Adapter hardware
; Returns:
;    1 on success, 0 on failure
bga_phys_enable_ PROC FAR PUBLIC
    call bga_phys_reset
    test ax, ax
    jz done  ; failed
    call bga_vflatd_init
  done:
    retf
bga_phys_enable_ ENDP

; Resets the Bochs Graphics Adapter hardware and applies the current resolution
; settings
; Returns:
;    1 on success, 0 on failure
bga_phys_reset PROC NEAR
    cli  ; disable interrupts so we don't get preempted while manipulating ports

    ; temporarily disable VBE extensions
    mov ax, VBE_DISPI_INDEX_ENABLE
    xor bx, bx
    call bga_write_reg
    ; set X resolution
    mov ax, VBE_DISPI_INDEX_XRES
    mov bx, _wXResolution
    call bga_write_reg
    ; set Y resolution
    mov ax, VBE_DISPI_INDEX_YRES
    mov bx, _wYResolution
    call bga_write_reg
    ; set bits per pixel
    mov ax, VBE_DISPI_INDEX_BPP
    mov bx, _wBPP
    call bga_write_reg
    ; re-enable VBE extensions
    mov ax, VBE_DISPI_INDEX_ENABLE
    mov bx, 1
    call bga_write_reg

    mov ax, 1
    sti  ; re-enable interrupts
    ret
bga_phys_reset ENDP

; Initializes the VflatD device, which simulates flat memory access to the framebuffer
; Returns:
;    1 on success, 0 on failure
bga_vflatd_init PROC NEAR
    push bp
    push si
    push di

    mov eax, _vflatdEntry
    test eax, eax
    jnz success  ; already initialized

    ; Get VFLATD entry point
    mov ax, GET_DEVICE_API_ENTRY_POINT
    mov bx, VFLATD_VXD
    int 2Fh
    mov WORD PTR _vflatdEntry, di
    mov WORD PTR _vflatdEntry+2, es

    ; Call VflatD_Query to register driver
    mov dx, VflatD_Query
    call DWORD PTR _vflatdEntry

    ; Get a selector for the linear framebuffer
    ; dl  = function number
    ; dh  = flags (must be zero)
    ; eax = physical address of frame buffer
    ; ecx = size of frame buffer
    mov eax, dwPhysFrameBufAddr
    mov dx, VflatD_Create_Physical_Frame_Buffer
    mov ecx, _dwVideoMemSize
    call DWORD PTR _vflatdEntry
    mov _wFrameBufSelector, ax
    mov _dwFrameBufAddr, edx

    jmp success

  success:
    mov ax, 1
    jmp done
  failure:
    xor ax, ax
  done:

    pop di
    pop si
    pop bp
    ret
bga_vflatd_init ENDP

; Reads a Bochs Graphics Adapter register
; Parameters:
;    ax = register index
; Returns:
;    value of register
bga_read_reg PROC NEAR
    ; select register to read
    mov dx, VBE_DISPI_IOPORT_INDEX
    out dx, ax
    ; read value
    mov dx, VBE_DISPI_IOPORT_DATA
    in ax, dx
    ret
bga_read_reg ENDP

; Writes a Bochs Graphics Adapter register
; Parameters:
;    ax = register index
;    bx = value
bga_write_reg PROC NEAR
    ; select register to write
    mov dx, VBE_DISPI_IOPORT_INDEX
    out dx, ax
    ; write value
    mov ax, bx
    mov dx, VBE_DISPI_IOPORT_DATA
    out dx, ax
    ret
bga_write_reg ENDP

_INIT ENDS

END
