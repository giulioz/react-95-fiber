INCS =  /IZ:\opt\vc\INCLUDE /IZ:\opt\WIN95_DDK\INC32

all: jscomm.vxd

clean:
	del *.vxd
	del *.obj
	del *.lib
	del *.exp
	del driver.asm

jscomm.vxd: jscomm.obj driver.obj
	link -nologo -vxd -nodefaultlib -def:jscomm.def -out:jscomm.vxd jscomm.obj driver.obj

jscomm.obj: jscomm.asm
	ml -coff -c -Cx -DMASM6 -DBLD_COFF -DIS_32 $(INCS) jscomm.asm

driver.obj: driver.c
	cl -nologo -c -DVXD -DIS_32 $(INCS) driver.c
