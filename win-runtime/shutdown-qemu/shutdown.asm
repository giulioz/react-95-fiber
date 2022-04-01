.model small
.code
main proc
  mov     ax, 2000h ; data
  mov     dx, 604h  ; port
  out     dx, ax
main endp
end main