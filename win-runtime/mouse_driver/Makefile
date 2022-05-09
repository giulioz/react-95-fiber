INCS =  /IZ:\opt\vc\INCLUDE /IZ:\opt\WIN95_DDK\INC32

all: jsmouse.vxd

clean:
	del *.vxd
	del *.obj
	del *.lib
	del *.exp
	del driver.asm

jsmouse.vxd: jsmouse.obj driver.obj
	link -vxd -nodefaultlib -def:jsmouse.def -out:jsmouse.vxd jsmouse.obj driver.obj

jsmouse.obj: jsmouse.asm
	ml -coff -c -Cx -DMASM6 -DBLD_COFF -DIS_32 $(INCS) jsmouse.asm

driver.obj: driver.c
	cl -nologo -c -DVXD -DIS_32 $(INCS) driver.c
