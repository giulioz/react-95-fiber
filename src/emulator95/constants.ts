export const LOWORD = (l: number) => l & 0xffff;
export const HIWORD = (l: number) => (l >> 16) & 0xffff;
export const LOBYTE = (w: number) => w & 0xff;
export const HIBYTE = (w: number) => (w >> 8) & 0xff;

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
export const WS_TILEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX;

// The window is initially visible.
// This style can be turned on and off by using the ShowWindow or SetWindowPos function.
export const WS_VISIBLE = 0x10000000;

// The window has a vertical scroll bar.
export const WS_VSCROLL = 0x00200000;

// The window is an overlapped window. Same as the WS_TILEDWINDOW style.
export const WS_OVERLAPPEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX;

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

export const WS_EX_ACCEPTFILES = 16;
export const WS_EX_APPWINDOW = 0x40000;
export const WS_EX_CLIENTEDGE = 512;
export const WS_EX_CONTEXTHELP = 0x400;
export const WS_EX_CONTROLPARENT = 0x10000;
export const WS_EX_DLGMODALFRAME = 1;
export const WS_EX_LEFT = 0;
export const WS_EX_LEFTSCROLLBAR = 0x4000;
export const WS_EX_LTRREADING = 0;
export const WS_EX_MDICHILD = 64;
export const WS_EX_NOPARENTNOTIFY = 4;
export const WS_EX_OVERLAPPEDWINDOW = 0x300;
export const WS_EX_PALETTEWINDOW = 0x188;
export const WS_EX_RIGHT = 0x1000;
export const WS_EX_RIGHTSCROLLBAR = 0;
export const WS_EX_RTLREADING = 0x2000;
export const WS_EX_STATICEDGE = 0x20000;
export const WS_EX_TOOLWINDOW = 128;
export const WS_EX_TOPMOST = 8;
export const WS_EX_TRANSPARENT = 32;
export const WS_EX_WINDOWEDGE = 256;

export const CW_USEDEFAULT = 0x80000000;

export const ES_LEFT = 0x0000; // long
export const ES_CENTER = 0x0001; // long
export const ES_RIGHT = 0x0002; // long
export const ES_MULTILINE = 0x0004; // long
export const ES_UPPERCASE = 0x0008; // long
export const ES_LOWERCASE = 0x0010; // long
export const ES_PASSWORD = 0x0020; // long
export const ES_AUTOVSCROLL = 0x0040; // long
export const ES_AUTOHSCROLL = 0x0080; // long
export const ES_NOHIDESEL = 0x0100; // long
export const ES_OEMCONVERT = 0x0400; // long
export const ES_READONLY = 0x0800; // long
export const ES_WANTRETURN = 0x1000; // long
export const ES_NUMBER = 0x2000; // long
export const EN_SETFOCUS = 0x0100;
export const EN_KILLFOCUS = 0x0200;
export const EN_CHANGE = 0x0300;
export const EN_UPDATE = 0x0400;
export const EN_ERRSPACE = 0x0500;
export const EN_MAXTEXT = 0x0501;
export const EN_HSCROLL = 0x0601;
export const EN_VSCROLL = 0x0602;
export const EC_LEFTMARGIN = 0x0001;
export const EC_RIGHTMARGIN = 0x0002;
export const EC_USEFONTINFO = 0xffff;
export const EMSIS_COMPOSITIONSTRING = 0x0001;
export const EIMES_GETCOMPSTRATONCE = 0x0001;
export const EIMES_CANCELCOMPSTRINFOCUS = 0x0002;
export const EIMES_COMPLETECOMPSTRKILLFOCUS = 0x0004;
export const EM_GETSEL = 0x00b0;
export const EM_SETSEL = 0x00b1;
export const EM_GETRECT = 0x00b2;
export const EM_SETRECT = 0x00b3;
export const EM_SETRECTNP = 0x00b4;
export const EM_SCROLL = 0x00b5;
export const EM_LINESCROLL = 0x00b6;
export const EM_SCROLLCARET = 0x00b7;
export const EM_GETMODIFY = 0x00b8;
export const EM_SETMODIFY = 0x00b9;
export const EM_GETLINECOUNT = 0x00ba;
export const EM_LINEINDEX = 0x00bb;
export const EM_SETHANDLE = 0x00bc;
export const EM_GETHANDLE = 0x00bd;
export const EM_GETTHUMB = 0x00be;
export const EM_LINELENGTH = 0x00c1;
export const EM_REPLACESEL = 0x00c2;
export const EM_GETLINE = 0x00c4;
export const EM_LIMITTEXT = 0x00c5;
export const EM_CANUNDO = 0x00c6;
export const EM_UNDO = 0x00c7;
export const EM_FMTLINES = 0x00c8;
export const EM_LINEFROMCHAR = 0x00c9;
export const EM_SETTABSTOPS = 0x00cb;
export const EM_SETPASSWORDCHAR = 0x00cc;
export const EM_EMPTYUNDOBUFFER = 0x00cd;
export const EM_GETFIRSTVISIBLELINE = 0x00ce;
export const EM_SETREADONLY = 0x00cf;
export const EM_SETWORDBREAKPROC = 0x00d0;
export const EM_GETWORDBREAKPROC = 0x00d1;
export const EM_GETPASSWORDCHAR = 0x00d2;
export const EM_SETMARGINS = 0x00d3;
export const EM_GETMARGINS = 0x00d4;
export const EM_SETLIMITTEXT = EM_LIMITTEXT; /* ;win40 Name change */
export const EM_GETLIMITTEXT = 0x00d5;
export const EM_POSFROMCHAR = 0x00d6;
export const EM_CHARFROMPOS = 0x00d7;
export const EM_SETIMESTATUS = 0x00d8;
export const EM_GETIMESTATUS = 0x00d9;
export const WB_LEFT = 0;
export const WB_RIGHT = 1;
export const WB_ISDELIMITER = 2;
export const BS_PUSHBUTTON = 0x00000000; // long
export const BS_DEFPUSHBUTTON = 0x00000001; // long
export const BS_CHECKBOX = 0x00000002; // long
export const BS_AUTOCHECKBOX = 0x00000003; // long
export const BS_RADIOBUTTON = 0x00000004; // long
export const BS_3STATE = 0x00000005; // long
export const BS_AUTO3STATE = 0x00000006; // long
export const BS_GROUPBOX = 0x00000007; // long
export const BS_USERBUTTON = 0x00000008; // long
export const BS_AUTORADIOBUTTON = 0x00000009; // long
export const BS_OWNERDRAW = 0x0000000b; // long
export const BS_LEFTTEXT = 0x00000020; // long
export const BS_TEXT = 0x00000000; // long
export const BS_ICON = 0x00000040; // long
export const BS_BITMAP = 0x00000080; // long
export const BS_LEFT = 0x00000100; // long
export const BS_RIGHT = 0x00000200; // long
export const BS_CENTER = 0x00000300; // long
export const BS_TOP = 0x00000400; // long
export const BS_BOTTOM = 0x00000800; // long
export const BS_VCENTER = 0x00000c00; // long
export const BS_PUSHLIKE = 0x00001000; // long
export const BS_MULTILINE = 0x00002000; // long
export const BS_NOTIFY = 0x00004000; // long
export const BS_FLAT = 0x00008000; // long
export const BS_RIGHTBUTTON = BS_LEFTTEXT;
export const BN_CLICKED = 0;
export const BN_PAINT = 1;
export const BN_HILITE = 2;
export const BN_UNHILITE = 3;
export const BN_DISABLE = 4;
export const BN_DOUBLECLICKED = 5;
export const BN_PUSHED = BN_HILITE;
export const BN_UNPUSHED = BN_UNHILITE;
export const BN_DBLCLK = BN_DOUBLECLICKED;
export const BN_SETFOCUS = 6;
export const BN_KILLFOCUS = 7;
export const BM_GETCHECK = 0x00f0;
export const BM_SETCHECK = 0x00f1;
export const BM_GETSTATE = 0x00f2;
export const BM_SETSTATE = 0x00f3;
export const BM_SETSTYLE = 0x00f4;
export const BM_CLICK = 0x00f5;
export const BM_GETIMAGE = 0x00f6;
export const BM_SETIMAGE = 0x00f7;
export const BST_UNCHECKED = 0x0000;
export const BST_CHECKED = 0x0001;
export const BST_INDETERMINATE = 0x0002;
export const BST_PUSHED = 0x0004;
export const BST_FOCUS = 0x0008;
export const SS_LEFT = 0x00000000; // long
export const SS_CENTER = 0x00000001; // long
export const SS_RIGHT = 0x00000002; // long
export const SS_ICON = 0x00000003; // long
export const SS_BLACKRECT = 0x00000004; // long
export const SS_GRAYRECT = 0x00000005; // long
export const SS_WHITERECT = 0x00000006; // long
export const SS_BLACKFRAME = 0x00000007; // long
export const SS_GRAYFRAME = 0x00000008; // long
export const SS_WHITEFRAME = 0x00000009; // long
export const SS_USERITEM = 0x0000000a; // long
export const SS_SIMPLE = 0x0000000b; // long
export const SS_LEFTNOWORDWRAP = 0x0000000c; // long
export const SS_OWNERDRAW = 0x0000000d; // long
export const SS_BITMAP = 0x0000000e; // long
export const SS_ENHMETAFILE = 0x0000000f; // long
export const SS_ETCHEDHORZ = 0x00000010; // long
export const SS_ETCHEDVERT = 0x00000011; // long
export const SS_ETCHEDFRAME = 0x00000012; // long
export const SS_TYPEMASK = 0x0000001f; // long
export const SS_NOPREFIX = 0x00000080; // long /* Don't do "&" character translation */
export const SS_NOTIFY = 0x00000100; // long
export const SS_CENTERIMAGE = 0x00000200; // long
export const SS_RIGHTJUST = 0x00000400; // long
export const SS_REALSIZEIMAGE = 0x00000800; // long
export const SS_SUNKEN = 0x00001000; // long
export const SS_ENDELLIPSIS = 0x00004000; // long
export const SS_PATHELLIPSIS = 0x00008000; // long
export const SS_WORDELLIPSIS = 0x0000c000; // long
export const SS_ELLIPSISMASK = 0x0000c000; // long
export const STM_SETICON = 0x0170;
export const STM_GETICON = 0x0171;
export const STM_SETIMAGE = 0x0172;
export const STM_GETIMAGE = 0x0173;
export const STN_CLICKED = 0;
export const STN_DBLCLK = 1;
export const STN_ENABLE = 2;
export const STN_DISABLE = 3;
export const STM_MSGMAX = 0x0174;
export const WC_DIALOG = 0x8002;
export const DWL_MSGRESULT = 0;
export const DWL_DLGPROC = 4;
export const DWL_USER = 8;

export const GWL_WNDPROC = -4;
export const GWL_HINSTANCE = -6;
export const GWL_HWNDPARENT = -8;
export const GWL_STYLE = -16;
export const GWL_EXSTYLE = -20;
export const GWL_USERDATA = -21;
export const GWL_ID = -12;
