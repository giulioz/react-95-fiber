// The window has a thin-line border.
export const WS_BORDER = 0x00800000;

// The window has a title bar (includes the WS_BORDER style).
export const WS_CAPTION = 0x00c00000;

// The window is a child window. A window with this style cannot have a menu bar. This style cannot be used with the WS_POPUP style.
export const WS_CHILD = 0x40000000;

// Same as the WS_CHILD style.
export const WS_CHILDWINDOW = 0x40000000;

// Excludes the area occupied by child windows when drawing occurs within the parent window. This style is used when creating the parent window.
export const WS_CLIPCHILDREN = 0x02000000;

// Clips child windows relative to each other; that is, when a particular child window receives a WM_PAINT message, the WS_CLIPSIBLINGS style clips all other overlapping child windows out of the region of the child window to be updated. If WS_CLIPSIBLINGS is not specified and child windows overlap, it is possible, when drawing within the client area of a child window, to draw within the client area of a neighboring child window.
export const WS_CLIPSIBLINGS = 0x04000000;

// The window is initially disabled. A disabled window cannot receive input from the user. To change this after a window has been created, use the EnableWindow function.
export const WS_DISABLED = 0x08000000;

// The window has a border of a style typically used with dialog boxes. A window with this style cannot have a title bar.
export const WS_DLGFRAME = 0x00400000;

// The window is the first control of a group of controls. The group consists of this first control and all controls defined after it, up to the next control with the WS_GROUP style. The first control in each group usually has the WS_TABSTOP style so that the user can move from group to group. The user can subsequently change the keyboard focus from one control in the group to the next control in the group by using the direction keys.
// You can turn this style on and off to change dialog box navigation. To change this style after a window has been created, use the SetWindowLong function.
export const WS_GROUP = 0x00020000;

// The window has a horizontal scroll bar.
export const WS_HSCROLL = 0x00100000;

// The window is initially minimized. Same as the WS_MINIMIZE style.
export const WS_ICONIC = 0x20000000;

// The window is initially maximized.
export const WS_MAXIMIZE = 0x01000000;

// The window has a maximize button. Cannot be combined with the WS_EX_CONTEXTHELP style. The WS_SYSMENU style must also be specified.
export const WS_MAXIMIZEBOX = 0x00010000;

// The window is initially minimized. Same as the WS_ICONIC style.
export const WS_MINIMIZE = 0x20000000;

// The window has a minimize button. Cannot be combined with the WS_EX_CONTEXTHELP style. The WS_SYSMENU style must also be specified.
export const WS_MINIMIZEBOX = 0x00020000;

// The window is an overlapped window. An overlapped window has a title bar and a border. Same as the WS_TILED style.
export const WS_OVERLAPPED = 0x00000000;

// The window is a pop-up window. This style cannot be used with the WS_CHILD style.
export const WS_POPUP = 0x80000000;

// The window has a sizing border. Same as the WS_THICKFRAME style.
export const WS_SIZEBOX = 0x00040000;

// The window has a window menu on its title bar. The WS_CAPTION style must also be specified.
export const WS_SYSMENU = 0x00080000;

// The window is a control that can receive the keyboard focus when the user presses the TAB key. Pressing the TAB key changes the keyboard focus to the next control with the WS_TABSTOP style.
// You can turn this style on and off to change dialog box navigation. To change this style after a window has been created, use the SetWindowLong function. For user-created windows and modeless dialogs to work with tab stops, alter the message loop to call the IsDialogMessage function.
export const WS_TABSTOP = 0x00010000;

// The window has a sizing border. Same as the WS_SIZEBOX style.
export const WS_THICKFRAME = 0x00040000;

// The window is an overlapped window. An overlapped window has a title bar and a border. Same as the WS_OVERLAPPED style.
export const WS_TILED = 0x00000000;

// The window is an overlapped window. Same as the WS_OVERLAPPEDWINDOW style.
export const WS_TILEDWINDOW =
  WS_OVERLAPPED |
  WS_CAPTION |
  WS_SYSMENU |
  WS_THICKFRAME |
  WS_MINIMIZEBOX |
  WS_MAXIMIZEBOX;

// The window is initially visible.
// This style can be turned on and off by using the ShowWindow or SetWindowPos function.
export const WS_VISIBLE = 0x10000000;

// The window has a vertical scroll bar.
export const WS_VSCROLL = 0x00200000;

// The window is an overlapped window. Same as the WS_TILEDWINDOW style.
export const WS_OVERLAPPEDWINDOW =
  WS_OVERLAPPED |
  WS_CAPTION |
  WS_SYSMENU |
  WS_THICKFRAME |
  WS_MINIMIZEBOX |
  WS_MAXIMIZEBOX;

// The window is a pop-up window. The WS_CAPTION and WS_POPUPWINDOW styles must be combined to make the window menu visible.
export const WS_POPUPWINDOW = WS_POPUP | WS_BORDER | WS_SYSMENU;

export const WM_APP = 32768;
export const WM_ACTIVATE = 6;
export const WM_ACTIVATEAPP = 28;
export const WM_AFXFIRST = 864;
export const WM_AFXLAST = 895;
export const WM_ASKCBFORMATNAME = 780;
export const WM_CANCELJOURNAL = 75;
export const WM_CANCELMODE = 31;
export const WM_CAPTURECHANGED = 533;
export const WM_CHANGECBCHAIN = 781;
export const WM_CHAR = 258;
export const WM_CHARTOITEM = 47;
export const WM_CHILDACTIVATE = 34;
export const WM_CLEAR = 771;
export const WM_CLOSE = 16;
export const WM_COMMAND = 273;
export const WM_COMMNOTIFY = 68;
export const WM_COMPACTING = 65;
export const WM_COMPAREITEM = 57;
export const WM_CONTEXTMENU = 123;
export const WM_COPY = 769;
export const WM_COPYDATA = 74;
export const WM_CREATE = 1;
export const WM_CTLCOLORBTN = 309;
export const WM_CTLCOLORDLG = 310;
export const WM_CTLCOLOREDIT = 307;
export const WM_CTLCOLORLISTBOX = 308;
export const WM_CTLCOLORMSGBOX = 306;
export const WM_CTLCOLORSCROLLBAR = 311;
export const WM_CTLCOLORSTATIC = 312;
export const WM_CUT = 768;
export const WM_DEADCHAR = 259;
export const WM_DELETEITEM = 45;
export const WM_DESTROY = 2;
export const WM_DESTROYCLIPBOARD = 775;
export const WM_DEVICECHANGE = 537;
export const WM_DEVMODECHANGE = 27;
export const WM_DISPLAYCHANGE = 126;
export const WM_DRAWCLIPBOARD = 776;
export const WM_DRAWITEM = 43;
export const WM_DROPFILES = 563;
export const WM_ENABLE = 10;
export const WM_ENDSESSION = 22;
export const WM_ENTERIDLE = 289;
export const WM_ENTERMENULOOP = 529;
export const WM_ENTERSIZEMOVE = 561;
export const WM_ERASEBKGND = 20;
export const WM_EXITMENULOOP = 530;
export const WM_EXITSIZEMOVE = 562;
export const WM_FONTCHANGE = 29;
export const WM_GETDLGCODE = 135;
export const WM_GETFONT = 49;
export const WM_GETHOTKEY = 51;
export const WM_GETICON = 127;
export const WM_GETMINMAXINFO = 36;
export const WM_GETTEXT = 13;
export const WM_GETTEXTLENGTH = 14;
export const WM_HANDHELDFIRST = 856;
export const WM_HANDHELDLAST = 863;
export const WM_HELP = 83;
export const WM_HOTKEY = 786;
export const WM_HSCROLL = 276;
export const WM_HSCROLLCLIPBOARD = 782;
export const WM_ICONERASEBKGND = 39;
export const WM_INITDIALOG = 272;
export const WM_INITMENU = 278;
export const WM_INITMENUPOPUP = 279;
export const WM_INPUTLANGCHANGE = 81;
export const WM_INPUTLANGCHANGEREQUEST = 80;
export const WM_KEYDOWN = 256;
export const WM_KEYUP = 257;
export const WM_KILLFOCUS = 8;
export const WM_MDIACTIVATE = 546;
export const WM_MDICASCADE = 551;
export const WM_MDICREATE = 544;
export const WM_MDIDESTROY = 545;
export const WM_MDIGETACTIVE = 553;
export const WM_MDIICONARRANGE = 552;
export const WM_MDIMAXIMIZE = 549;
export const WM_MDINEXT = 548;
export const WM_MDIREFRESHMENU = 564;
export const WM_MDIRESTORE = 547;
export const WM_MDISETMENU = 560;
export const WM_MDITILE = 550;
export const WM_MEASUREITEM = 44;
export const WM_UNINITMENUPOPUP = 0x0125;
export const WM_MENURBUTTONUP = 290;
export const WM_MENUCOMMAND = 0x0126;
export const WM_MENUGETOBJECT = 0x0124;
export const WM_MENUDRAG = 0x0123;
export const WM_MENUCHAR = 288;
export const WM_MENUSELECT = 287;
export const WM_NEXTMENU = 531;
export const WM_MOVE = 3;
export const WM_MOVING = 534;
export const WM_NCACTIVATE = 134;
export const WM_NCCALCSIZE = 131;
export const WM_NCCREATE = 129;
export const WM_NCDESTROY = 130;
export const WM_NCHITTEST = 132;
export const WM_NCLBUTTONDBLCLK = 163;
export const WM_NCLBUTTONDOWN = 161;
export const WM_NCLBUTTONUP = 162;
export const WM_NCMBUTTONDBLCLK = 169;
export const WM_NCMBUTTONDOWN = 167;
export const WM_NCMBUTTONUP = 168;
export const WM_NCMOUSEMOVE = 160;
export const WM_NCPAINT = 133;
export const WM_NCRBUTTONDBLCLK = 166;
export const WM_NCRBUTTONDOWN = 164;
export const WM_NCRBUTTONUP = 165;
export const WM_NEXTDLGCTL = 40;
export const WM_NOTIFY = 78;
export const WM_NOTIFYFORMAT = 85;
export const WM_NULL = 0;
export const WM_PAINT = 15;
export const WM_PAINTCLIPBOARD = 777;
export const WM_PAINTICON = 38;
export const WM_PALETTECHANGED = 785;
export const WM_PALETTEISCHANGING = 784;
export const WM_PARENTNOTIFY = 528;
export const WM_PASTE = 770;
export const WM_PENWINFIRST = 896;
export const WM_PENWINLAST = 911;
export const WM_POWER = 72;
export const WM_POWERBROADCAST = 536;
export const WM_PRINT = 791;
export const WM_PRINTCLIENT = 792;
export const WM_QUERYDRAGICON = 55;
export const WM_QUERYENDSESSION = 17;
export const WM_QUERYNEWPALETTE = 783;
export const WM_QUERYOPEN = 19;
export const WM_QUEUESYNC = 35;
export const WM_QUIT = 18;
export const WM_RENDERALLFORMATS = 774;
export const WM_RENDERFORMAT = 773;
export const WM_SETCURSOR = 32;
export const WM_SETFOCUS = 7;
export const WM_SETFONT = 48;
export const WM_SETHOTKEY = 50;
export const WM_SETICON = 128;
export const WM_SETREDRAW = 11;
export const WM_SETTEXT = 12;
export const WM_SETTINGCHANGE = 26;
export const WM_SHOWWINDOW = 24;
export const WM_SIZE = 5;
export const WM_SIZECLIPBOARD = 779;
export const WM_SIZING = 532;
export const WM_SPOOLERSTATUS = 42;
export const WM_STYLECHANGED = 125;
export const WM_STYLECHANGING = 124;
export const WM_SYSCHAR = 262;
export const WM_SYSCOLORCHANGE = 21;
export const WM_SYSCOMMAND = 274;
export const WM_SYSDEADCHAR = 263;
export const WM_SYSKEYDOWN = 260;
export const WM_SYSKEYUP = 261;
export const WM_TCARD = 82;
export const WM_THEMECHANGED = 794;
export const WM_TIMECHANGE = 30;
export const WM_TIMER = 275;
export const WM_UNDO = 772;
export const WM_USER = 1024;
export const WM_USERCHANGED = 84;
export const WM_VKEYTOITEM = 46;
export const WM_VSCROLL = 277;
export const WM_VSCROLLCLIPBOARD = 778;
export const WM_WINDOWPOSCHANGED = 71;
export const WM_WINDOWPOSCHANGING = 70;
export const WM_WININICHANGE = 26;
export const WM_KEYFIRST = 256;
export const WM_KEYLAST = 264;
export const WM_SYNCPAINT = 136;
export const WM_MOUSEACTIVATE = 33;
export const WM_MOUSEMOVE = 512;
export const WM_LBUTTONDOWN = 513;
export const WM_LBUTTONUP = 514;
export const WM_LBUTTONDBLCLK = 515;
export const WM_RBUTTONDOWN = 516;
export const WM_RBUTTONUP = 517;
export const WM_RBUTTONDBLCLK = 518;
export const WM_MBUTTONDOWN = 519;
export const WM_MBUTTONUP = 520;
export const WM_MBUTTONDBLCLK = 521;
export const WM_MOUSEWHEEL = 522;
export const WM_MOUSEFIRST = 512;
export const WM_MOUSELAST = 522;
export const WM_MOUSEHOVER = 0x2a1;
export const WM_MOUSELEAVE = 0x2a3;
