#include "SerialComm.h"

static HANDLE hComm;

void SetupSerialPort(HWND hwnd) {
  hComm = CreateFileA("\\\\.\\COM1", GENERIC_READ | GENERIC_WRITE, 0, NULL,
                      OPEN_EXISTING, 0, NULL);

  if (hComm == INVALID_HANDLE_VALUE) {
    MessageBoxEx(hwnd, "Error opening serial port", "Error", MB_OK, NULL);
    exit(1);
  }

  DCB dcb = {0};
  dcb.DCBlength = sizeof(dcb);
  dcb.BaudRate = CBR_9600;
  dcb.ByteSize = 8;
  dcb.StopBits = ONESTOPBIT;
  dcb.Parity = NOPARITY;
  dcb.fDtrControl = DTR_CONTROL_DISABLE;
  if (SetCommState(hComm, &dcb) == FALSE) {
    MessageBoxEx(hwnd, "Error setting up serial port", "Error", MB_OK, NULL);
    exit(1);
  }

  COMMTIMEOUTS timeouts = {0};
  timeouts.ReadIntervalTimeout = 50;
  timeouts.ReadTotalTimeoutConstant = 50;
  timeouts.ReadTotalTimeoutMultiplier = 10;
  timeouts.WriteTotalTimeoutConstant = 50;
  timeouts.WriteTotalTimeoutMultiplier = 10;
  SetCommTimeouts(hComm, &timeouts);
}

void CloseSerialPort() { CloseHandle(hComm); }

unsigned long SendData(char *data, unsigned long length) {
  unsigned long written;
  WriteFile(hComm, data, length, &written, NULL);
  WriteFile(hComm, "\f", 1, &written, NULL);
  return written;
}

unsigned long RecieveData(char *buffer) {
  char readData;
  unsigned long nBytesRead = 0;
  unsigned long totalRead = 0;
  do {
    ReadFile(hComm, &readData, sizeof(readData), &nBytesRead, NULL);
    if (nBytesRead > 0) {
      *buffer = readData;
      buffer++;
      totalRead++;
    }
  } while (nBytesRead > 0);
  return totalRead;
}
