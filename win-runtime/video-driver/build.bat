SET WATCOM=Z:\opt\open-watcom-c-win32-1.9
SET PATH=%WATCOM%\BINNT;%WATCOM%\BINW;%PATH%;Z:\opt\vc\BIN;Z:\opt\WIN95_DDK\BIN;Z:\opt\MASM611\BIN
SET EDPATH=%WATCOM%\EDDAT
SET INCLUDE=%WATCOM%\H;%WATCOM%\H\NT
SET LIB=lib
cd z:/prj/win-runtime/video-driver
nmake -nologo
