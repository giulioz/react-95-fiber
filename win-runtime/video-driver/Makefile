ASMFLAGS = -c -Cp -nologo -Iinclude
CFLAGS = -3 -ml -zq -s -i=include -i=%WATCOM%\h\win -nd=_DATA

all: virtdisp.drv

clean:
	del *.drv
	del *.lst
	del *.map
	del *.obj
	del *.lib
	del *.exp

virtdisp.drv: bga.obj init.obj pci.obj dibstubs.obj palettes.obj debug.obj display.obj
	link16 /NOE/NOD/MAP/LI/AL:16 bga.obj init.obj pci.obj dibstubs.obj palettes.obj debug.obj display.obj,virtdisp.drv,virtdisp.map,LIBW.LIB DIBENG.LIB,virtdisp.def

bga.obj:
	ml $(ASMFLAGS) -Fo bga.obj -Flbga.lst bga.asm
init.obj:
	ml $(ASMFLAGS) -Fo init.obj -Flinit.lst init.asm
pci.obj:
	ml $(ASMFLAGS) -Fo pci.obj -Flpci.lst pci.asm
dibstubs.obj:
	ml $(ASMFLAGS) -Fo dibstubs.obj -Fldibstubs.lst dibstubs.asm
palettes.obj:
	ml $(ASMFLAGS) -Fo palettes.obj -Flpalettes.lst palettes.asm

debug.obj:
	wcc $(CFLAGS) debug.c -fo=debug.obj
display.obj:
	wcc $(CFLAGS) display.c -fo=display.obj
