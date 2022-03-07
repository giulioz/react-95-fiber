CPP  = cl
CC   = cl
LINK  = link
RES  = 
OBJ  = main.obj SerialComm.obj $(RES)
LINKOBJ  = main.obj SerialComm.obj $(RES)
LIBS = /SUBSYSTEM:WINDOWS /LIBPATH:Z:\opt\vc\LIB user32.lib gdi32.lib
INCS =  /IZ:\opt\vc\INCLUDE
CXXINCS =  /IZ:\opt\vc\INCLUDE
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

SerialComm.obj: SerialComm.cpp
	$(CPP) /c SerialComm.cpp /FeSerialComm.obj $(CXXFLAGS)
