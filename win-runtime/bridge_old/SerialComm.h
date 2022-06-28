#ifndef SERIALCOMM_H
#define SERIALCOMM_H

void sendData(const char *data, unsigned long length);
unsigned long recieveData(char *buffer);

#endif
