// #include <stdlib.h>
// #include <windows.h>
// #include <windef.h>

#define DLLEXPORT __declspec(dllexport)
#define APIENTRY __stdcall

typedef int BOOL;
typedef void *HGLRC;
typedef void *HDC;
typedef char *LPCSTR;
typedef unsigned int UINT;
typedef unsigned short WORD;
typedef unsigned long DWORD;
typedef float FLOAT;
typedef unsigned char BYTE;
typedef int (*PROC)();

const unsigned short GLBUS_PORT_OUT = 0x516;

unsigned long __cdecl _inpw(unsigned short);
unsigned long __cdecl _outpw(unsigned short, unsigned long);
unsigned long __cdecl _inpd(unsigned short);
unsigned long __cdecl _outpd(unsigned short, unsigned long);

typedef unsigned int GLenum;
typedef unsigned char GLboolean;
typedef unsigned int GLbitfield;
typedef signed char GLbyte;
typedef short GLshort;
typedef int GLint;
typedef int GLsizei;
typedef unsigned char GLubyte;
typedef unsigned short GLushort;
typedef unsigned int GLuint;
typedef float GLfloat;
typedef float GLclampf;
typedef double GLdouble;
typedef double GLclampd;
typedef void GLvoid;

DLLEXPORT void APIENTRY DllInitialize() { _outpw(GLBUS_PORT_OUT, 0); }
DLLEXPORT GLint APIENTRY glDebugEntry(GLint unknown1, GLint unknown2) {
  _outpw(GLBUS_PORT_OUT, 1);
  return 0;
}
DLLEXPORT void APIENTRY GlmfBeginGlsBlock() { _outpw(GLBUS_PORT_OUT, 2); }
DLLEXPORT void APIENTRY GlmfCloseMetaFile() { _outpw(GLBUS_PORT_OUT, 3); }
DLLEXPORT void APIENTRY GlmfEndGlsBlock() { _outpw(GLBUS_PORT_OUT, 4); }
DLLEXPORT void APIENTRY GlmfEndPlayback() { _outpw(GLBUS_PORT_OUT, 5); }
DLLEXPORT void APIENTRY GlmfInitPlayback() { _outpw(GLBUS_PORT_OUT, 6); }
DLLEXPORT void APIENTRY GlmfPlayGlsRecord() { _outpw(GLBUS_PORT_OUT, 7); }

DLLEXPORT void APIENTRY glAccum(GLenum op, GLfloat value) {
  _outpw(GLBUS_PORT_OUT, 8);
}
DLLEXPORT void APIENTRY glAlphaFunc(GLenum func, GLclampf ref) {
  _outpw(GLBUS_PORT_OUT, 9);
}
DLLEXPORT GLboolean APIENTRY glAreTexturesResident(GLsizei n,
                                                   const GLuint *textures,
                                                   GLboolean *residences) {
  _outpw(GLBUS_PORT_OUT, 10);
}
DLLEXPORT void APIENTRY glArrayElement(GLint i) { _outpw(GLBUS_PORT_OUT, 11); }
DLLEXPORT void APIENTRY glBegin(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 12);
  _outpd(GLBUS_PORT_OUT, mode);
}
DLLEXPORT void APIENTRY glBindTexture(GLenum target, GLuint texture) {
  _outpw(GLBUS_PORT_OUT, 13);
}
DLLEXPORT void APIENTRY glBitmap(GLsizei width, GLsizei height, GLfloat xorig,
                                 GLfloat yorig, GLfloat xmove, GLfloat ymove,
                                 const GLubyte *bitmap) {
  _outpw(GLBUS_PORT_OUT, 14);
}
DLLEXPORT void APIENTRY glBlendFunc(GLenum sfactor, GLenum dfactor) {
  _outpw(GLBUS_PORT_OUT, 15);
}
DLLEXPORT void APIENTRY glCallList(GLuint list) { _outpw(GLBUS_PORT_OUT, 16); }
DLLEXPORT void APIENTRY glCallLists(GLsizei n, GLenum type,
                                    const GLvoid *lists) {
  _outpw(GLBUS_PORT_OUT, 17);
}
DLLEXPORT void APIENTRY glClear(GLbitfield mask) {
  _outpw(GLBUS_PORT_OUT, 18);
  _outpd(GLBUS_PORT_OUT, mask);
}
DLLEXPORT void APIENTRY glClearAccum(GLfloat red, GLfloat green, GLfloat blue,
                                     GLfloat alpha) {
  _outpw(GLBUS_PORT_OUT, 19);
}
DLLEXPORT void APIENTRY glClearColor(GLclampf red, GLclampf green,
                                     GLclampf blue, GLclampf alpha) {
  _outpw(GLBUS_PORT_OUT, 20);
}
DLLEXPORT void APIENTRY glClearDepth(GLclampd depth) {
  _outpw(GLBUS_PORT_OUT, 21);
}
DLLEXPORT void APIENTRY glClearIndex(GLfloat c) { _outpw(GLBUS_PORT_OUT, 22); }
DLLEXPORT void APIENTRY glClearStencil(GLint s) { _outpw(GLBUS_PORT_OUT, 23); }
DLLEXPORT void APIENTRY glClipPlane(GLenum plane, const GLdouble *equation) {
  _outpw(GLBUS_PORT_OUT, 24);
}
DLLEXPORT void APIENTRY glColor3b(GLbyte red, GLbyte green, GLbyte blue) {
  _outpw(GLBUS_PORT_OUT, 25);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3bv(const GLbyte *v) {
  _outpw(GLBUS_PORT_OUT, 26);
}
DLLEXPORT void APIENTRY glColor3d(GLdouble red, GLdouble green, GLdouble blue) {
  _outpw(GLBUS_PORT_OUT, 27);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 28);
}
DLLEXPORT void APIENTRY glColor3f(GLfloat red, GLfloat green, GLfloat blue) {
  _outpw(GLBUS_PORT_OUT, 29);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 30);
}
DLLEXPORT void APIENTRY glColor3i(GLint red, GLint green, GLint blue) {
  _outpw(GLBUS_PORT_OUT, 31);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 32);
}
DLLEXPORT void APIENTRY glColor3s(GLshort red, GLshort green, GLshort blue) {
  _outpw(GLBUS_PORT_OUT, 33);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 34);
}
DLLEXPORT void APIENTRY glColor3ub(GLubyte red, GLubyte green, GLubyte blue) {
  _outpw(GLBUS_PORT_OUT, 35);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3ubv(const GLubyte *v) {
  _outpw(GLBUS_PORT_OUT, 36);
}
DLLEXPORT void APIENTRY glColor3ui(GLuint red, GLuint green, GLuint blue) {
  _outpw(GLBUS_PORT_OUT, 37);
  _outpd(GLBUS_PORT_OUT, red);
  _outpd(GLBUS_PORT_OUT, green);
  _outpd(GLBUS_PORT_OUT, blue);
}
DLLEXPORT void APIENTRY glColor3uiv(const GLuint *v) {
  _outpw(GLBUS_PORT_OUT, 38);
}
DLLEXPORT void APIENTRY glColor3us(GLushort red, GLushort green,
                                   GLushort blue) {
  _outpw(GLBUS_PORT_OUT, 39);
}
DLLEXPORT void APIENTRY glColor3usv(const GLushort *v) {
  _outpw(GLBUS_PORT_OUT, 40);
}
DLLEXPORT void APIENTRY glColor4b(GLbyte red, GLbyte green, GLbyte blue,
                                  GLbyte alpha) {
  _outpw(GLBUS_PORT_OUT, 41);
}
DLLEXPORT void APIENTRY glColor4bv(const GLbyte *v) {
  _outpw(GLBUS_PORT_OUT, 42);
}
DLLEXPORT void APIENTRY glColor4d(GLdouble red, GLdouble green, GLdouble blue,
                                  GLdouble alpha) {
  _outpw(GLBUS_PORT_OUT, 43);
}
DLLEXPORT void APIENTRY glColor4dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 44);
}
DLLEXPORT void APIENTRY glColor4f(GLfloat red, GLfloat green, GLfloat blue,
                                  GLfloat alpha) {
  _outpw(GLBUS_PORT_OUT, 45);
}
DLLEXPORT void APIENTRY glColor4fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 46);
}
DLLEXPORT void APIENTRY glColor4i(GLint red, GLint green, GLint blue,
                                  GLint alpha) {
  _outpw(GLBUS_PORT_OUT, 47);
}
DLLEXPORT void APIENTRY glColor4iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 48);
}
DLLEXPORT void APIENTRY glColor4s(GLshort red, GLshort green, GLshort blue,
                                  GLshort alpha) {
  _outpw(GLBUS_PORT_OUT, 49);
}
DLLEXPORT void APIENTRY glColor4sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 50);
}
DLLEXPORT void APIENTRY glColor4ub(GLubyte red, GLubyte green, GLubyte blue,
                                   GLubyte alpha) {
  _outpw(GLBUS_PORT_OUT, 51);
}
DLLEXPORT void APIENTRY glColor4ubv(const GLubyte *v) {
  _outpw(GLBUS_PORT_OUT, 52);
}
DLLEXPORT void APIENTRY glColor4ui(GLuint red, GLuint green, GLuint blue,
                                   GLuint alpha) {
  _outpw(GLBUS_PORT_OUT, 53);
}
DLLEXPORT void APIENTRY glColor4uiv(const GLuint *v) {
  _outpw(GLBUS_PORT_OUT, 54);
}
DLLEXPORT void APIENTRY glColor4us(GLushort red, GLushort green, GLushort blue,
                                   GLushort alpha) {
  _outpw(GLBUS_PORT_OUT, 55);
}
DLLEXPORT void APIENTRY glColor4usv(const GLushort *v) {
  _outpw(GLBUS_PORT_OUT, 56);
}
DLLEXPORT void APIENTRY glColorMask(GLboolean red, GLboolean green,
                                    GLboolean blue, GLboolean alpha) {
  _outpw(GLBUS_PORT_OUT, 57);
}
DLLEXPORT void APIENTRY glColorMaterial(GLenum face, GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 58);
}
DLLEXPORT void APIENTRY glColorPointer(GLint size, GLenum type, GLsizei stride,
                                       const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 59);
}
DLLEXPORT void APIENTRY glCopyPixels(GLint x, GLint y, GLsizei width,
                                     GLsizei height, GLenum type) {
  _outpw(GLBUS_PORT_OUT, 60);
}
DLLEXPORT void APIENTRY glCopyTexImage1D(GLenum target, GLint level,
                                         GLenum internalFormat, GLint x,
                                         GLint y, GLsizei width, GLint border) {
  _outpw(GLBUS_PORT_OUT, 61);
}
DLLEXPORT void APIENTRY glCopyTexImage2D(GLenum target, GLint level,
                                         GLenum internalFormat, GLint x,
                                         GLint y, GLsizei width, GLsizei height,
                                         GLint border) {
  _outpw(GLBUS_PORT_OUT, 62);
}
DLLEXPORT void APIENTRY glCopyTexSubImage1D(GLenum target, GLint level,
                                            GLint xoffset, GLint x, GLint y,
                                            GLsizei width) {
  _outpw(GLBUS_PORT_OUT, 63);
}
DLLEXPORT void APIENTRY glCopyTexSubImage2D(GLenum target, GLint level,
                                            GLint xoffset, GLint yoffset,
                                            GLint x, GLint y, GLsizei width,
                                            GLsizei height) {
  _outpw(GLBUS_PORT_OUT, 64);
}
DLLEXPORT void APIENTRY glCullFace(GLenum mode) { _outpw(GLBUS_PORT_OUT, 65); }
DLLEXPORT void APIENTRY glDeleteLists(GLuint list, GLsizei range) {
  _outpw(GLBUS_PORT_OUT, 66);
}
DLLEXPORT void APIENTRY glDeleteTextures(GLsizei n, const GLuint *textures) {
  _outpw(GLBUS_PORT_OUT, 67);
}
DLLEXPORT void APIENTRY glDepthFunc(GLenum func) { _outpw(GLBUS_PORT_OUT, 68); }
DLLEXPORT void APIENTRY glDepthMask(GLboolean flag) {
  _outpw(GLBUS_PORT_OUT, 69);
}
DLLEXPORT void APIENTRY glDepthRange(GLclampd zNear, GLclampd zFar) {
  _outpw(GLBUS_PORT_OUT, 70);
}
DLLEXPORT void APIENTRY glDisable(GLenum cap) { _outpw(GLBUS_PORT_OUT, 71); }
DLLEXPORT void APIENTRY glDisableClientState(GLenum array) {
  _outpw(GLBUS_PORT_OUT, 72);
}
DLLEXPORT void APIENTRY glDrawArrays(GLenum mode, GLint first, GLsizei count) {
  _outpw(GLBUS_PORT_OUT, 73);
}
DLLEXPORT void APIENTRY glDrawBuffer(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 74);
}
DLLEXPORT void APIENTRY glDrawElements(GLenum mode, GLsizei count, GLenum type,
                                       const GLvoid *indices) {
  _outpw(GLBUS_PORT_OUT, 75);
}
DLLEXPORT void APIENTRY glDrawPixels(GLsizei width, GLsizei height,
                                     GLenum format, GLenum type,
                                     const GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 76);
}
DLLEXPORT void APIENTRY glEdgeFlag(GLboolean flag) {
  _outpw(GLBUS_PORT_OUT, 77);
}
DLLEXPORT void APIENTRY glEdgeFlagPointer(GLsizei stride,
                                          const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 78);
}
DLLEXPORT void APIENTRY glEdgeFlagv(const GLboolean *flag) {
  _outpw(GLBUS_PORT_OUT, 79);
}
DLLEXPORT void APIENTRY glEnable(GLenum cap) { _outpw(GLBUS_PORT_OUT, 80); }
DLLEXPORT void APIENTRY glEnableClientState(GLenum array) {
  _outpw(GLBUS_PORT_OUT, 81);
}
DLLEXPORT void APIENTRY glEnd(void) { _outpw(GLBUS_PORT_OUT, 82); }
DLLEXPORT void APIENTRY glEndList(void) { _outpw(GLBUS_PORT_OUT, 83); }
DLLEXPORT void APIENTRY glEvalCoord1d(GLdouble u) {
  _outpw(GLBUS_PORT_OUT, 84);
}
DLLEXPORT void APIENTRY glEvalCoord1dv(const GLdouble *u) {
  _outpw(GLBUS_PORT_OUT, 85);
}
DLLEXPORT void APIENTRY glEvalCoord1f(GLfloat u) { _outpw(GLBUS_PORT_OUT, 86); }
DLLEXPORT void APIENTRY glEvalCoord1fv(const GLfloat *u) {
  _outpw(GLBUS_PORT_OUT, 87);
}
DLLEXPORT void APIENTRY glEvalCoord2d(GLdouble u, GLdouble v) {
  _outpw(GLBUS_PORT_OUT, 88);
}
DLLEXPORT void APIENTRY glEvalCoord2dv(const GLdouble *u) {
  _outpw(GLBUS_PORT_OUT, 89);
}
DLLEXPORT void APIENTRY glEvalCoord2f(GLfloat u, GLfloat v) {
  _outpw(GLBUS_PORT_OUT, 90);
}
DLLEXPORT void APIENTRY glEvalCoord2fv(const GLfloat *u) {
  _outpw(GLBUS_PORT_OUT, 91);
}
DLLEXPORT void APIENTRY glEvalMesh1(GLenum mode, GLint i1, GLint i2) {
  _outpw(GLBUS_PORT_OUT, 92);
}
DLLEXPORT void APIENTRY glEvalMesh2(GLenum mode, GLint i1, GLint i2, GLint j1,
                                    GLint j2) {
  _outpw(GLBUS_PORT_OUT, 93);
}
DLLEXPORT void APIENTRY glEvalPoint1(GLint i) { _outpw(GLBUS_PORT_OUT, 94); }
DLLEXPORT void APIENTRY glEvalPoint2(GLint i, GLint j) {
  _outpw(GLBUS_PORT_OUT, 95);
}
DLLEXPORT void APIENTRY glFeedbackBuffer(GLsizei size, GLenum type,
                                         GLfloat *buffer) {
  _outpw(GLBUS_PORT_OUT, 96);
}
DLLEXPORT void APIENTRY glFinish(void) { _outpw(GLBUS_PORT_OUT, 97); }
DLLEXPORT void APIENTRY glFlush(void) { _outpw(GLBUS_PORT_OUT, 98); }
DLLEXPORT void APIENTRY glFogf(GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 99);
}
DLLEXPORT void APIENTRY glFogfv(GLenum pname, const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 100);
}
DLLEXPORT void APIENTRY glFogi(GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 101);
}
DLLEXPORT void APIENTRY glFogiv(GLenum pname, const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 102);
}
DLLEXPORT void APIENTRY glFrontFace(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 103);
}
DLLEXPORT void APIENTRY glFrustum(GLdouble left, GLdouble right,
                                  GLdouble bottom, GLdouble top, GLdouble zNear,
                                  GLdouble zFar) {
  _outpw(GLBUS_PORT_OUT, 104);
}
DLLEXPORT GLuint APIENTRY glGenLists(GLsizei range) {
  _outpw(GLBUS_PORT_OUT, 105);
}
DLLEXPORT void APIENTRY glGenTextures(GLsizei n, GLuint *textures) {
  _outpw(GLBUS_PORT_OUT, 106);
}
DLLEXPORT void APIENTRY glGetBooleanv(GLenum pname, GLboolean *params) {
  _outpw(GLBUS_PORT_OUT, 107);
}
DLLEXPORT void APIENTRY glGetClipPlane(GLenum plane, GLdouble *equation) {
  _outpw(GLBUS_PORT_OUT, 108);
}
DLLEXPORT void APIENTRY glGetDoublev(GLenum pname, GLdouble *params) {
  _outpw(GLBUS_PORT_OUT, 109);
}
DLLEXPORT GLenum APIENTRY glGetError(void) { _outpw(GLBUS_PORT_OUT, 110); }
DLLEXPORT void APIENTRY glGetFloatv(GLenum pname, GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 111);
}
DLLEXPORT void APIENTRY glGetIntegerv(GLenum pname, GLint *params) {
  _outpw(GLBUS_PORT_OUT, 112);
}
DLLEXPORT void APIENTRY glGetLightfv(GLenum light, GLenum pname,
                                     GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 113);
}
DLLEXPORT void APIENTRY glGetLightiv(GLenum light, GLenum pname,
                                     GLint *params) {
  _outpw(GLBUS_PORT_OUT, 114);
}
DLLEXPORT void APIENTRY glGetMapdv(GLenum target, GLenum query, GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 115);
}
DLLEXPORT void APIENTRY glGetMapfv(GLenum target, GLenum query, GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 116);
}
DLLEXPORT void APIENTRY glGetMapiv(GLenum target, GLenum query, GLint *v) {
  _outpw(GLBUS_PORT_OUT, 117);
}
DLLEXPORT void APIENTRY glGetMaterialfv(GLenum face, GLenum pname,
                                        GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 118);
}
DLLEXPORT void APIENTRY glGetMaterialiv(GLenum face, GLenum pname,
                                        GLint *params) {
  _outpw(GLBUS_PORT_OUT, 119);
}
DLLEXPORT void APIENTRY glGetPixelMapfv(GLenum map, GLfloat *values) {
  _outpw(GLBUS_PORT_OUT, 120);
}
DLLEXPORT void APIENTRY glGetPixelMapuiv(GLenum map, GLuint *values) {
  _outpw(GLBUS_PORT_OUT, 121);
}
DLLEXPORT void APIENTRY glGetPixelMapusv(GLenum map, GLushort *values) {
  _outpw(GLBUS_PORT_OUT, 122);
}
DLLEXPORT void APIENTRY glGetPointerv(GLenum pname, GLvoid **params) {
  _outpw(GLBUS_PORT_OUT, 123);
}
DLLEXPORT void APIENTRY glGetPolygonStipple(GLubyte *mask) {
  _outpw(GLBUS_PORT_OUT, 124);
}
DLLEXPORT const GLubyte *APIENTRY glGetString(GLenum name) {
  _outpw(GLBUS_PORT_OUT, 125);
}
DLLEXPORT void APIENTRY glGetTexEnvfv(GLenum target, GLenum pname,
                                      GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 126);
}
DLLEXPORT void APIENTRY glGetTexEnviv(GLenum target, GLenum pname,
                                      GLint *params) {
  _outpw(GLBUS_PORT_OUT, 127);
}
DLLEXPORT void APIENTRY glGetTexGendv(GLenum coord, GLenum pname,
                                      GLdouble *params) {
  _outpw(GLBUS_PORT_OUT, 128);
}
DLLEXPORT void APIENTRY glGetTexGenfv(GLenum coord, GLenum pname,
                                      GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 129);
}
DLLEXPORT void APIENTRY glGetTexGeniv(GLenum coord, GLenum pname,
                                      GLint *params) {
  _outpw(GLBUS_PORT_OUT, 130);
}
DLLEXPORT void APIENTRY glGetTexImage(GLenum target, GLint level, GLenum format,
                                      GLenum type, GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 131);
}
DLLEXPORT void APIENTRY glGetTexLevelParameterfv(GLenum target, GLint level,
                                                 GLenum pname,
                                                 GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 132);
}
DLLEXPORT void APIENTRY glGetTexLevelParameteriv(GLenum target, GLint level,
                                                 GLenum pname, GLint *params) {
  _outpw(GLBUS_PORT_OUT, 133);
}
DLLEXPORT void APIENTRY glGetTexParameterfv(GLenum target, GLenum pname,
                                            GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 134);
}
DLLEXPORT void APIENTRY glGetTexParameteriv(GLenum target, GLenum pname,
                                            GLint *params) {
  _outpw(GLBUS_PORT_OUT, 135);
}
DLLEXPORT void APIENTRY glHint(GLenum target, GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 136);
}
DLLEXPORT void APIENTRY glIndexMask(GLuint mask) {
  _outpw(GLBUS_PORT_OUT, 137);
}
DLLEXPORT void APIENTRY glIndexPointer(GLenum type, GLsizei stride,
                                       const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 138);
}
DLLEXPORT void APIENTRY glIndexd(GLdouble c) { _outpw(GLBUS_PORT_OUT, 139); }
DLLEXPORT void APIENTRY glIndexdv(const GLdouble *c) {
  _outpw(GLBUS_PORT_OUT, 140);
}
DLLEXPORT void APIENTRY glIndexf(GLfloat c) { _outpw(GLBUS_PORT_OUT, 141); }
DLLEXPORT void APIENTRY glIndexfv(const GLfloat *c) {
  _outpw(GLBUS_PORT_OUT, 142);
}
DLLEXPORT void APIENTRY glIndexi(GLint c) { _outpw(GLBUS_PORT_OUT, 143); }
DLLEXPORT void APIENTRY glIndexiv(const GLint *c) {
  _outpw(GLBUS_PORT_OUT, 144);
}
DLLEXPORT void APIENTRY glIndexs(GLshort c) { _outpw(GLBUS_PORT_OUT, 145); }
DLLEXPORT void APIENTRY glIndexsv(const GLshort *c) {
  _outpw(GLBUS_PORT_OUT, 146);
}
DLLEXPORT void APIENTRY glIndexub(GLubyte c) { _outpw(GLBUS_PORT_OUT, 147); }
DLLEXPORT void APIENTRY glIndexubv(const GLubyte *c) {
  _outpw(GLBUS_PORT_OUT, 148);
}
DLLEXPORT void APIENTRY glInitNames(void) { _outpw(GLBUS_PORT_OUT, 149); }
DLLEXPORT void APIENTRY glInterleavedArrays(GLenum format, GLsizei stride,
                                            const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 150);
}
DLLEXPORT GLboolean APIENTRY glIsEnabled(GLenum cap) {
  _outpw(GLBUS_PORT_OUT, 151);
}
DLLEXPORT GLboolean APIENTRY glIsList(GLuint list) {
  _outpw(GLBUS_PORT_OUT, 152);
}
DLLEXPORT GLboolean APIENTRY glIsTexture(GLuint texture) {
  _outpw(GLBUS_PORT_OUT, 153);
}
DLLEXPORT void APIENTRY glLightModelf(GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 154);
}
DLLEXPORT void APIENTRY glLightModelfv(GLenum pname, const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 155);
}
DLLEXPORT void APIENTRY glLightModeli(GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 156);
}
DLLEXPORT void APIENTRY glLightModeliv(GLenum pname, const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 157);
}
DLLEXPORT void APIENTRY glLightf(GLenum light, GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 158);
}
DLLEXPORT void APIENTRY glLightfv(GLenum light, GLenum pname,
                                  const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 159);
}
DLLEXPORT void APIENTRY glLighti(GLenum light, GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 160);
}
DLLEXPORT void APIENTRY glLightiv(GLenum light, GLenum pname,
                                  const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 161);
}
DLLEXPORT void APIENTRY glLineStipple(GLint factor, GLushort pattern) {
  _outpw(GLBUS_PORT_OUT, 162);
}
DLLEXPORT void APIENTRY glLineWidth(GLfloat width) {
  _outpw(GLBUS_PORT_OUT, 163);
}
DLLEXPORT void APIENTRY glListBase(GLuint base) { _outpw(GLBUS_PORT_OUT, 164); }
DLLEXPORT void APIENTRY glLoadIdentity(void) { _outpw(GLBUS_PORT_OUT, 165); }
DLLEXPORT void APIENTRY glLoadMatrixd(const GLdouble *m) {
  _outpw(GLBUS_PORT_OUT, 166);
}
DLLEXPORT void APIENTRY glLoadMatrixf(const GLfloat *m) {
  _outpw(GLBUS_PORT_OUT, 167);
}
DLLEXPORT void APIENTRY glLoadName(GLuint name) { _outpw(GLBUS_PORT_OUT, 168); }
DLLEXPORT void APIENTRY glLogicOp(GLenum opcode) {
  _outpw(GLBUS_PORT_OUT, 169);
}
DLLEXPORT void APIENTRY glMap1d(GLenum target, GLdouble u1, GLdouble u2,
                                GLint stride, GLint order,
                                const GLdouble *points) {
  _outpw(GLBUS_PORT_OUT, 170);
}
DLLEXPORT void APIENTRY glMap1f(GLenum target, GLfloat u1, GLfloat u2,
                                GLint stride, GLint order,
                                const GLfloat *points) {
  _outpw(GLBUS_PORT_OUT, 171);
}
DLLEXPORT void APIENTRY glMap2d(GLenum target, GLdouble u1, GLdouble u2,
                                GLint ustride, GLint uorder, GLdouble v1,
                                GLdouble v2, GLint vstride, GLint vorder,
                                const GLdouble *points) {
  _outpw(GLBUS_PORT_OUT, 172);
}
DLLEXPORT void APIENTRY glMap2f(GLenum target, GLfloat u1, GLfloat u2,
                                GLint ustride, GLint uorder, GLfloat v1,
                                GLfloat v2, GLint vstride, GLint vorder,
                                const GLfloat *points) {
  _outpw(GLBUS_PORT_OUT, 173);
}
DLLEXPORT void APIENTRY glMapGrid1d(GLint un, GLdouble u1, GLdouble u2) {
  _outpw(GLBUS_PORT_OUT, 174);
}
DLLEXPORT void APIENTRY glMapGrid1f(GLint un, GLfloat u1, GLfloat u2) {
  _outpw(GLBUS_PORT_OUT, 175);
}
DLLEXPORT void APIENTRY glMapGrid2d(GLint un, GLdouble u1, GLdouble u2,
                                    GLint vn, GLdouble v1, GLdouble v2) {
  _outpw(GLBUS_PORT_OUT, 176);
}
DLLEXPORT void APIENTRY glMapGrid2f(GLint un, GLfloat u1, GLfloat u2, GLint vn,
                                    GLfloat v1, GLfloat v2) {
  _outpw(GLBUS_PORT_OUT, 177);
}
DLLEXPORT void APIENTRY glMaterialf(GLenum face, GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 178);
}
DLLEXPORT void APIENTRY glMaterialfv(GLenum face, GLenum pname,
                                     const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 179);
}
DLLEXPORT void APIENTRY glMateriali(GLenum face, GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 180);
}
DLLEXPORT void APIENTRY glMaterialiv(GLenum face, GLenum pname,
                                     const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 181);
}
DLLEXPORT void APIENTRY glMatrixMode(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 182);
}
DLLEXPORT void APIENTRY glMultMatrixd(const GLdouble *m) {
  _outpw(GLBUS_PORT_OUT, 183);
}
DLLEXPORT void APIENTRY glMultMatrixf(const GLfloat *m) {
  _outpw(GLBUS_PORT_OUT, 184);
}
DLLEXPORT void APIENTRY glNewList(GLuint list, GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 185);
}
DLLEXPORT void APIENTRY glNormal3b(GLbyte nx, GLbyte ny, GLbyte nz) {
  _outpw(GLBUS_PORT_OUT, 186);
}
DLLEXPORT void APIENTRY glNormal3bv(const GLbyte *v) {
  _outpw(GLBUS_PORT_OUT, 187);
}
DLLEXPORT void APIENTRY glNormal3d(GLdouble nx, GLdouble ny, GLdouble nz) {
  _outpw(GLBUS_PORT_OUT, 188);
}
DLLEXPORT void APIENTRY glNormal3dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 189);
}
DLLEXPORT void APIENTRY glNormal3f(GLfloat nx, GLfloat ny, GLfloat nz) {
  _outpw(GLBUS_PORT_OUT, 190);
}
DLLEXPORT void APIENTRY glNormal3fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 191);
}
DLLEXPORT void APIENTRY glNormal3i(GLint nx, GLint ny, GLint nz) {
  _outpw(GLBUS_PORT_OUT, 192);
}
DLLEXPORT void APIENTRY glNormal3iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 193);
}
DLLEXPORT void APIENTRY glNormal3s(GLshort nx, GLshort ny, GLshort nz) {
  _outpw(GLBUS_PORT_OUT, 194);
}
DLLEXPORT void APIENTRY glNormal3sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 195);
}
DLLEXPORT void APIENTRY glNormalPointer(GLenum type, GLsizei stride,
                                        const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 196);
}
DLLEXPORT void APIENTRY glOrtho(GLdouble left, GLdouble right, GLdouble bottom,
                                GLdouble top, GLdouble zNear, GLdouble zFar) {
  _outpw(GLBUS_PORT_OUT, 197);
}
DLLEXPORT void APIENTRY glPassThrough(GLfloat token) {
  _outpw(GLBUS_PORT_OUT, 198);
}
DLLEXPORT void APIENTRY glPixelMapfv(GLenum map, GLsizei mapsize,
                                     const GLfloat *values) {
  _outpw(GLBUS_PORT_OUT, 199);
}
DLLEXPORT void APIENTRY glPixelMapuiv(GLenum map, GLsizei mapsize,
                                      const GLuint *values) {
  _outpw(GLBUS_PORT_OUT, 200);
}
DLLEXPORT void APIENTRY glPixelMapusv(GLenum map, GLsizei mapsize,
                                      const GLushort *values) {
  _outpw(GLBUS_PORT_OUT, 201);
}
DLLEXPORT void APIENTRY glPixelStoref(GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 202);
}
DLLEXPORT void APIENTRY glPixelStorei(GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 203);
}
DLLEXPORT void APIENTRY glPixelTransferf(GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 204);
}
DLLEXPORT void APIENTRY glPixelTransferi(GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 205);
}
DLLEXPORT void APIENTRY glPixelZoom(GLfloat xfactor, GLfloat yfactor) {
  _outpw(GLBUS_PORT_OUT, 206);
}
DLLEXPORT void APIENTRY glPointSize(GLfloat size) {
  _outpw(GLBUS_PORT_OUT, 207);
}
DLLEXPORT void APIENTRY glPolygonMode(GLenum face, GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 208);
}
DLLEXPORT void APIENTRY glPolygonOffset(GLfloat factor, GLfloat units) {
  _outpw(GLBUS_PORT_OUT, 209);
}
DLLEXPORT void APIENTRY glPolygonStipple(const GLubyte *mask) {
  _outpw(GLBUS_PORT_OUT, 210);
}
DLLEXPORT void APIENTRY glPopAttrib(void) { _outpw(GLBUS_PORT_OUT, 211); }
DLLEXPORT void APIENTRY glPopClientAttrib(void) { _outpw(GLBUS_PORT_OUT, 212); }
DLLEXPORT void APIENTRY glPopMatrix(void) { _outpw(GLBUS_PORT_OUT, 213); }
DLLEXPORT void APIENTRY glPopName(void) { _outpw(GLBUS_PORT_OUT, 214); }
DLLEXPORT void APIENTRY glPrioritizeTextures(GLsizei n, const GLuint *textures,
                                             const GLclampf *priorities) {
  _outpw(GLBUS_PORT_OUT, 215);
}
DLLEXPORT void APIENTRY glPushAttrib(GLbitfield mask) {
  _outpw(GLBUS_PORT_OUT, 216);
}
DLLEXPORT void APIENTRY glPushClientAttrib(GLbitfield mask) {
  _outpw(GLBUS_PORT_OUT, 217);
}
DLLEXPORT void APIENTRY glPushMatrix(void) { _outpw(GLBUS_PORT_OUT, 218); }
DLLEXPORT void APIENTRY glPushName(GLuint name) { _outpw(GLBUS_PORT_OUT, 219); }
DLLEXPORT void APIENTRY glRasterPos2d(GLdouble x, GLdouble y) {
  _outpw(GLBUS_PORT_OUT, 220);
}
DLLEXPORT void APIENTRY glRasterPos2dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 221);
}
DLLEXPORT void APIENTRY glRasterPos2f(GLfloat x, GLfloat y) {
  _outpw(GLBUS_PORT_OUT, 222);
}
DLLEXPORT void APIENTRY glRasterPos2fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 223);
}
DLLEXPORT void APIENTRY glRasterPos2i(GLint x, GLint y) {
  _outpw(GLBUS_PORT_OUT, 224);
}
DLLEXPORT void APIENTRY glRasterPos2iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 225);
}
DLLEXPORT void APIENTRY glRasterPos2s(GLshort x, GLshort y) {
  _outpw(GLBUS_PORT_OUT, 226);
}
DLLEXPORT void APIENTRY glRasterPos2sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 227);
}
DLLEXPORT void APIENTRY glRasterPos3d(GLdouble x, GLdouble y, GLdouble z) {
  _outpw(GLBUS_PORT_OUT, 228);
}
DLLEXPORT void APIENTRY glRasterPos3dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 229);
}
DLLEXPORT void APIENTRY glRasterPos3f(GLfloat x, GLfloat y, GLfloat z) {
  _outpw(GLBUS_PORT_OUT, 230);
}
DLLEXPORT void APIENTRY glRasterPos3fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 231);
}
DLLEXPORT void APIENTRY glRasterPos3i(GLint x, GLint y, GLint z) {
  _outpw(GLBUS_PORT_OUT, 232);
}
DLLEXPORT void APIENTRY glRasterPos3iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 233);
}
DLLEXPORT void APIENTRY glRasterPos3s(GLshort x, GLshort y, GLshort z) {
  _outpw(GLBUS_PORT_OUT, 234);
}
DLLEXPORT void APIENTRY glRasterPos3sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 235);
}
DLLEXPORT void APIENTRY glRasterPos4d(GLdouble x, GLdouble y, GLdouble z,
                                      GLdouble w) {
  _outpw(GLBUS_PORT_OUT, 236);
}
DLLEXPORT void APIENTRY glRasterPos4dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 237);
}
DLLEXPORT void APIENTRY glRasterPos4f(GLfloat x, GLfloat y, GLfloat z,
                                      GLfloat w) {
  _outpw(GLBUS_PORT_OUT, 238);
}
DLLEXPORT void APIENTRY glRasterPos4fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 239);
}
DLLEXPORT void APIENTRY glRasterPos4i(GLint x, GLint y, GLint z, GLint w) {
  _outpw(GLBUS_PORT_OUT, 240);
}
DLLEXPORT void APIENTRY glRasterPos4iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 241);
}
DLLEXPORT void APIENTRY glRasterPos4s(GLshort x, GLshort y, GLshort z,
                                      GLshort w) {
  _outpw(GLBUS_PORT_OUT, 242);
}
DLLEXPORT void APIENTRY glRasterPos4sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 243);
}
DLLEXPORT void APIENTRY glReadBuffer(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 244);
}
DLLEXPORT void APIENTRY glReadPixels(GLint x, GLint y, GLsizei width,
                                     GLsizei height, GLenum format, GLenum type,
                                     GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 245);
}
DLLEXPORT void APIENTRY glRectd(GLdouble x1, GLdouble y1, GLdouble x2,
                                GLdouble y2) {
  _outpw(GLBUS_PORT_OUT, 246);
}
DLLEXPORT void APIENTRY glRectdv(const GLdouble *v1, const GLdouble *v2) {
  _outpw(GLBUS_PORT_OUT, 247);
}
DLLEXPORT void APIENTRY glRectf(GLfloat x1, GLfloat y1, GLfloat x2,
                                GLfloat y2) {
  _outpw(GLBUS_PORT_OUT, 248);
}
DLLEXPORT void APIENTRY glRectfv(const GLfloat *v1, const GLfloat *v2) {
  _outpw(GLBUS_PORT_OUT, 249);
}
DLLEXPORT void APIENTRY glRecti(GLint x1, GLint y1, GLint x2, GLint y2) {
  _outpw(GLBUS_PORT_OUT, 250);
}
DLLEXPORT void APIENTRY glRectiv(const GLint *v1, const GLint *v2) {
  _outpw(GLBUS_PORT_OUT, 251);
}
DLLEXPORT void APIENTRY glRects(GLshort x1, GLshort y1, GLshort x2,
                                GLshort y2) {
  _outpw(GLBUS_PORT_OUT, 252);
}
DLLEXPORT void APIENTRY glRectsv(const GLshort *v1, const GLshort *v2) {
  _outpw(GLBUS_PORT_OUT, 253);
}
DLLEXPORT GLint APIENTRY glRenderMode(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 254);
}
DLLEXPORT void APIENTRY glRotated(GLdouble angle, GLdouble x, GLdouble y,
                                  GLdouble z) {
  _outpw(GLBUS_PORT_OUT, 255);
}
DLLEXPORT void APIENTRY glRotatef(GLfloat angle, GLfloat x, GLfloat y,
                                  GLfloat z) {
  _outpw(GLBUS_PORT_OUT, 256);
}
DLLEXPORT void APIENTRY glScaled(GLdouble x, GLdouble y, GLdouble z) {
  _outpw(GLBUS_PORT_OUT, 257);
}
DLLEXPORT void APIENTRY glScalef(GLfloat x, GLfloat y, GLfloat z) {
  _outpw(GLBUS_PORT_OUT, 258);
}
DLLEXPORT void APIENTRY glScissor(GLint x, GLint y, GLsizei width,
                                  GLsizei height) {
  _outpw(GLBUS_PORT_OUT, 259);
}
DLLEXPORT void APIENTRY glSelectBuffer(GLsizei size, GLuint *buffer) {
  _outpw(GLBUS_PORT_OUT, 260);
}
DLLEXPORT void APIENTRY glShadeModel(GLenum mode) {
  _outpw(GLBUS_PORT_OUT, 261);
}
DLLEXPORT void APIENTRY glStencilFunc(GLenum func, GLint ref, GLuint mask) {
  _outpw(GLBUS_PORT_OUT, 262);
}
DLLEXPORT void APIENTRY glStencilMask(GLuint mask) {
  _outpw(GLBUS_PORT_OUT, 263);
}
DLLEXPORT void APIENTRY glStencilOp(GLenum fail, GLenum zfail, GLenum zpass) {
  _outpw(GLBUS_PORT_OUT, 264);
}
DLLEXPORT void APIENTRY glTexCoord1d(GLdouble s) {
  _outpw(GLBUS_PORT_OUT, 265);
}
DLLEXPORT void APIENTRY glTexCoord1dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 266);
}
DLLEXPORT void APIENTRY glTexCoord1f(GLfloat s) { _outpw(GLBUS_PORT_OUT, 267); }
DLLEXPORT void APIENTRY glTexCoord1fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 268);
}
DLLEXPORT void APIENTRY glTexCoord1i(GLint s) { _outpw(GLBUS_PORT_OUT, 269); }
DLLEXPORT void APIENTRY glTexCoord1iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 270);
}
DLLEXPORT void APIENTRY glTexCoord1s(GLshort s) { _outpw(GLBUS_PORT_OUT, 271); }
DLLEXPORT void APIENTRY glTexCoord1sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 272);
}
DLLEXPORT void APIENTRY glTexCoord2d(GLdouble s, GLdouble t) {
  _outpw(GLBUS_PORT_OUT, 273);
}
DLLEXPORT void APIENTRY glTexCoord2dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 274);
}
DLLEXPORT void APIENTRY glTexCoord2f(GLfloat s, GLfloat t) {
  _outpw(GLBUS_PORT_OUT, 275);
}
DLLEXPORT void APIENTRY glTexCoord2fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 276);
}
DLLEXPORT void APIENTRY glTexCoord2i(GLint s, GLint t) {
  _outpw(GLBUS_PORT_OUT, 277);
}
DLLEXPORT void APIENTRY glTexCoord2iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 278);
}
DLLEXPORT void APIENTRY glTexCoord2s(GLshort s, GLshort t) {
  _outpw(GLBUS_PORT_OUT, 279);
}
DLLEXPORT void APIENTRY glTexCoord2sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 280);
}
DLLEXPORT void APIENTRY glTexCoord3d(GLdouble s, GLdouble t, GLdouble r) {
  _outpw(GLBUS_PORT_OUT, 281);
}
DLLEXPORT void APIENTRY glTexCoord3dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 282);
}
DLLEXPORT void APIENTRY glTexCoord3f(GLfloat s, GLfloat t, GLfloat r) {
  _outpw(GLBUS_PORT_OUT, 283);
}
DLLEXPORT void APIENTRY glTexCoord3fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 284);
}
DLLEXPORT void APIENTRY glTexCoord3i(GLint s, GLint t, GLint r) {
  _outpw(GLBUS_PORT_OUT, 285);
}
DLLEXPORT void APIENTRY glTexCoord3iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 286);
}
DLLEXPORT void APIENTRY glTexCoord3s(GLshort s, GLshort t, GLshort r) {
  _outpw(GLBUS_PORT_OUT, 287);
}
DLLEXPORT void APIENTRY glTexCoord3sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 288);
}
DLLEXPORT void APIENTRY glTexCoord4d(GLdouble s, GLdouble t, GLdouble r,
                                     GLdouble q) {
  _outpw(GLBUS_PORT_OUT, 289);
}
DLLEXPORT void APIENTRY glTexCoord4dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 290);
}
DLLEXPORT void APIENTRY glTexCoord4f(GLfloat s, GLfloat t, GLfloat r,
                                     GLfloat q) {
  _outpw(GLBUS_PORT_OUT, 291);
}
DLLEXPORT void APIENTRY glTexCoord4fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 292);
}
DLLEXPORT void APIENTRY glTexCoord4i(GLint s, GLint t, GLint r, GLint q) {
  _outpw(GLBUS_PORT_OUT, 293);
}
DLLEXPORT void APIENTRY glTexCoord4iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 294);
}
DLLEXPORT void APIENTRY glTexCoord4s(GLshort s, GLshort t, GLshort r,
                                     GLshort q) {
  _outpw(GLBUS_PORT_OUT, 295);
}
DLLEXPORT void APIENTRY glTexCoord4sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 296);
}
DLLEXPORT void APIENTRY glTexCoordPointer(GLint size, GLenum type,
                                          GLsizei stride,
                                          const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 297);
}
DLLEXPORT void APIENTRY glTexEnvf(GLenum target, GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 298);
}
DLLEXPORT void APIENTRY glTexEnvfv(GLenum target, GLenum pname,
                                   const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 299);
}
DLLEXPORT void APIENTRY glTexEnvi(GLenum target, GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 300);
}
DLLEXPORT void APIENTRY glTexEnviv(GLenum target, GLenum pname,
                                   const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 301);
}
DLLEXPORT void APIENTRY glTexGend(GLenum coord, GLenum pname, GLdouble param) {
  _outpw(GLBUS_PORT_OUT, 302);
}
DLLEXPORT void APIENTRY glTexGendv(GLenum coord, GLenum pname,
                                   const GLdouble *params) {
  _outpw(GLBUS_PORT_OUT, 303);
}
DLLEXPORT void APIENTRY glTexGenf(GLenum coord, GLenum pname, GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 304);
}
DLLEXPORT void APIENTRY glTexGenfv(GLenum coord, GLenum pname,
                                   const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 305);
}
DLLEXPORT void APIENTRY glTexGeni(GLenum coord, GLenum pname, GLint param) {
  _outpw(GLBUS_PORT_OUT, 306);
}
DLLEXPORT void APIENTRY glTexGeniv(GLenum coord, GLenum pname,
                                   const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 307);
}
DLLEXPORT void APIENTRY glTexImage1D(GLenum target, GLint level,
                                     GLint internalformat, GLsizei width,
                                     GLint border, GLenum format, GLenum type,
                                     const GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 308);
}
DLLEXPORT void APIENTRY glTexImage2D(GLenum target, GLint level,
                                     GLint internalformat, GLsizei width,
                                     GLsizei height, GLint border,
                                     GLenum format, GLenum type,
                                     const GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 309);
}
DLLEXPORT void APIENTRY glTexParameterf(GLenum target, GLenum pname,
                                        GLfloat param) {
  _outpw(GLBUS_PORT_OUT, 310);
}
DLLEXPORT void APIENTRY glTexParameterfv(GLenum target, GLenum pname,
                                         const GLfloat *params) {
  _outpw(GLBUS_PORT_OUT, 311);
}
DLLEXPORT void APIENTRY glTexParameteri(GLenum target, GLenum pname,
                                        GLint param) {
  _outpw(GLBUS_PORT_OUT, 312);
}
DLLEXPORT void APIENTRY glTexParameteriv(GLenum target, GLenum pname,
                                         const GLint *params) {
  _outpw(GLBUS_PORT_OUT, 313);
}
DLLEXPORT void APIENTRY glTexSubImage1D(GLenum target, GLint level,
                                        GLint xoffset, GLsizei width,
                                        GLenum format, GLenum type,
                                        const GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 314);
}
DLLEXPORT void APIENTRY glTexSubImage2D(GLenum target, GLint level,
                                        GLint xoffset, GLint yoffset,
                                        GLsizei width, GLsizei height,
                                        GLenum format, GLenum type,
                                        const GLvoid *pixels) {
  _outpw(GLBUS_PORT_OUT, 315);
}
DLLEXPORT void APIENTRY glTranslated(GLdouble x, GLdouble y, GLdouble z) {
  _outpw(GLBUS_PORT_OUT, 316);
}
DLLEXPORT void APIENTRY glTranslatef(GLfloat x, GLfloat y, GLfloat z) {
  _outpw(GLBUS_PORT_OUT, 317);
}
DLLEXPORT void APIENTRY glVertex2d(GLdouble x, GLdouble y) {
  _outpw(GLBUS_PORT_OUT, 318);
  _outpd(GLBUS_PORT_OUT, x);
  _outpd(GLBUS_PORT_OUT, y);
}
DLLEXPORT void APIENTRY glVertex2dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 319);
}
DLLEXPORT void APIENTRY glVertex2f(GLfloat x, GLfloat y) {
  _outpw(GLBUS_PORT_OUT, 320);
  _outpd(GLBUS_PORT_OUT, x);
  _outpd(GLBUS_PORT_OUT, y);
}
DLLEXPORT void APIENTRY glVertex2fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 321);
}
DLLEXPORT void APIENTRY glVertex2i(GLint x, GLint y) {
  _outpw(GLBUS_PORT_OUT, 322);
  _outpd(GLBUS_PORT_OUT, x);
  _outpd(GLBUS_PORT_OUT, y);
}
DLLEXPORT void APIENTRY glVertex2iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 323);
}
DLLEXPORT void APIENTRY glVertex2s(GLshort x, GLshort y) {
  _outpw(GLBUS_PORT_OUT, 324);
  _outpd(GLBUS_PORT_OUT, x);
  _outpd(GLBUS_PORT_OUT, y);
}
DLLEXPORT void APIENTRY glVertex2sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 325);
}
DLLEXPORT void APIENTRY glVertex3d(GLdouble x, GLdouble y, GLdouble z) {
  _outpw(GLBUS_PORT_OUT, 326);
}
DLLEXPORT void APIENTRY glVertex3dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 327);
}
DLLEXPORT void APIENTRY glVertex3f(GLfloat x, GLfloat y, GLfloat z) {
  _outpw(GLBUS_PORT_OUT, 328);
}
DLLEXPORT void APIENTRY glVertex3fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 329);
}
DLLEXPORT void APIENTRY glVertex3i(GLint x, GLint y, GLint z) {
  _outpw(GLBUS_PORT_OUT, 330);
}
DLLEXPORT void APIENTRY glVertex3iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 331);
}
DLLEXPORT void APIENTRY glVertex3s(GLshort x, GLshort y, GLshort z) {
  _outpw(GLBUS_PORT_OUT, 332);
}
DLLEXPORT void APIENTRY glVertex3sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 333);
}
DLLEXPORT void APIENTRY glVertex4d(GLdouble x, GLdouble y, GLdouble z,
                                   GLdouble w) {
  _outpw(GLBUS_PORT_OUT, 334);
}
DLLEXPORT void APIENTRY glVertex4dv(const GLdouble *v) {
  _outpw(GLBUS_PORT_OUT, 335);
}
DLLEXPORT void APIENTRY glVertex4f(GLfloat x, GLfloat y, GLfloat z, GLfloat w) {
  _outpw(GLBUS_PORT_OUT, 336);
}
DLLEXPORT void APIENTRY glVertex4fv(const GLfloat *v) {
  _outpw(GLBUS_PORT_OUT, 337);
}
DLLEXPORT void APIENTRY glVertex4i(GLint x, GLint y, GLint z, GLint w) {
  _outpw(GLBUS_PORT_OUT, 338);
}
DLLEXPORT void APIENTRY glVertex4iv(const GLint *v) {
  _outpw(GLBUS_PORT_OUT, 339);
}
DLLEXPORT void APIENTRY glVertex4s(GLshort x, GLshort y, GLshort z, GLshort w) {
  _outpw(GLBUS_PORT_OUT, 340);
}
DLLEXPORT void APIENTRY glVertex4sv(const GLshort *v) {
  _outpw(GLBUS_PORT_OUT, 341);
}
DLLEXPORT void APIENTRY glVertexPointer(GLint size, GLenum type, GLsizei stride,
                                        const GLvoid *pointer) {
  _outpw(GLBUS_PORT_OUT, 342);
}
DLLEXPORT void APIENTRY glViewport(GLint x, GLint y, GLsizei width,
                                   GLsizei height) {
  _outpw(GLBUS_PORT_OUT, 343);
  _outpd(GLBUS_PORT_OUT, x);
  _outpd(GLBUS_PORT_OUT, y);
  _outpd(GLBUS_PORT_OUT, width);
  _outpd(GLBUS_PORT_OUT, height);
}

/* EXT_vertex_array */
typedef void (*PFNGLARRAYELEMENTEXTPROC)(GLint i);
typedef void (*PFNGLDRAWARRAYSEXTPROC)(GLenum mode, GLint first, GLsizei count);
typedef void (*PFNGLVERTEXPOINTEREXTPROC)(GLint size, GLenum type,
                                          GLsizei stride, GLsizei count,
                                          const GLvoid *pointer);
typedef void (*PFNGLNORMALPOINTEREXTPROC)(GLenum type, GLsizei stride,
                                          GLsizei count, const GLvoid *pointer);
typedef void (*PFNGLCOLORPOINTEREXTPROC)(GLint size, GLenum type,
                                         GLsizei stride, GLsizei count,
                                         const GLvoid *pointer);
typedef void (*PFNGLINDEXPOINTEREXTPROC)(GLenum type, GLsizei stride,
                                         GLsizei count, const GLvoid *pointer);
typedef void (*PFNGLTEXCOORDPOINTEREXTPROC)(GLint size, GLenum type,
                                            GLsizei stride, GLsizei count,
                                            const GLvoid *pointer);
typedef void (*PFNGLEDGEFLAGPOINTEREXTPROC)(GLsizei stride, GLsizei count,
                                            const GLboolean *pointer);
typedef void (*PFNGLGETPOINTERVEXTPROC)(GLenum pname, GLvoid **params);
typedef void (*PFNGLARRAYELEMENTARRAYEXTPROC)(GLenum mode, GLsizei count,
                                              const GLvoid *pi);

/* WIN_draw_range_elements */
typedef void (*PFNGLDRAWRANGEELEMENTSWINPROC)(GLenum mode, GLuint start,
                                              GLuint end, GLsizei count,
                                              GLenum type,
                                              const GLvoid *indices);

/* WIN_swap_hint */
typedef void (*PFNGLADDSWAPHINTRECTWINPROC)(GLint x, GLint y, GLsizei width,
                                            GLsizei height);

/* EXT_paletted_texture */
typedef void (*PFNGLCOLORTABLEEXTPROC)(GLenum target, GLenum internalFormat,
                                       GLsizei width, GLenum format,
                                       GLenum type, const GLvoid *data);
typedef void (*PFNGLCOLORSUBTABLEEXTPROC)(GLenum target, GLsizei start,
                                          GLsizei count, GLenum format,
                                          GLenum type, const GLvoid *data);
typedef void (*PFNGLGETCOLORTABLEEXTPROC)(GLenum target, GLenum format,
                                          GLenum type, GLvoid *data);
typedef void (*PFNGLGETCOLORTABLEPARAMETERIVEXTPROC)(GLenum target,
                                                     GLenum pname,
                                                     GLint *params);
typedef void (*PFNGLGETCOLORTABLEPARAMETERFVEXTPROC)(GLenum target,
                                                     GLenum pname,
                                                     GLfloat *params);

typedef DWORD COLORREF;

typedef struct _POINTFLOAT {
  FLOAT x;
  FLOAT y;
} POINTFLOAT, *PPOINTFLOAT;

typedef struct _GLYPHMETRICSFLOAT {
  FLOAT gmfBlackBoxX;
  FLOAT gmfBlackBoxY;
  POINTFLOAT gmfptGlyphOrigin;
  FLOAT gmfCellIncX;
  FLOAT gmfCellIncY;
} GLYPHMETRICSFLOAT, *PGLYPHMETRICSFLOAT, *LPGLYPHMETRICSFLOAT;

typedef struct tagLAYERPLANEDESCRIPTOR {  // lpd
  WORD nSize;
  WORD nVersion;
  DWORD dwFlags;
  BYTE iPixelType;
  BYTE cColorBits;
  BYTE cRedBits;
  BYTE cRedShift;
  BYTE cGreenBits;
  BYTE cGreenShift;
  BYTE cBlueBits;
  BYTE cBlueShift;
  BYTE cAlphaBits;
  BYTE cAlphaShift;
  BYTE cAccumBits;
  BYTE cAccumRedBits;
  BYTE cAccumGreenBits;
  BYTE cAccumBlueBits;
  BYTE cAccumAlphaBits;
  BYTE cDepthBits;
  BYTE cStencilBits;
  BYTE cAuxBuffers;
  BYTE iLayerPlane;
  BYTE bReserved;
  COLORREF crTransparent;
} LAYERPLANEDESCRIPTOR, *PLAYERPLANEDESCRIPTOR, *LPLAYERPLANEDESCRIPTOR;

typedef struct tagPIXELFORMATDESCRIPTOR {
  WORD nSize;
  WORD nVersion;
  DWORD dwFlags;
  BYTE iPixelType;
  BYTE cColorBits;
  BYTE cRedBits;
  BYTE cRedShift;
  BYTE cGreenBits;
  BYTE cGreenShift;
  BYTE cBlueBits;
  BYTE cBlueShift;
  BYTE cAlphaBits;
  BYTE cAlphaShift;
  BYTE cAccumBits;
  BYTE cAccumRedBits;
  BYTE cAccumGreenBits;
  BYTE cAccumBlueBits;
  BYTE cAccumAlphaBits;
  BYTE cDepthBits;
  BYTE cStencilBits;
  BYTE cAuxBuffers;
  BYTE iLayerType;
  BYTE bReserved;
  DWORD dwLayerMask;
  DWORD dwVisibleMask;
  DWORD dwDamageMask;
} PIXELFORMATDESCRIPTOR, *PPIXELFORMATDESCRIPTOR, *LPPIXELFORMATDESCRIPTOR;

/* pixel types */
#define PFD_TYPE_RGBA 0
#define PFD_TYPE_COLORINDEX 1

/* layer types */
#define PFD_MAIN_PLANE 0
#define PFD_OVERLAY_PLANE 1
#define PFD_UNDERLAY_PLANE (-1)

/* PIXELFORMATDESCRIPTOR flags */
#define PFD_DOUBLEBUFFER 0x00000001
#define PFD_STEREO 0x00000002
#define PFD_DRAW_TO_WINDOW 0x00000004
#define PFD_DRAW_TO_BITMAP 0x00000008
#define PFD_SUPPORT_GDI 0x00000010
#define PFD_SUPPORT_OPENGL 0x00000020
#define PFD_GENERIC_FORMAT 0x00000040
#define PFD_NEED_PALETTE 0x00000080
#define PFD_NEED_SYSTEM_PALETTE 0x00000100
#define PFD_SWAP_EXCHANGE 0x00000200
#define PFD_SWAP_COPY 0x00000400
#define PFD_SWAP_LAYER_BUFFERS 0x00000800
#define PFD_GENERIC_ACCELERATED 0x00001000
#define PFD_SUPPORT_DIRECTDRAW 0x00002000

/* PIXELFORMATDESCRIPTOR flags for use in ChoosePixelFormat only */
#define PFD_DEPTH_DONTCARE 0x20000000
#define PFD_DOUBLEBUFFER_DONTCARE 0x40000000
#define PFD_STEREO_DONTCARE 0x80000000

DLLEXPORT BOOL APIENTRY wglCopyContext(HGLRC a, HGLRC b, UINT c) {
  _outpw(GLBUS_PORT_OUT, 344);
}
DLLEXPORT HGLRC APIENTRY wglCreateContext(HDC a) {
  _outpw(GLBUS_PORT_OUT, 345);
}
DLLEXPORT HGLRC APIENTRY wglCreateLayerContext(HDC a, int b) {
  _outpw(GLBUS_PORT_OUT, 346);
}
DLLEXPORT BOOL APIENTRY wglDeleteContext(HGLRC a) {
  _outpw(GLBUS_PORT_OUT, 347);
}
DLLEXPORT HGLRC APIENTRY wglGetCurrentContext() { _outpw(GLBUS_PORT_OUT, 348); }
DLLEXPORT HDC APIENTRY wglGetCurrentDC() { _outpw(GLBUS_PORT_OUT, 349); }
DLLEXPORT PROC APIENTRY wglGetProcAddress(LPCSTR a) {
  _outpw(GLBUS_PORT_OUT, 350);
}
DLLEXPORT BOOL APIENTRY wglMakeCurrent(HDC a, HGLRC b) {
  _outpw(GLBUS_PORT_OUT, 351);
}
DLLEXPORT BOOL APIENTRY wglShareLists(HGLRC a, HGLRC b) {
  _outpw(GLBUS_PORT_OUT, 352);
}
DLLEXPORT BOOL APIENTRY wglUseFontBitmapsA(HDC a, DWORD b, DWORD c, DWORD d) {
  _outpw(GLBUS_PORT_OUT, 353);
}
DLLEXPORT BOOL APIENTRY wglUseFontBitmapsW(HDC a, DWORD b, DWORD c, DWORD d) {
  _outpw(GLBUS_PORT_OUT, 354);
}
DLLEXPORT BOOL APIENTRY wglUseFontOutlinesA(HDC a, DWORD b, DWORD c, DWORD d,
                                            FLOAT e, FLOAT f, int g,
                                            LPGLYPHMETRICSFLOAT h) {
  _outpw(GLBUS_PORT_OUT, 355);
}
DLLEXPORT BOOL APIENTRY wglUseFontOutlinesW(HDC a, DWORD b, DWORD c, DWORD d,
                                            FLOAT e, FLOAT f, int g,
                                            LPGLYPHMETRICSFLOAT h) {
  _outpw(GLBUS_PORT_OUT, 356);
}
DLLEXPORT BOOL APIENTRY wglDescribeLayerPlane(HDC a, int b, int c, UINT d,
                                              LPLAYERPLANEDESCRIPTOR e) {
  _outpw(GLBUS_PORT_OUT, 357);
}
DLLEXPORT int APIENTRY wglSetLayerPaletteEntries(HDC a, int b, int c, int d,
                                                 COLORREF *e) {
  _outpw(GLBUS_PORT_OUT, 358);
}
DLLEXPORT int APIENTRY wglGetLayerPaletteEntries(HDC a, int b, int c, int d,
                                                 COLORREF *e) {
  _outpw(GLBUS_PORT_OUT, 359);
}
DLLEXPORT BOOL APIENTRY wglRealizeLayerPalette(HDC a, int b, BOOL c) {
  _outpw(GLBUS_PORT_OUT, 360);
}
DLLEXPORT BOOL APIENTRY wglSwapLayerBuffers(HDC a, UINT b) {
  _outpw(GLBUS_PORT_OUT, 361);
}

DLLEXPORT int APIENTRY wglChoosePixelFormat(HDC hdc,
                                            const PIXELFORMATDESCRIPTOR *ppfd) {
  _outpw(GLBUS_PORT_OUT, 362);
  return 1;
}
DLLEXPORT int APIENTRY wglDescribePixelFormat(HDC hdc, int iPixelFormat,
                                              UINT nBytes,
                                              LPPIXELFORMATDESCRIPTOR ppfd) {
  _outpw(GLBUS_PORT_OUT, 363);
  ppfd->nSize = sizeof(PIXELFORMATDESCRIPTOR);
  ppfd->nVersion = 1;
  ppfd->dwFlags = PFD_DRAW_TO_WINDOW | PFD_SUPPORT_OPENGL;
  ppfd->iPixelType = PFD_TYPE_RGBA;
  ppfd->cColorBits = 32;
  ppfd->cRedBits = 8;
  ppfd->cRedShift = 0;
  ppfd->cGreenBits = 8;
  ppfd->cGreenShift = 8;
  ppfd->cBlueBits = 8;
  ppfd->cBlueShift = 16;
  ppfd->cAlphaBits = 8;
  ppfd->cAlphaShift = 24;
  ppfd->cAccumBits = 0;
  ppfd->cAccumRedBits = 0;
  ppfd->cAccumGreenBits = 0;
  ppfd->cAccumBlueBits = 0;
  ppfd->cAccumAlphaBits = 0;
  ppfd->cDepthBits = 0;
  ppfd->cStencilBits = 0;
  ppfd->cAuxBuffers = 0;
  ppfd->iLayerType = 0;
  ppfd->bReserved = 0;
  ppfd->dwLayerMask = 0;
  ppfd->dwVisibleMask = 0;
  ppfd->dwDamageMask = 0;
  return 1;
}
DLLEXPORT void APIENTRY wglGetDefaultProcAddress() {
  _outpw(GLBUS_PORT_OUT, 364);
}
DLLEXPORT int APIENTRY wglGetPixelFormat(HDC hdc) {
  _outpw(GLBUS_PORT_OUT, 365);
  return 1;
}
DLLEXPORT BOOL APIENTRY wglSetPixelFormat(HDC hdc, int iPixelFormat,
                                          const PIXELFORMATDESCRIPTOR *ppfd) {
  _outpw(GLBUS_PORT_OUT, 366);
  return 1;
}
DLLEXPORT void APIENTRY wglSwapBuffers() { _outpw(GLBUS_PORT_OUT, 367); }
