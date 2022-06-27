CPP  = cl -nologo
CC   = cl -nologo
LINK  = link -nologo
RES  = 
OBJ  = opengl.obj $(RES)
LINKOBJ  = opengl.obj $(RES)
LIBS = /DLL /DEF:opengl32.def /LIBPATH:Z:\opt\vc\LIB user32.lib gdi32.lib shell32.lib
INCS =  /IZ:\opt\vc\INCLUDE
CXXINCS =  /IZ:\opt\vc\INCLUDE
BIN  = opengl32.dll
CXXFLAGS = $(CXXINCS) /GA /GX
CFLAGS = $(INCS) /GA /GX
RM = del

all: opengl32.dll

clean:
	$(RM) $(OBJ) $(BIN)

$(BIN): $(OBJ)
	$(LINK) $(LINKOBJ) /out:"opengl32.dll" $(LIBS)

opengl.obj: opengl.c
	$(CC) /c opengl.c /Feopengl.obj $(CXXFLAGS)

second.obj: second.c
	$(CC) /c second.c /Fesecond.obj $(CXXFLAGS)

cl openglTest.c /IZ:\opt\vc\INCLUDE
