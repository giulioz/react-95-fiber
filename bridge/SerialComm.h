#ifndef SERIALCOMM_H
#define SERIALCOMM_H

#include <windows.h>

void SetupSerialPort(HWND hwnd);
void CloseSerialPort();
unsigned long SendData(char* data, unsigned long length);
unsigned long RecieveData(char *buffer);

#endif
