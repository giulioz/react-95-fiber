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
  GetCommState(hComm, &dcb);
  // dcb.DCBlength = sizeof(dcb);
  dcb.BaudRate = CBR_115200;
  // dcb.Parity = NOPARITY;
  // dcb.fBinary = TRUE;                    // Binary mode; no EOF check
  // dcb.fParity = FALSE;                   // Enable parity checking
  // dcb.fOutxCtsFlow = FALSE;              // No CTS output flow control
  // dcb.fOutxDsrFlow = FALSE;              // No DSR output flow control
  // dcb.fDtrControl = DTR_CONTROL_DISABLE; // DTR flow control type
  // dcb.fDsrSensitivity = FALSE;           // DSR sensitivity
  // dcb.fTXContinueOnXoff = FALSE;         // XOFF continues Tx
  // dcb.fOutX = FALSE;                     // No XON/XOFF out flow control
  // dcb.fInX = FALSE;                      // No XON/XOFF in flow control
  // dcb.fErrorChar = FALSE;                // Disable error replacement
  // dcb.fNull = FALSE;                     // Disable null stripping
  // dcb.fRtsControl = RTS_CONTROL_DISABLE; // RTS flow control
  // dcb.fAbortOnError = FALSE;             // Do not abort reads/writes on error
  // dcb.ByteSize = 8;                      // Number of bits/byte, 4-8
  // dcb.StopBits = ONESTOPBIT;             // 0,1,2 = 1, 1.5, 2
  // dcb.EvtChar = 0x7E;                    // Flag
  if (SetCommState(hComm, &dcb) == FALSE) {
    MessageBoxEx(hwnd, "Error setting up serial port", "Error", MB_OK, NULL);
    exit(1);
  }

  COMMTIMEOUTS timeouts = {0};
  timeouts.ReadIntervalTimeout = 1;
  timeouts.ReadTotalTimeoutConstant = 1;
  timeouts.ReadTotalTimeoutMultiplier = 1;
  timeouts.WriteTotalTimeoutConstant = 300;
  timeouts.WriteTotalTimeoutMultiplier = 1;
  SetCommTimeouts(hComm, &timeouts);
}

void CloseSerialPort() { CloseHandle(hComm); }

unsigned long SendData(const char *data, unsigned long length) {
  unsigned long written;
  WriteFile(hComm, data, length, &written, NULL);
  return written;
}

static char readBuffer[4096] = {0};
static char *readBufferPtr = &readBuffer[0];

unsigned long RecieveData(char *buffer) {
  char readData;
  unsigned long nBytesRead = 0;
  do {
    ReadFile(hComm, &readData, sizeof(readData), &nBytesRead, NULL);
    if (nBytesRead > 0) {
      if (readData == '\r') {
        unsigned long length = readBufferPtr - &readBuffer[0];
        memcpy(buffer, readBuffer, length * sizeof(readData));
        readBufferPtr = &readBuffer[0];
        return length;
      } else {
        *readBufferPtr = readData;
        readBufferPtr++;
      }
    }
  } while (nBytesRead > 0);
  return 0;
}
