#include "SerialComm.h"
#include <conio.h>
#include <string.h>

const unsigned short COMMBUS_PORT_IN = 0x500;
const unsigned short COMMBUS_PORT_OUT = 0x504;

// GCC versions

// inline void outportb(unsigned short _port, unsigned char _data) {
//   __asm__ __volatile__("outb %1, %0" : : "dN"(_port), "a"(_data));
// }

// inline unsigned char inportb(unsigned short _port) {
//   unsigned char rv;
//   __asm__ __volatile__("inb %1, %0" : "=a"(rv) : "dN"(_port));
//   return rv;
// }

// inline void outportw(unsigned short _port, unsigned short _data) {
//   __asm__ __volatile__("outw %1, %0" : : "dN"(_port), "a"(_data));
// }

// inline unsigned short inportw(unsigned short _port) {
//   unsigned short rv;
//   __asm__ __volatile__("inw %1, %0" : "=a"(rv) : "dN"(_port));
//   return rv;
// }

void SendData(const char *data, unsigned long length) {
  for (unsigned long i = 0; i < length; i++) {
    unsigned long temp = data[i] & 0xFF;
    temp |= ((length - i) << 8);
    _outpd(COMMBUS_PORT_OUT, temp);
  }
  _outpd(COMMBUS_PORT_OUT, 0);
}

unsigned long RecieveData(char *buffer) {
  int i = 0;
  unsigned long temp = _inpd(COMMBUS_PORT_IN);
  char readData = temp & 0xFF;
  unsigned long avail = temp >> 8;
  while (avail > 0) {
    buffer[i] = readData;

    temp = _inpd(COMMBUS_PORT_IN);
    readData = temp & 0xFF;
    avail = temp >> 8;
    i++;
  }
  return i;
}
