import { translateVirtualToPhysical } from './utils';

export const COMMBUS_PORT_IN = 0x504;
export const COMMBUS_PORT_OUT = 0x500;
export const COMMBUS_IRQ = 5;
export const GLBUS_PORT_IN = 0x516;

let glCanvas: HTMLCanvasElement | null = null;
let gl: WebGLRenderingContext | null = null;

const colors: [number, number, number][] = [];
const positions: [number, number][] = [];

const glFuncTable: { name: string; params: { type: string; name: string }[]; run?: (params: number[]) => void }[] = [
  { name: 'DllInitialize', params: [] },
  { name: 'glDebugEntry', params: [] },
  { name: 'GlmfBeginGlsBlock', params: [] },
  { name: 'GlmfCloseMetaFile', params: [] },
  { name: 'GlmfEndGlsBlock', params: [] },
  { name: 'GlmfEndPlayback', params: [] },
  { name: 'GlmfInitPlayback', params: [] },
  { name: 'GlmfPlayGlsRecord', params: [] },
  { name: 'glAccum', params: [] },
  { name: 'glAlphaFunc', params: [] },
  { name: 'glAreTexturesResident', params: [] },
  { name: 'glArrayElement', params: [] },
  {
    name: 'glBegin',
    params: [{ type: 'GLenum', name: 'mode' }],
    run: () => {
      colors.splice(0, colors.length);
      positions.splice(0, colors.length);
    },
  },
  { name: 'glBindTexture', params: [] },
  { name: 'glBitmap', params: [] },
  { name: 'glBlendFunc', params: [] },
  { name: 'glCallList', params: [] },
  { name: 'glCallLists', params: [] },
  {
    name: 'glClear',
    params: [{ type: 'GLbitfield', name: 'mask' }],
    run: params => {
      if (!gl) return;
      gl.clear(params[0]);
    },
  },
  { name: 'glClearAccum', params: [] },
  { name: 'glClearColor', params: [] },
  { name: 'glClearDepth', params: [] },
  { name: 'glClearIndex', params: [] },
  { name: 'glClearStencil', params: [] },
  { name: 'glClipPlane', params: [] },
  {
    name: 'glColor3b',
    params: [
      { type: 'GLbyte', name: 'red' },
      { type: 'GLbyte', name: 'green' },
      { type: 'GLbyte', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3bv', params: [] },
  {
    name: 'glColor3d',
    params: [
      { type: 'GLdouble', name: 'red' },
      { type: 'GLdouble', name: 'green' },
      { type: 'GLdouble', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3dv', params: [] },
  {
    name: 'glColor3f',
    params: [
      { type: 'GLfloat', name: 'red' },
      { type: 'GLfloat', name: 'green' },
      { type: 'GLfloat', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3fv', params: [] },
  {
    name: 'glColor3i',
    params: [
      { type: 'GLint', name: 'red' },
      { type: 'GLint', name: 'green' },
      { type: 'GLint', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3iv', params: [] },
  {
    name: 'glColor3s',
    params: [
      { type: 'GLshort', name: 'red' },
      { type: 'GLshort', name: 'green' },
      { type: 'GLshort', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3sv', params: [] },
  {
    name: 'glColor3ub',
    params: [
      { type: 'GLubyte', name: 'red' },
      { type: 'GLubyte', name: 'green' },
      { type: 'GLubyte', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3ubv', params: [] },
  {
    name: 'glColor3ui',
    params: [
      { type: 'GLuint', name: 'red' },
      { type: 'GLuint', name: 'green' },
      { type: 'GLuint', name: 'blue' },
    ],
    run: params => colors.push(params),
  },
  { name: 'glColor3uiv', params: [] },
  { name: 'glColor3us', params: [] },
  { name: 'glColor3usv', params: [] },
  { name: 'glColor4b', params: [] },
  { name: 'glColor4bv', params: [] },
  { name: 'glColor4d', params: [] },
  { name: 'glColor4dv', params: [] },
  { name: 'glColor4f', params: [] },
  { name: 'glColor4fv', params: [] },
  { name: 'glColor4i', params: [] },
  { name: 'glColor4iv', params: [] },
  { name: 'glColor4s', params: [] },
  { name: 'glColor4sv', params: [] },
  { name: 'glColor4ub', params: [] },
  { name: 'glColor4ubv', params: [] },
  { name: 'glColor4ui', params: [] },
  { name: 'glColor4uiv', params: [] },
  { name: 'glColor4us', params: [] },
  { name: 'glColor4usv', params: [] },
  { name: 'glColorMask', params: [] },
  { name: 'glColorMaterial', params: [] },
  { name: 'glColorPointer', params: [] },
  { name: 'glCopyPixels', params: [] },
  { name: 'glCopyTexImage1D', params: [] },
  { name: 'glCopyTexImage2D', params: [] },
  { name: 'glCopyTexSubImage1D', params: [] },
  { name: 'glCopyTexSubImage2D', params: [] },
  { name: 'glCullFace', params: [] },
  { name: 'glDeleteLists', params: [] },
  { name: 'glDeleteTextures', params: [] },
  { name: 'glDepthFunc', params: [] },
  { name: 'glDepthMask', params: [] },
  { name: 'glDepthRange', params: [] },
  { name: 'glDisable', params: [] },
  { name: 'glDisableClientState', params: [] },
  { name: 'glDrawArrays', params: [] },
  { name: 'glDrawBuffer', params: [] },
  { name: 'glDrawElements', params: [] },
  { name: 'glDrawPixels', params: [] },
  { name: 'glEdgeFlag', params: [] },
  { name: 'glEdgeFlagPointer', params: [] },
  { name: 'glEdgeFlagv', params: [] },
  { name: 'glEnable', params: [] },
  { name: 'glEnableClientState', params: [] },
  { name: 'glEnd', params: [] },
  { name: 'glEndList', params: [] },
  { name: 'glEvalCoord1d', params: [] },
  { name: 'glEvalCoord1dv', params: [] },
  { name: 'glEvalCoord1f', params: [] },
  { name: 'glEvalCoord1fv', params: [] },
  { name: 'glEvalCoord2d', params: [] },
  { name: 'glEvalCoord2dv', params: [] },
  { name: 'glEvalCoord2f', params: [] },
  { name: 'glEvalCoord2fv', params: [] },
  { name: 'glEvalMesh1', params: [] },
  { name: 'glEvalMesh2', params: [] },
  { name: 'glEvalPoint1', params: [] },
  { name: 'glEvalPoint2', params: [] },
  { name: 'glFeedbackBuffer', params: [] },
  { name: 'glFinish', params: [] },
  {
    name: 'glFlush',
    params: [],
    run: () => {
      console.log({ colors, positions });
      if (!gl) return;

      const vertex_buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions.flat()), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      const color_buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors.flat()), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      const vertCode = `precision mediump float;
                        attribute vec2 coordinates;
                        attribute vec3 colors;
                        varying vec3 color;
                        void main(void) {
                          color = colors;
                          gl_Position = vec4(vec3(coordinates, 0.0), 1.0);
                        }`;
      const vertShader = gl.createShader(gl.VERTEX_SHADER);
      if (!vertShader) return;
      vertShader && gl.shaderSource(vertShader, vertCode);
      vertShader && gl.compileShader(vertShader);

      const fragCode = `precision mediump float;
                        varying vec3 color;
                        void main(void) { 
                          gl_FragColor = vec4(color, 1.0);
                        }`;
      const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (!fragShader) return;
      fragShader && gl.shaderSource(fragShader, fragCode);
      fragShader && gl.compileShader(fragShader);

      const shaderProgram = gl.createProgram();
      if (!shaderProgram) return;
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);

      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
      const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
      gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(coord);

      gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
      const color = gl.getAttribLocation(shaderProgram, 'colors');
      gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(color);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  },
  { name: 'glFogf', params: [] },
  { name: 'glFogfv', params: [] },
  { name: 'glFogi', params: [] },
  { name: 'glFogiv', params: [] },
  { name: 'glFrontFace', params: [] },
  { name: 'glFrustum', params: [] },
  { name: 'glGenLists', params: [] },
  { name: 'glGenTextures', params: [] },
  { name: 'glGetBooleanv', params: [] },
  { name: 'glGetClipPlane', params: [] },
  { name: 'glGetDoublev', params: [] },
  { name: 'glGetError', params: [] },
  { name: 'glGetFloatv', params: [] },
  { name: 'glGetIntegerv', params: [] },
  { name: 'glGetLightfv', params: [] },
  { name: 'glGetLightiv', params: [] },
  { name: 'glGetMapdv', params: [] },
  { name: 'glGetMapfv', params: [] },
  { name: 'glGetMapiv', params: [] },
  { name: 'glGetMaterialfv', params: [] },
  { name: 'glGetMaterialiv', params: [] },
  { name: 'glGetPixelMapfv', params: [] },
  { name: 'glGetPixelMapuiv', params: [] },
  { name: 'glGetPixelMapusv', params: [] },
  { name: 'glGetPointerv', params: [] },
  { name: 'glGetPolygonStipple', params: [] },
  { name: 'glGetString', params: [] },
  { name: 'glGetTexEnvfv', params: [] },
  { name: 'glGetTexEnviv', params: [] },
  { name: 'glGetTexGendv', params: [] },
  { name: 'glGetTexGenfv', params: [] },
  { name: 'glGetTexGeniv', params: [] },
  { name: 'glGetTexImage', params: [] },
  { name: 'glGetTexLevelParameterfv', params: [] },
  { name: 'glGetTexLevelParameteriv', params: [] },
  { name: 'glGetTexParameterfv', params: [] },
  { name: 'glGetTexParameteriv', params: [] },
  { name: 'glHint', params: [] },
  { name: 'glIndexMask', params: [] },
  { name: 'glIndexPointer', params: [] },
  { name: 'glIndexd', params: [] },
  { name: 'glIndexdv', params: [] },
  { name: 'glIndexf', params: [] },
  { name: 'glIndexfv', params: [] },
  { name: 'glIndexi', params: [] },
  { name: 'glIndexiv', params: [] },
  { name: 'glIndexs', params: [] },
  { name: 'glIndexsv', params: [] },
  { name: 'glIndexub', params: [] },
  { name: 'glIndexubv', params: [] },
  { name: 'glInitNames', params: [] },
  { name: 'glInterleavedArrays', params: [] },
  { name: 'glIsEnabled', params: [] },
  { name: 'glIsList', params: [] },
  { name: 'glIsTexture', params: [] },
  { name: 'glLightModelf', params: [] },
  { name: 'glLightModelfv', params: [] },
  { name: 'glLightModeli', params: [] },
  { name: 'glLightModeliv', params: [] },
  { name: 'glLightf', params: [] },
  { name: 'glLightfv', params: [] },
  { name: 'glLighti', params: [] },
  { name: 'glLightiv', params: [] },
  { name: 'glLineStipple', params: [] },
  { name: 'glLineWidth', params: [] },
  { name: 'glListBase', params: [] },
  { name: 'glLoadIdentity', params: [] },
  { name: 'glLoadMatrixd', params: [] },
  { name: 'glLoadMatrixf', params: [] },
  { name: 'glLoadName', params: [] },
  { name: 'glLogicOp', params: [] },
  { name: 'glMap1d', params: [] },
  { name: 'glMap1f', params: [] },
  { name: 'glMap2d', params: [] },
  { name: 'glMap2f', params: [] },
  { name: 'glMapGrid1d', params: [] },
  { name: 'glMapGrid1f', params: [] },
  { name: 'glMapGrid2d', params: [] },
  { name: 'glMapGrid2f', params: [] },
  { name: 'glMaterialf', params: [] },
  { name: 'glMaterialfv', params: [] },
  { name: 'glMateriali', params: [] },
  { name: 'glMaterialiv', params: [] },
  { name: 'glMatrixMode', params: [] },
  { name: 'glMultMatrixd', params: [] },
  { name: 'glMultMatrixf', params: [] },
  { name: 'glNewList', params: [] },
  { name: 'glNormal3b', params: [] },
  { name: 'glNormal3bv', params: [] },
  { name: 'glNormal3d', params: [] },
  { name: 'glNormal3dv', params: [] },
  { name: 'glNormal3f', params: [] },
  { name: 'glNormal3fv', params: [] },
  { name: 'glNormal3i', params: [] },
  { name: 'glNormal3iv', params: [] },
  { name: 'glNormal3s', params: [] },
  { name: 'glNormal3sv', params: [] },
  { name: 'glNormalPointer', params: [] },
  { name: 'glOrtho', params: [] },
  { name: 'glPassThrough', params: [] },
  { name: 'glPixelMapfv', params: [] },
  { name: 'glPixelMapuiv', params: [] },
  { name: 'glPixelMapusv', params: [] },
  { name: 'glPixelStoref', params: [] },
  { name: 'glPixelStorei', params: [] },
  { name: 'glPixelTransferf', params: [] },
  { name: 'glPixelTransferi', params: [] },
  { name: 'glPixelZoom', params: [] },
  { name: 'glPointSize', params: [] },
  { name: 'glPolygonMode', params: [] },
  { name: 'glPolygonOffset', params: [] },
  { name: 'glPolygonStipple', params: [] },
  { name: 'glPopAttrib', params: [] },
  { name: 'glPopClientAttrib', params: [] },
  { name: 'glPopMatrix', params: [] },
  { name: 'glPopName', params: [] },
  { name: 'glPrioritizeTextures', params: [] },
  { name: 'glPushAttrib', params: [] },
  { name: 'glPushClientAttrib', params: [] },
  { name: 'glPushMatrix', params: [] },
  { name: 'glPushName', params: [] },
  { name: 'glRasterPos2d', params: [] },
  { name: 'glRasterPos2dv', params: [] },
  { name: 'glRasterPos2f', params: [] },
  { name: 'glRasterPos2fv', params: [] },
  { name: 'glRasterPos2i', params: [] },
  { name: 'glRasterPos2iv', params: [] },
  { name: 'glRasterPos2s', params: [] },
  { name: 'glRasterPos2sv', params: [] },
  { name: 'glRasterPos3d', params: [] },
  { name: 'glRasterPos3dv', params: [] },
  { name: 'glRasterPos3f', params: [] },
  { name: 'glRasterPos3fv', params: [] },
  { name: 'glRasterPos3i', params: [] },
  { name: 'glRasterPos3iv', params: [] },
  { name: 'glRasterPos3s', params: [] },
  { name: 'glRasterPos3sv', params: [] },
  { name: 'glRasterPos4d', params: [] },
  { name: 'glRasterPos4dv', params: [] },
  { name: 'glRasterPos4f', params: [] },
  { name: 'glRasterPos4fv', params: [] },
  { name: 'glRasterPos4i', params: [] },
  { name: 'glRasterPos4iv', params: [] },
  { name: 'glRasterPos4s', params: [] },
  { name: 'glRasterPos4sv', params: [] },
  { name: 'glReadBuffer', params: [] },
  { name: 'glReadPixels', params: [] },
  { name: 'glRectd', params: [] },
  { name: 'glRectdv', params: [] },
  { name: 'glRectf', params: [] },
  { name: 'glRectfv', params: [] },
  { name: 'glRecti', params: [] },
  { name: 'glRectiv', params: [] },
  { name: 'glRects', params: [] },
  { name: 'glRectsv', params: [] },
  { name: 'glRenderMode', params: [] },
  { name: 'glRotated', params: [] },
  { name: 'glRotatef', params: [] },
  { name: 'glScaled', params: [] },
  { name: 'glScalef', params: [] },
  { name: 'glScissor', params: [] },
  { name: 'glSelectBuffer', params: [] },
  { name: 'glShadeModel', params: [] },
  { name: 'glStencilFunc', params: [] },
  { name: 'glStencilMask', params: [] },
  { name: 'glStencilOp', params: [] },
  { name: 'glTexCoord1d', params: [] },
  { name: 'glTexCoord1dv', params: [] },
  { name: 'glTexCoord1f', params: [] },
  { name: 'glTexCoord1fv', params: [] },
  { name: 'glTexCoord1i', params: [] },
  { name: 'glTexCoord1iv', params: [] },
  { name: 'glTexCoord1s', params: [] },
  { name: 'glTexCoord1sv', params: [] },
  { name: 'glTexCoord2d', params: [] },
  { name: 'glTexCoord2dv', params: [] },
  { name: 'glTexCoord2f', params: [] },
  { name: 'glTexCoord2fv', params: [] },
  { name: 'glTexCoord2i', params: [] },
  { name: 'glTexCoord2iv', params: [] },
  { name: 'glTexCoord2s', params: [] },
  { name: 'glTexCoord2sv', params: [] },
  { name: 'glTexCoord3d', params: [] },
  { name: 'glTexCoord3dv', params: [] },
  { name: 'glTexCoord3f', params: [] },
  { name: 'glTexCoord3fv', params: [] },
  { name: 'glTexCoord3i', params: [] },
  { name: 'glTexCoord3iv', params: [] },
  { name: 'glTexCoord3s', params: [] },
  { name: 'glTexCoord3sv', params: [] },
  { name: 'glTexCoord4d', params: [] },
  { name: 'glTexCoord4dv', params: [] },
  { name: 'glTexCoord4f', params: [] },
  { name: 'glTexCoord4fv', params: [] },
  { name: 'glTexCoord4i', params: [] },
  { name: 'glTexCoord4iv', params: [] },
  { name: 'glTexCoord4s', params: [] },
  { name: 'glTexCoord4sv', params: [] },
  { name: 'glTexCoordPointer', params: [] },
  { name: 'glTexEnvf', params: [] },
  { name: 'glTexEnvfv', params: [] },
  { name: 'glTexEnvi', params: [] },
  { name: 'glTexEnviv', params: [] },
  { name: 'glTexGend', params: [] },
  { name: 'glTexGendv', params: [] },
  { name: 'glTexGenf', params: [] },
  { name: 'glTexGenfv', params: [] },
  { name: 'glTexGeni', params: [] },
  { name: 'glTexGeniv', params: [] },
  { name: 'glTexImage1D', params: [] },
  { name: 'glTexImage2D', params: [] },
  { name: 'glTexParameterf', params: [] },
  { name: 'glTexParameterfv', params: [] },
  { name: 'glTexParameteri', params: [] },
  { name: 'glTexParameteriv', params: [] },
  { name: 'glTexSubImage1D', params: [] },
  { name: 'glTexSubImage2D', params: [] },
  { name: 'glTranslated', params: [] },
  { name: 'glTranslatef', params: [] },
  {
    name: 'glVertex2d',
    params: [
      { type: 'GLdouble', name: 'x' },
      { type: 'GLdouble', name: 'y' },
    ],
    run: params => positions.push(params),
  },
  { name: 'glVertex2dv', params: [] },
  {
    name: 'glVertex2f',
    params: [
      { type: 'GLfloat', name: 'x' },
      { type: 'GLfloat', name: 'y' },
    ],
    run: params => positions.push(params),
  },
  { name: 'glVertex2fv', params: [] },
  {
    name: 'glVertex2i',
    params: [
      { type: 'GLint', name: 'x' },
      { type: 'GLint', name: 'y' },
    ],
    run: params => positions.push(params),
  },
  { name: 'glVertex2iv', params: [] },
  {
    name: 'glVertex2s',
    params: [
      { type: 'GLshort', name: 'x' },
      { type: 'GLshort', name: 'y' },
    ],
    run: params => positions.push(params),
  },
  { name: 'glVertex2sv', params: [] },
  { name: 'glVertex3d', params: [] },
  { name: 'glVertex3dv', params: [] },
  { name: 'glVertex3f', params: [] },
  { name: 'glVertex3fv', params: [] },
  { name: 'glVertex3i', params: [] },
  { name: 'glVertex3iv', params: [] },
  { name: 'glVertex3s', params: [] },
  { name: 'glVertex3sv', params: [] },
  { name: 'glVertex4d', params: [] },
  { name: 'glVertex4dv', params: [] },
  { name: 'glVertex4f', params: [] },
  { name: 'glVertex4fv', params: [] },
  { name: 'glVertex4i', params: [] },
  { name: 'glVertex4iv', params: [] },
  { name: 'glVertex4s', params: [] },
  { name: 'glVertex4sv', params: [] },
  { name: 'glVertexPointer', params: [] },
  {
    name: 'glViewport',
    params: [
      { type: 'GLint', name: 'x' },
      { type: 'GLint', name: 'y' },
      { type: 'GLsizei', name: 'width' },
      { type: 'GLsizei', name: 'height' },
    ],
    run: params => {
      if (!glCanvas) return;
      glCanvas.width = params[2];
      glCanvas.height = params[3];
    },
  },
  { name: 'wglCopyContext', params: [] },
  {
    name: 'wglCreateContext',
    params: [],
    run: () => {
      glCanvas = document.createElement('canvas');
      glCanvas.style.position = 'absolute';
      glCanvas.style.top = '0px';
      glCanvas.style.left = '0px';
      glCanvas.style.pointerEvents = 'none';
      document.body.appendChild(glCanvas);
      gl = glCanvas.getContext('webgl', { alpha: false });
    },
  },
  { name: 'wglCreateLayerContext', params: [] },
  { name: 'wglDeleteContext', params: [] },
  { name: 'wglGetCurrentContext', params: [] },
  { name: 'wglGetCurrentDC', params: [] },
  { name: 'wglGetProcAddress', params: [] },
  { name: 'wglMakeCurrent', params: [] },
  { name: 'wglShareLists', params: [] },
  { name: 'wglUseFontBitmapsA', params: [] },
  { name: 'wglUseFontBitmapsW', params: [] },
  { name: 'wglUseFontOutlinesA', params: [] },
  { name: 'wglUseFontOutlinesW', params: [] },
  { name: 'wglDescribeLayerPlane', params: [] },
  { name: 'wglSetLayerPaletteEntries', params: [] },
  { name: 'wglGetLayerPaletteEntries', params: [] },
  { name: 'wglRealizeLayerPalette', params: [] },
  { name: 'wglSwapLayerBuffers', params: [] },
  { name: 'wglChoosePixelFormat', params: [] },
  { name: 'wglDescribePixelFormat', params: [] },
  { name: 'wglGetDefaultProcAddress', params: [] },
  { name: 'wglGetPixelFormat', params: [] },
  { name: 'wglSetPixelFormat', params: [] },
  { name: 'wglSwapBuffers', params: [] },
];

export class CommBus {
  outQueue: number[][] = [];
  inQueue: number[] = [];

  currentGLCommand: { id: number; name: string; params: { type: string; name: string; value: number }[] } | null = null;

  constructor(public cpu: any, onPacket: (pkg: ArrayBuffer) => void) {
    cpu.io.register_write(
      GLBUS_PORT_IN,
      this,
      (pkg: number) => {},
      (pkg: number) => {
        this.currentGLCommand = { id: pkg, name: glFuncTable[pkg].name, params: [] };
        if (this.currentGLCommand.params.length === glFuncTable[this.currentGLCommand.id].params.length) {
          console.log(this.currentGLCommand);
          glFuncTable[this.currentGLCommand.id].run?.(this.currentGLCommand.params.map(p => p.value));
        }
      },
      (pkg: number) => {
        this.currentGLCommand?.params.push({ ...glFuncTable[this.currentGLCommand.id].params[this.currentGLCommand.params.length], value: pkg });
        if (this.currentGLCommand && this.currentGLCommand.params.length === glFuncTable[this.currentGLCommand.id].params.length) {
          console.log(this.currentGLCommand);
          glFuncTable[this.currentGLCommand.id].run?.(this.currentGLCommand.params.map(p => p.value));
        }
      },
    );

    cpu.io.register_write(
      COMMBUS_PORT_IN,
      this,
      () => console.warn('Invalid 8 bit write!'),
      (pkg: number) => {
        const addr = translateVirtualToPhysical(cpu.reg32[3], cpu);
        if (pkg === 0) {
          const string = new TextDecoder()
            .decode(new Int8Array(new Array(cpu.reg32[1]).fill(0).map((v, i) => cpu.mem8[addr + i])).buffer)
            .replace('\u0000', '');
          eval(string);
          cpu.reg32[0] = 0;
        }
      },
      (pkg: number) => {
        const byte = pkg & 0xff;
        const avail = pkg >> 8;
        if (avail > 0) {
          this.inQueue.push(byte);
        } else if (this.inQueue.length > 0) {
          onPacket(new Uint8ClampedArray(this.inQueue).buffer);
          this.inQueue = [];
        }
      },
    );

    cpu.io.register_read(
      COMMBUS_PORT_OUT,
      this,
      () => {
        console.warn('Invalid 8 bit read!');
        return 0;
      },
      () => {
        console.warn('Invalid 16 bit read!');
        return 0;
      },
      () => {
        const toSend = (this.outQueue[0]?.length > 0 && this.outQueue[0]) || this.outQueue.shift();
        if (!toSend) return 0;

        const byte = toSend.shift();
        if (byte === undefined) return 0;

        return byte | ((toSend.length + 1) << 8);
      },
    );
  }

  sendData(buffer: ArrayBuffer) {
    const bytes = new Uint8ClampedArray(buffer);
    this.outQueue.push(Array.from(bytes));
    this.cpu.device_lower_irq(COMMBUS_IRQ);
    this.cpu.device_raise_irq(COMMBUS_IRQ);
  }
}
