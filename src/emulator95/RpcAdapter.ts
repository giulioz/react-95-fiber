import { readMemString, translateVirtualToPhysical, writeMemString } from './utils';

export const RPC_PORT_IN = 0x504;
export const RPC_PORT_OUT = 0x500;
export const RPC_IRQ = 5;

enum RpcAdapterCommand_GUEST {
  RPC_CMD_LOADLIBRARY = 1,
  RPC_CMD_GETPROCADDRESS = 2,
  RPC_CMD_CALL = 3,
}

enum RpcAdapterCommand_HOST {
  RPC_HOST_EVAL = 0,
  RPC_HOST_SETUP = 1,
  RPC_HOST_RETURN = 2,
}

const bufferSize = 16 + 256;
const bufferParamsOffset = 16;

export class RpcAdapter {
  bufferPtr = 0;
  bufferPtrVrt = 0;
  continueFn: ((value: number) => void) | null = null;

  constructor(public cpu: any) {
    cpu.io.register_write(
      RPC_PORT_IN,
      this,
      () => console.warn('Invalid 8 bit write!'),
      (cmd: RpcAdapterCommand_HOST) => {
        const addr = translateVirtualToPhysical(cpu.reg32[3], cpu);
        switch (cmd) {
          case RpcAdapterCommand_HOST.RPC_HOST_EVAL:
            const string = readMemString(cpu, addr, cpu.reg32[1]);
            eval(string);
            cpu.reg32[0] = 0;
            break;

          case RpcAdapterCommand_HOST.RPC_HOST_SETUP:
            this.bufferPtr = addr;
            this.bufferPtrVrt = cpu.reg32[3];
            break;

          case RpcAdapterCommand_HOST.RPC_HOST_RETURN: {
            const bufferBlock = this.readBufferBlock();
            if (this.continueFn) this.continueFn(bufferBlock.returnValue || 0);
            break;
          }
        }
      },
    );
  }

  loadLibrary(name: string): Promise<number> {
    return new Promise(resolve => {
      this.continueFn = resolve;
      writeMemString(this.cpu, this.bufferPtr + bufferParamsOffset, name);
      this.rawSend(RpcAdapterCommand_GUEST.RPC_CMD_LOADLIBRARY);
    });
  }

  getProcAddress(moduleHandle: number, procName: string): Promise<number> {
    return new Promise(resolve => {
      this.continueFn = resolve;
      this.cpu.mem32s[this.bufferPtr / 4 + bufferParamsOffset / 4] = moduleHandle;
      writeMemString(this.cpu, this.bufferPtr + bufferParamsOffset + 4, procName);
      this.rawSend(RpcAdapterCommand_GUEST.RPC_CMD_GETPROCADDRESS);
    });
  }

  call(proc: number, stackSize: number): Promise<number> {
    return new Promise(resolve => {
      this.continueFn = resolve;
      this.cpu.mem32s[this.bufferPtr / 4 + 2] = proc;
      this.cpu.mem32s[this.bufferPtr / 4 + 3] = stackSize;
      this.rawSend(RpcAdapterCommand_GUEST.RPC_CMD_CALL);
    });
  }

  async test_MsgBox() {
    const lib = await this.loadLibrary('user32.dll');
    const proc = await this.getProcAddress(lib, 'MessageBoxA');
    this.cpu.mem32s[this.bufferPtr / 4 + bufferParamsOffset / 4 + 0] = 0; // hWnd
    this.cpu.mem32s[this.bufferPtr / 4 + bufferParamsOffset / 4 + 1] = this.bufferPtrVrt + bufferParamsOffset + 4 * 4; // lpText
    this.cpu.mem32s[this.bufferPtr / 4 + bufferParamsOffset / 4 + 2] = this.bufferPtrVrt + bufferParamsOffset + 4 * 4; // lpCaption
    this.cpu.mem32s[this.bufferPtr / 4 + bufferParamsOffset / 4 + 3] = 0; // uType
    writeMemString(this.cpu, this.bufferPtr + bufferParamsOffset + 4 * 4, 'Test');
    this.call(proc, 16);
  }

  private rawSend(command: RpcAdapterCommand_GUEST) {
    this.cpu.mem32s[this.bufferPtr / 4] = command;
    this.cpu.device_lower_irq(RPC_IRQ);
    this.cpu.device_raise_irq(RPC_IRQ);
  }

  private readBufferBlock() {
    const dataView = new DataView(this.cpu.mem8.slice(this.bufferPtr, this.bufferPtr + bufferSize).buffer);
    const command = dataView.getUint32(0, true);
    const returnValue = dataView.getUint32(4, true);
    const callPtr = dataView.getUint32(8, true);
    const stackSize = dataView.getUint32(12, true);
    return { command, returnValue, callPtr, stackSize };
  }
}
