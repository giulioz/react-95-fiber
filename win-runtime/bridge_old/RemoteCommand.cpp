#include "RemoteCommand.h"

RemoteCommand parseRemoteCommand(char *buffer, unsigned int size) {
  RemoteCommandHeader header = *(RemoteCommandHeader *)buffer;
  if (header.magic != 0xC0AD) {
    return RemoteCommand();
  }
  DataItem *params = (DataItem *)(buffer + sizeof(RemoteCommandHeader));
  for (size_t i = 0; i < header.nParams; i++) {
    if (params[i].type == String) {
      // Relocate strings
      params[i].dt_string.value = buffer + params[i].dt_uint.value;
    }
  }
  return RemoteCommand(header.type, header.nParams, params);
}
