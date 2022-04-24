#include "MouseReceiver.h"
#include <windows.h>

const unsigned short MOUSE_PORT_EVT = 0x508;
const unsigned short MOUSE_PORT_POS = 0x512;
static bool running = false;
static HANDLE receiverThread = 0;

enum MouseCommandType {
  MouseCmd_Nothing = 0,
  MouseCmd_LeftDown = 1,
  MouseCmd_LeftUp = 2,
  MouseCmd_RightDown = 3,
  MouseCmd_RightUp = 4,
  MouseCmd_MiddleDown = 5,
  MouseCmd_MiddleUp = 6,
  MouseCmd_Wheel = 7,
};

extern "C" {
unsigned long __cdecl _inpd(unsigned short);
}

DWORD WINAPI mouseReceiverThreadFunc(void *data) {
  while (running) {
    unsigned long posPortValue = _inpd(MOUSE_PORT_POS);
    int posX = posPortValue & 0x0000FFFF;
    int posY = (posPortValue & 0xFFFF0000) >> 16;
    SetCursorPos(posX, posY);

    unsigned long eventPortValue = _inpd(MOUSE_PORT_EVT);
    unsigned char cmd = eventPortValue & 0x000000FF;
    int param = eventPortValue >> 8;

    switch (cmd) {
    case MouseCmd_LeftDown:
      mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, NULL, NULL);
      break;
    case MouseCmd_LeftUp:
      mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, NULL, NULL);
      break;
    case MouseCmd_RightDown:
      mouse_event(MOUSEEVENTF_RIGHTDOWN, 0, 0, NULL, NULL);
      break;
    case MouseCmd_RightUp:
      mouse_event(MOUSEEVENTF_RIGHTUP, 0, 0, NULL, NULL);
      break;
    case MouseCmd_MiddleDown:
      mouse_event(MOUSEEVENTF_MIDDLEDOWN, 0, 0, NULL, NULL);
      break;
    case MouseCmd_MiddleUp:
      mouse_event(MOUSEEVENTF_MIDDLEUP, 0, 0, NULL, NULL);
      break;
    case MouseCmd_Wheel:
      mouse_event(MOUSEEVENTF_WHEEL, 0, 0, NULL, NULL);
      break;

    default:
      break;
    }
  }

  return 0;
}

void startMouseReceiver() {
  running = true;
  receiverThread =
      CreateThread(NULL, 0, mouseReceiverThreadFunc, NULL, 0, NULL);
}

void stopMouseReceiver() {
  running = false;
  WaitForSingleObject(receiverThread, INFINITE);
}
