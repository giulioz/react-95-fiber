import { RpcAdapter } from '../RpcAdapter';
import { readMemFloat, readMemString, translateVirtualToPhysical } from '../utils';

const callTable = [
  'DllInitialize',
  'glDebugEntry',
  'GlmfBeginGlsBlock',
  'GlmfCloseMetaFile',
  'GlmfEndGlsBlock',
  'GlmfEndPlayback',
  'GlmfInitPlayback',
  'GlmfPlayGlsRecord',
  'glAccum',
  'glAlphaFunc',
  'glAreTexturesResident',
  'glArrayElement',
  'glBegin',
  'glBindTexture',
  'glBitmap',
  'glBlendFunc',
  'glCallList',
  'glCallLists',
  'glClear',
  'glClearAccum',
  'glClearColor',
  'glClearDepth',
  'glClearIndex',
  'glClearStencil',
  'glClipPlane',
  'glColor3b',
  'glColor3bv',
  'glColor3d',
  'glColor3dv',
  'glColor3f',
  'glColor3fv',
  'glColor3i',
  'glColor3iv',
  'glColor3s',
  'glColor3sv',
  'glColor3ub',
  'glColor3ubv',
  'glColor3ui',
  'glColor3uiv',
  'glColor3us',
  'glColor3usv',
  'glColor4b',
  'glColor4bv',
  'glColor4d',
  'glColor4dv',
  'glColor4f',
  'glColor4fv',
  'glColor4i',
  'glColor4iv',
  'glColor4s',
  'glColor4sv',
  'glColor4ub',
  'glColor4ubv',
  'glColor4ui',
  'glColor4uiv',
  'glColor4us',
  'glColor4usv',
  'glColorMask',
  'glColorMaterial',
  'glColorPointer',
  'glCopyPixels',
  'glCopyTexImage1D',
  'glCopyTexImage2D',
  'glCopyTexSubImage1D',
  'glCopyTexSubImage2D',
  'glCullFace',
  'glDeleteLists',
  'glDeleteTextures',
  'glDepthFunc',
  'glDepthMask',
  'glDepthRange',
  'glDisable',
  'glDisableClientState',
  'glDrawArrays',
  'glDrawBuffer',
  'glDrawElements',
  'glDrawPixels',
  'glEdgeFlag',
  'glEdgeFlagPointer',
  'glEdgeFlagv',
  'glEnable',
  'glEnableClientState',
  'glEnd',
  'glEndList',
  'glEvalCoord1d',
  'glEvalCoord1dv',
  'glEvalCoord1f',
  'glEvalCoord1fv',
  'glEvalCoord2d',
  'glEvalCoord2dv',
  'glEvalCoord2f',
  'glEvalCoord2fv',
  'glEvalMesh1',
  'glEvalMesh2',
  'glEvalPoint1',
  'glEvalPoint2',
  'glFeedbackBuffer',
  'glFinish',
  'glFlush',
  'glFogf',
  'glFogfv',
  'glFogi',
  'glFogiv',
  'glFrontFace',
  'glFrustum',
  'glGenLists',
  'glGenTextures',
  'glGetBooleanv',
  'glGetClipPlane',
  'glGetDoublev',
  'glGetError',
  'glGetFloatv',
  'glGetIntegerv',
  'glGetLightfv',
  'glGetLightiv',
  'glGetMapdv',
  'glGetMapfv',
  'glGetMapiv',
  'glGetMaterialfv',
  'glGetMaterialiv',
  'glGetPixelMapfv',
  'glGetPixelMapuiv',
  'glGetPixelMapusv',
  'glGetPointerv',
  'glGetPolygonStipple',
  'glGetString',
  'glGetTexEnvfv',
  'glGetTexEnviv',
  'glGetTexGendv',
  'glGetTexGenfv',
  'glGetTexGeniv',
  'glGetTexImage',
  'glGetTexLevelParameterfv',
  'glGetTexLevelParameteriv',
  'glGetTexParameterfv',
  'glGetTexParameteriv',
  'glHint',
  'glIndexMask',
  'glIndexPointer',
  'glIndexd',
  'glIndexdv',
  'glIndexf',
  'glIndexfv',
  'glIndexi',
  'glIndexiv',
  'glIndexs',
  'glIndexsv',
  'glIndexub',
  'glIndexubv',
  'glInitNames',
  'glInterleavedArrays',
  'glIsEnabled',
  'glIsList',
  'glIsTexture',
  'glLightModelf',
  'glLightModelfv',
  'glLightModeli',
  'glLightModeliv',
  'glLightf',
  'glLightfv',
  'glLighti',
  'glLightiv',
  'glLineStipple',
  'glLineWidth',
  'glListBase',
  'glLoadIdentity',
  'glLoadMatrixd',
  'glLoadMatrixf',
  'glLoadName',
  'glLogicOp',
  'glMap1d',
  'glMap1f',
  'glMap2d',
  'glMap2f',
  'glMapGrid1d',
  'glMapGrid1f',
  'glMapGrid2d',
  'glMapGrid2f',
  'glMaterialf',
  'glMaterialfv',
  'glMateriali',
  'glMaterialiv',
  'glMatrixMode',
  'glMultMatrixd',
  'glMultMatrixf',
  'glNewList',
  'glNormal3b',
  'glNormal3bv',
  'glNormal3d',
  'glNormal3dv',
  'glNormal3f',
  'glNormal3fv',
  'glNormal3i',
  'glNormal3iv',
  'glNormal3s',
  'glNormal3sv',
  'glNormalPointer',
  'glOrtho',
  'glPassThrough',
  'glPixelMapfv',
  'glPixelMapuiv',
  'glPixelMapusv',
  'glPixelStoref',
  'glPixelStorei',
  'glPixelTransferf',
  'glPixelTransferi',
  'glPixelZoom',
  'glPointSize',
  'glPolygonMode',
  'glPolygonOffset',
  'glPolygonStipple',
  'glPopAttrib',
  'glPopClientAttrib',
  'glPopMatrix',
  'glPopName',
  'glPrioritizeTextures',
  'glPushAttrib',
  'glPushClientAttrib',
  'glPushMatrix',
  'glPushName',
  'glRasterPos2d',
  'glRasterPos2dv',
  'glRasterPos2f',
  'glRasterPos2fv',
  'glRasterPos2i',
  'glRasterPos2iv',
  'glRasterPos2s',
  'glRasterPos2sv',
  'glRasterPos3d',
  'glRasterPos3dv',
  'glRasterPos3f',
  'glRasterPos3fv',
  'glRasterPos3i',
  'glRasterPos3iv',
  'glRasterPos3s',
  'glRasterPos3sv',
  'glRasterPos4d',
  'glRasterPos4dv',
  'glRasterPos4f',
  'glRasterPos4fv',
  'glRasterPos4i',
  'glRasterPos4iv',
  'glRasterPos4s',
  'glRasterPos4sv',
  'glReadBuffer',
  'glReadPixels',
  'glRectd',
  'glRectdv',
  'glRectf',
  'glRectfv',
  'glRecti',
  'glRectiv',
  'glRects',
  'glRectsv',
  'glRenderMode',
  'glRotated',
  'glRotatef',
  'glScaled',
  'glScalef',
  'glScissor',
  'glSelectBuffer',
  'glShadeModel',
  'glStencilFunc',
  'glStencilMask',
  'glStencilOp',
  'glTexCoord1d',
  'glTexCoord1dv',
  'glTexCoord1f',
  'glTexCoord1fv',
  'glTexCoord1i',
  'glTexCoord1iv',
  'glTexCoord1s',
  'glTexCoord1sv',
  'glTexCoord2d',
  'glTexCoord2dv',
  'glTexCoord2f',
  'glTexCoord2fv',
  'glTexCoord2i',
  'glTexCoord2iv',
  'glTexCoord2s',
  'glTexCoord2sv',
  'glTexCoord3d',
  'glTexCoord3dv',
  'glTexCoord3f',
  'glTexCoord3fv',
  'glTexCoord3i',
  'glTexCoord3iv',
  'glTexCoord3s',
  'glTexCoord3sv',
  'glTexCoord4d',
  'glTexCoord4dv',
  'glTexCoord4f',
  'glTexCoord4fv',
  'glTexCoord4i',
  'glTexCoord4iv',
  'glTexCoord4s',
  'glTexCoord4sv',
  'glTexCoordPointer',
  'glTexEnvf',
  'glTexEnvfv',
  'glTexEnvi',
  'glTexEnviv',
  'glTexGend',
  'glTexGendv',
  'glTexGenf',
  'glTexGenfv',
  'glTexGeni',
  'glTexGeniv',
  'glTexImage1D',
  'glTexImage2D',
  'glTexParameterf',
  'glTexParameterfv',
  'glTexParameteri',
  'glTexParameteriv',
  'glTexSubImage1D',
  'glTexSubImage2D',
  'glTranslated',
  'glTranslatef',
  'glVertex2d',
  'glVertex2dv',
  'glVertex2f',
  'glVertex2fv',
  'glVertex2i',
  'glVertex2iv',
  'glVertex2s',
  'glVertex2sv',
  'glVertex3d',
  'glVertex3dv',
  'glVertex3f',
  'glVertex3fv',
  'glVertex3i',
  'glVertex3iv',
  'glVertex3s',
  'glVertex3sv',
  'glVertex4d',
  'glVertex4dv',
  'glVertex4f',
  'glVertex4fv',
  'glVertex4i',
  'glVertex4iv',
  'glVertex4s',
  'glVertex4sv',
  'glVertexPointer',
  'glViewport',
  'wglCopyContext',
  'wglCreateContext',
  'wglCreateLayerContext',
  'wglDeleteContext',
  'wglGetCurrentContext',
  'wglGetCurrentDC',
  'wglGetProcAddress',
  'wglMakeCurrent',
  'wglShareLists',
  'wglUseFontBitmapsA',
  'wglUseFontBitmapsW',
  'wglUseFontOutlinesA',
  'wglUseFontOutlinesW',
  'wglDescribeLayerPlane',
  'wglSetLayerPaletteEntries',
  'wglGetLayerPaletteEntries',
  'wglRealizeLayerPalette',
  'wglSwapLayerBuffers',
  'wglChoosePixelFormat',
  'wglDescribePixelFormat',
  'wglGetDefaultProcAddress',
  'wglGetPixelFormat',
  'wglSetPixelFormat',
  'wglSwapBuffers',
  'glAddSwapHintRectWIN',
  'glColorTableEXT',
  'glColorSubTableEXT',
] as const;

export class OpenGL32 {
  private paramsAddr = 0;

  hdc = 0;
  positions: number[] = [];
  normals: number[] = [];

  constructor(private rpcAdapter: RpcAdapter) {}

  syscall() {
    const thisTable = this as unknown as { [fn in typeof callTable[number]]: () => void };

    const command = this.rpcAdapter.cpu.reg32[1];

    // window.toImplement = window.toImplement || new Set();
    // console.log(command, callTable[command]);
    // window.toImplement.add(callTable[command]);

    this.paramsAddr = translateVirtualToPhysical(this.rpcAdapter.cpu.reg32[5], this.rpcAdapter.cpu) / 4 + 2;

    if (command === callTable.indexOf('wglGetProcAddress')) {
      const arg = translateVirtualToPhysical(this.rpcAdapter.cpu.mem32s[this.paramsAddr], this.rpcAdapter.cpu);
      const string = readMemString(this.rpcAdapter.cpu, arg);
      console.log('wglGetProcAddress', string);
      this.rpcAdapter.cpu.reg32[0] = 0;
    } else if (thisTable[callTable[command]]) {
      thisTable[callTable[command]]();
    } else {
      console.log('not implemented!', callTable[command]);
    }
  }

  wglDescribePixelFormat() {
    // (int) HDC hdc, int iPixelFormat, UINT nBytes, LPPIXELFORMATDESCRIPTOR ppfd
    const hdc = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const iPixelFormat = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const nBytes = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 2];
    const ppfd = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 3];
    console.log('wglDescribePixelFormat', { hdc, iPixelFormat, nBytes, ppfd });
    this.rpcAdapter.cpu.reg32[0] = 0;
  }

  wglChoosePixelFormat() {
    // (int) HDC hdc, const PIXELFORMATDESCRIPTOR *ppfd
    const hdc = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const ppfd = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    console.log('wglChoosePixelFormat', { hdc, ppfd });
    this.rpcAdapter.cpu.reg32[0] = 0;
  }

  wglSetPixelFormat() {
    // (BOOL) HDC hdc, int iPixelFormat, const PIXELFORMATDESCRIPTOR *ppfd
    const hdc = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const iPixelFormat = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const ppfd = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 2];
    console.log('wglSetPixelFormat', { hdc, iPixelFormat, ppfd });
    this.rpcAdapter.cpu.reg32[0] = 0;
  }

  wglCreateContext() {
    // (HGLRC) HDC a
    const hdc = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    this.hdc = hdc;
    console.log('wglCreateContext', { hdc });
    this.rpcAdapter.cpu.reg32[0] = 1;
  }

  wglMakeCurrent() {
    // (BOOL) HDC a, HGLRC b
    const a = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const b = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    console.log('wglMakeCurrent', { a, b });
    this.rpcAdapter.cpu.reg32[0] = 1;
  }

  glGetString() {
    // (const GLubyte*) GLenum name
    const name = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glGetString', { name });
    this.rpcAdapter.cpu.reg32[0] = 0;
  }

  wglGetCurrentContext() {
    // (HGLRC)
    console.log('wglGetCurrentContext');
    this.rpcAdapter.cpu.reg32[0] = 1;
  }

  wglGetCurrentDC() {
    // (HDC)
    console.log('wglGetCurrentDC');
    this.rpcAdapter.cpu.reg32[0] = this.hdc;
  }

  glClearColor() {
    // (void) GLclampf red, GLclampf green, GLclampf blue, GLclampf alpha
    const red = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 0) * 4);
    const green = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 1) * 4);
    const blue = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 2) * 4);
    const alpha = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 3) * 4);
    console.log('glClearColor', { red, green, blue, alpha });
  }

  glFrontFace() {
    const GL_CW = 0x0900;
    const GL_CCW = 0x0901;

    // (void) GLenum mode
    const mode = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glFrontFace', { mode });
  }

  glDepthFunc() {
    const GL_NEVER = 0x0200;
    const GL_LESS = 0x0201;
    const GL_EQUAL = 0x0202;
    const GL_LEQUAL = 0x0203;
    const GL_GREATER = 0x0204;
    const GL_NOTEQUAL = 0x0205;
    const GL_GEQUAL = 0x0206;
    const GL_ALWAYS = 0x0207;

    // (void) GLenum func
    const func = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glDepthFunc', { func });
  }

  glEnable() {
    // (void) GLenum cap
    const cap = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glEnable', { cap });
  }

  glLightModelfv() {
    const GL_LIGHT_MODEL_AMBIENT = 0x0b53; // 4 floats as params
    const GL_LIGHT_MODEL_LOCAL_VIEWER = 0x0b53; // 1 float as params
    const GL_LIGHT_MODEL_TWO_SIDE = 0x0b52; // 1 float as params

    // (void) GLenum pname, const GLfloat *params
    const pname = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const params = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    console.log('glLightModelfv', { pname, params });
  }

  glLightfv() {
    const GL_LIGHT0 = 0x4000;
    const GL_LIGHT1 = 0x4001;
    const GL_LIGHT2 = 0x4002;
    const GL_LIGHT3 = 0x4003;
    const GL_LIGHT4 = 0x4004;
    const GL_LIGHT5 = 0x4005;
    const GL_LIGHT6 = 0x4006;
    const GL_LIGHT7 = 0x4007;

    const GL_AMBIENT = 0x1200; // 4 floats
    const GL_DIFFUSE = 0x1201; // 4 floats
    const GL_SPECULAR = 0x1202; // 4 floats
    const GL_POSITION = 0x1203; // 4 floats
    const GL_SPOT_DIRECTION = 0x1204; // 3 floats
    const GL_SPOT_EXPONENT = 0x1205; // 1 floats
    const GL_SPOT_CUTOFF = 0x1206; // 1 floats
    const GL_CONSTANT_ATTENUATION = 0x1207; // 1 floats
    const GL_LINEAR_ATTENUATION = 0x1208; // 1 floats
    const GL_QUADRATIC_ATTENUATION = 0x1209; // 1 floats

    // (void) GLenum light, GLenum pname, const GLfloat *params
    const light = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const pname = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const params = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 2];
    console.log('glLightfv', { light, pname, params });
  }

  glCullFace() {
    const GL_FRONT = 0x0404;
    const GL_BACK = 0x0405;
    const GL_FRONT_AND_BACK = 0x0408;

    // (void) GLenum mode
    const mode = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glCullFace', { mode });
  }

  glGenLists() {
    // (GLuint) GLsizei range
    const range = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glGenLists', { range });
  }

  glNewList() {
    const GL_COMPILE = 0x1300;
    const GL_COMPILE_AND_EXECUTE = 0x1301;

    // (void) GLuint list, GLenum mode
    const list = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const mode = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    console.log('glNewList', { list, mode });
  }

  glBegin() {
    const GL_POINTS = 0x0000;
    const GL_LINES = 0x0001;
    const GL_LINE_LOOP = 0x0002;
    const GL_LINE_STRIP = 0x0003;
    const GL_TRIANGLES = 0x0004;
    const GL_TRIANGLE_STRIP = 0x0005;
    const GL_TRIANGLE_FAN = 0x0006;
    const GL_QUADS = 0x0007;
    const GL_QUAD_STRIP = 0x0008;
    const GL_POLYGON = 0x0009;

    // (void) GLenum mode
    const mode = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glBegin', { mode });
  }

  glNormal3f() {
    // (void) GLfloat nx, GLfloat ny, GLfloat nz
    const nx = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 0) * 4);
    const ny = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 1) * 4);
    const nz = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 2) * 4);
    this.normals.push(nx, ny, nz);
    console.log('glNormal3f', { nx, ny, nz });
  }

  glVertex3f() {
    // (void) GLfloat x, GLfloat y, GLfloat z
    const x = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 0) * 4);
    const y = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 1) * 4);
    const z = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 2) * 4);
    this.positions.push(x, y, z);
    console.log('glVertex3f', { x, y, z });
  }

  glEnd() {
    // (void)
    console.log('glEnd');
  }

  glEndList() {
    // (void)
    console.log('glEndList');
  }

  glNormal3fv() {
    // (void) const GLfloat *v
    const v = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const ptrPhysical = translateVirtualToPhysical(v, this.rpcAdapter.cpu);
    const nx = readMemFloat(this.rpcAdapter.cpu, ptrPhysical + 0);
    const ny = readMemFloat(this.rpcAdapter.cpu, ptrPhysical + 4);
    const nz = readMemFloat(this.rpcAdapter.cpu, ptrPhysical + 8);
    this.normals.push(nx, ny, nz);
    console.log('glNormal3fv', { v, nx, ny, nz });
  }

  glVertex3fv() {
    // (void) const GLfloat *v
    const v = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const ptrPhysical = translateVirtualToPhysical(v, this.rpcAdapter.cpu);
    const x = readMemFloat(this.rpcAdapter.cpu, ptrPhysical + 0);
    const y = readMemFloat(this.rpcAdapter.cpu, ptrPhysical + 4);
    const z = readMemFloat(this.rpcAdapter.cpu, ptrPhysical + 8);
    this.positions.push(x, y, z);
    console.log('glVertex3fv', { v, x, y, z });
  }

  glViewport() {
    // (void) GLint x, GLint y, GLsizei width, GLsizei height
    const x = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const y = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const width = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 2];
    const height = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 3];
    console.log('glViewport', { x, y, width, height });
  }

  glClear() {
    const GL_COLOR_BUFFER_BIT = 0x00004000;
    const GL_ACCUM_BUFFER_BIT = 0x00000200;
    const GL_STENCIL_BUFFER_BIT = 0x00000400;
    const GL_DEPTH_BUFFER_BIT = 0x00000100;

    // (void) GLbitfield mask
    const mask = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glClear', { mask });
  }

  glScissor() {
    // (void) GLint x, GLint y, GLsizei width, GLsizei height
    const x = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const y = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const width = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 2];
    const height = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 3];
    console.log('glScissor', { x, y, width, height });
  }

  glFlush() {
    // (void)
    console.log('glFlush');
  }

  glDisable() {
    // (void) GLenum cap
    const cap = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glDisable', { cap });
  }

  glMatrixMode() {
    // (void) GLenum mode
    const mode = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glMatrixMode', { mode });
  }

  glLoadIdentity() {
    // (void)
    console.log('glLoadIdentity');
  }

  glMultMatrixd() {
    // (void) const GLdouble *m
    const m = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glMultMatrixd', { m });
  }

  glTranslatef() {
    // (void) GLfloat x, GLfloat y, GLfloat z
    const x = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 0) * 4);
    const y = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 1) * 4);
    const z = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 2) * 4);
    console.log('glTranslatef', { x, y, z });
  }

  glRotatef() {
    // (void) GLfloat angle, GLfloat x, GLfloat y, GLfloat z
    const angle = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 0) * 4);
    const x = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 1) * 4);
    const y = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 2) * 4);
    const z = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 3) * 4);
    console.log('glRotatef', { angle, x, y, z });
  }

  glMaterialfv() {
    // (void) GLenum face, GLenum pname, const GLfloat *params
    const face = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const pname = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const params = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 2];
    console.log('glMaterialfv', { face, pname, params });
  }

  glMaterialf() {
    // (void) GLenum face, GLenum pname, GLfloat param
    const face = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const pname = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    const param = readMemFloat(this.rpcAdapter.cpu, (this.paramsAddr + 2) * 4);
    console.log('glMaterialf', { face, pname, param });
  }

  glPushMatrix() {
    // (void)
    console.log('glPushMatrix');
  }

  glCallList() {
    // (void) GLuint list
    const list = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('glCallList', { list });
  }

  glPopMatrix() {
    // (void)
    console.log('glPopMatrix');
  }

  glDeleteLists() {
    // (void) GLuint list, GLsizei range
    const list = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    const range = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 1];
    console.log('glDeleteLists', { list, range });
  }

  wglDeleteContext() {
    // (void) HGLRC a
    const a = this.rpcAdapter.cpu.mem32s[this.paramsAddr + 0];
    console.log('wglDeleteContext', { a });
  }
}
