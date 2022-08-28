regedit /c registry.reg

devlib -a vmm32.vxd vxds\biosxlat.vxd
devlib -a vmm32.vxd vxds\combuff.vxd
devlib -a vmm32.vxd vxds\configmg.vxd
devlib -a vmm32.vxd vxds\dosmgr.vxd
devlib -a vmm32.vxd vxds\dosnet.vxd
devlib -a vmm32.vxd vxds\dynapage.vxd
devlib -a vmm32.vxd vxds\ebios.vxd
devlib -a vmm32.vxd vxds\int13.vxd
devlib -a vmm32.vxd vxds\mtrr.vxd
devlib -a vmm32.vxd vxds\ntkern.vxd
devlib -a vmm32.vxd vxds\pageswap.vxd
devlib -a vmm32.vxd vxds\parity.vxd
devlib -a vmm32.vxd vxds\perf.vxd
devlib -a vmm32.vxd vxds\reboot.vxd
devlib -a vmm32.vxd vxds\shell.vxd
devlib -a vmm32.vxd vxds\spooler.vxd
devlib -a vmm32.vxd vxds\udf.vxd
devlib -a vmm32.vxd vxds\v86mmgr.vxd
devlib -a vmm32.vxd vxds\vcache.vxd
devlib -a vmm32.vxd vxds\vcd.vxd
devlib -a vmm32.vxd vxds\vcdfsd.vxd
devlib -a vmm32.vxd vxds\vcomm.vxd
devlib -a vmm32.vxd vxds\vcond.vxd
devlib -a vmm32.vxd vxds\vdd.vxd
devlib -a vmm32.vxd vxds\vdef.vxd
devlib -a vmm32.vxd vxds\vdmad.vxd
devlib -a vmm32.vxd vxds\vfat.vxd
devlib -a vmm32.vxd vxds\vfbackup.vxd
devlib -a vmm32.vxd vxds\vflatd.vxd
devlib -a vmm32.vxd vxds\vkd.vxd
devlib -a vmm32.vxd vxds\vmcpd.vxd
devlib -a vmm32.vxd vxds\vmd.vxd
devlib -a vmm32.vxd vxds\vmouse.vxd
@REM devlib -a vmm32.vxd vxds\vmpoll.vxd
devlib -a vmm32.vxd vxds\vpd.vxd
devlib -a vmm32.vxd vxds\vpicd.vxd
devlib -a vmm32.vxd vxds\vsd.vxd
@REM devlib -a vmm32.vxd vxds\vshare.vxd
devlib -a vmm32.vxd vxds\vtd.vxd
devlib -a vmm32.vxd vxds\vtdapi.vxd
devlib -a vmm32.vxd vxds\vwin32.vxd
devlib -a vmm32.vxd vxds\vxdldr.vxd

devlib -a vmm32.vxd vxds\ifsmgr.vxd
devlib -a vmm32.vxd vxds\ios.vxd
@REM devlib -a vmm32.vxd vxds\jsmouse.vxd
@REM devlib -a vmm32.vxd vxds\jscomm.vxd

@REM VxDLIB -p VMM32.VXD
@REM devlib -p VMM32.VXD

shutdown.com
