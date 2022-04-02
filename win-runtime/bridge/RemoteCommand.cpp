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
  return RemoteCommand(buffer, size, header.type, header.nParams, params);
}

void deallocRemoteCommand(RemoteCommand &command) {
  if (command.originalBuffer) {
    delete command.originalBuffer;
  }
}

RemoteCommand RemoteCommand::heapCopy() {
  for (size_t i = 0; i < nParams; i++) {
    if (params[i].type == String) {
      // Unrelocate strings
      params[i].dt_string.value =
          (char *)(params[i].dt_string.value - (char *)originalBuffer);
    }
  }

  char *bufferCopy = new char[originalSize];
  memcpy(bufferCopy, originalBuffer, originalSize);
  return parseRemoteCommand(bufferCopy, originalSize);
}
