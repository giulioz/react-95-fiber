#ifndef SERIALCOMM_H
#define SERIALCOMM_H

void SendData(const char *data, unsigned long length);
unsigned long RecieveData(char *buffer);

#endif
