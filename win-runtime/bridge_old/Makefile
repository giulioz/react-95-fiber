CPP  = cl -nologo
CC   = cl -nologo
LINK  = link -nologo
RES  = 
OBJ  = main.obj SerialComm.obj RemoteCommand.obj interop.obj $(RES)
LINKOBJ  = main.obj SerialComm.obj RemoteCommand.obj interop.obj $(RES)
LIBS = /SUBSYSTEM:WINDOWS /LIBPATH:Z:\opt\vc\LIB user32.lib gdi32.lib shell32.lib
INCS =  /IZ:\opt\vc\INCLUDE /IZ:\prj\win-runtime\common
CXXINCS =  /IZ:\opt\vc\INCLUDE /IZ:\prj\win-runtime\common
BIN  = bridge.exe
CXXFLAGS = $(CXXINCS) /GA /GX
CFLAGS = $(INCS) /GA /GX
RM = del

all: bridge.exe

clean:
	$(RM) $(OBJ) $(BIN)

$(BIN): $(OBJ)
	$(LINK) $(LINKOBJ) /out:"bridge.exe" $(LIBS)

main.obj: main.cpp
	$(CPP) /c main.cpp /Femain.obj $(CXXFLAGS)

interop.obj: ..\common\interop.c
	$(CPP) /c ..\common\interop.c /Feinterop.obj $(CXXFLAGS)

SerialComm.obj: SerialComm.cpp
	$(CPP) /c SerialComm.cpp /FeSerialComm.obj $(CXXFLAGS)

RemoteCommand.obj: RemoteCommand.cpp
	$(CPP) /c RemoteCommand.cpp /FeRemoteCommand.obj $(CXXFLAGS)
