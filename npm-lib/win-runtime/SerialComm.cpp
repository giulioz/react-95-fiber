#include "SerialComm.h"
#include <string.h>
#include <conio.h>

const unsigned short COMMBUS_PORT_IN = 0x500;
const unsigned short COMMBUS_PORT_OUT = 0x502;

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
    unsigned short temp = data[i];
    temp |= (length - i) << 8;
    _outpw(COMMBUS_PORT_OUT, temp);
  }
  _outpw(COMMBUS_PORT_OUT, 0);
}

unsigned long RecieveData(char *buffer) {
  int i = 0;
  unsigned short temp = _inpw(COMMBUS_PORT_IN);
  char readData = temp & 0xFF;
  char avail = temp >> 8;
  while (avail > 0) {
    buffer[i] = readData;

    temp = _inpw(COMMBUS_PORT_IN);
    readData = temp & 0xFF;
    avail = temp >> 8;
    i++;
  }
  return i;
}
