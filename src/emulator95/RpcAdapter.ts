import { OpenGL32 } from './stubs/opengl32';
import { createMutex, readMemString, translateVirtualToPhysical, writeMemString } from './utils';
import { User32 } from './wrappers/user32';

export const RPC_PORT_IN = 0x504;
export const RPC_IRQ = 5;

enum RpcAdapterCommand_GUEST {
  RPC_CMD_NOOP = 0,
  RPC_CMD_LOADLIBRARY = 1,
  RPC_CMD_GETPROCADDRESS = 2,
  RPC_CMD_CALL = 3,
  RPC_CMD_CALL_ASYNC = 4,
  RPC_CMD_END_CALLBACK = 5,
}

enum RpcAdapterCommand_HOST {
  RPC_HOST_EVAL = 0,
  RPC_HOST_SETUP = 1,
  RPC_HOST_RETURN = 2,
  RPC_HOST_CALLBACK = 3,
  RPC_HOST_CALL_STUB_OPENGL32 = 4,
}

export class RpcAdapter {
  bufferSize = 16 + 4096;
  bufferParamsOffset = 16;
  bufferPtr = 0;
  bufferPtrVrt = 0;
  paramsPtr = 0;
  moreDataAmount = 0;

  remoteCallStack: { continueFn: (value: number) => void }[] = [];
  syncMutex = createMutex();

  libsCache = new Map<string, number>();
  procsCache = new Map<string, number>();

  wrappers = {
    user32: new User32(this),
  };

  stubs = {
    [RpcAdapterCommand_HOST.RPC_HOST_CALL_STUB_OPENGL32]: new OpenGL32(this),
  };

  bridgeHInstance = 0;

  callbackPtr = 0;
  lastCallback = 0;
  callbacks = new Map<number, Function>();
  inCallback = false;

  constructor(public cpu: any, onReady: () => void) {
    cpu.io.register_write(
      RPC_PORT_IN,
      this,
      () => console.warn('Invalid 8 bit write!'),
      async (cmd: RpcAdapterCommand_HOST) => {
        switch (cmd) {
          case RpcAdapterCommand_HOST.RPC_HOST_EVAL: {
            const addr = translateVirtualToPhysical(cpu.reg32[3], cpu);
            const string = readMemString(cpu, addr, cpu.reg32[1]);
            eval(string);
            cpu.reg32[0] = 0;
            break;
          }

          case RpcAdapterCommand_HOST.RPC_HOST_SETUP: {
            const addr = translateVirtualToPhysical(cpu.reg32[3], cpu);
            this.bufferPtr = addr;
            this.bufferPtrVrt = cpu.reg32[3];
            this.callbackPtr = this.cpu.mem32s[this.bufferPtr / 4 + 1];
            this.bridgeHInstance = this.cpu.mem32s[this.bufferPtr / 4 + 2];
            await this.cacheAll();
            onReady();
            break;
          }

          case RpcAdapterCommand_HOST.RPC_HOST_RETURN: {
            const returnValue = this.cpu.mem32s[this.bufferPtr / 4 + 1];
            const callStackEntry = this.remoteCallStack.pop();
            if (callStackEntry) callStackEntry.continueFn(returnValue);
            break;
          }

          case RpcAdapterCommand_HOST.RPC_HOST_CALLBACK: {
            this.inCallback = true;
            this.cpu.mem32s[this.bufferPtr / 4] = RpcAdapterCommand_GUEST.RPC_CMD_NOOP;
            await Promise.all(Array.from(this.callbacks.values()).map(cb => cb()));
            this.cpu.mem32s[this.bufferPtr / 4] = RpcAdapterCommand_GUEST.RPC_CMD_END_CALLBACK;
            this.inCallback = false;
            break;
          }

          default: {
            this.stubs[cmd].syscall();
            break;
          }
        }
      },
    );
  }

  async cacheAll() {
    await this.wrappers.user32.cacheAll();
  }

  async runSync(fn: (rpcAdapter: RpcAdapter) => Promise<void> | void) {
    await this.syncMutex.lock();
    await fn(this);
    this.syncMutex.unlock();
  }

  async loadLibrary(name: string): Promise<number> {
    const savedHandle = this.libsCache.get(name);
    if (savedHandle) return Promise.resolve(savedHandle);

    const handle = await new Promise<number>(resolve => {
      this.remoteCallStack.push({ continueFn: resolve });
      writeMemString(this.cpu, this.bufferPtr + this.bufferParamsOffset, name);
      this.rawSend(RpcAdapterCommand_GUEST.RPC_CMD_LOADLIBRARY);
    });
    this.libsCache.set(name, handle);
    return handle;
  }

  async getProcAddress(moduleHandle: number, procName: string): Promise<number> {
    const key = `${moduleHandle}_${procName}`;
    const savedHandle = this.procsCache.get(key);
    if (savedHandle) return Promise.resolve(savedHandle);

    const handle = await new Promise<number>(resolve => {
      this.remoteCallStack.push({ continueFn: resolve });
      this.cpu.mem32s[this.bufferPtr / 4 + this.bufferParamsOffset / 4] = moduleHandle;
      writeMemString(this.cpu, this.bufferPtr + this.bufferParamsOffset + 4, procName);
      this.rawSend(RpcAdapterCommand_GUEST.RPC_CMD_GETPROCADDRESS);
    });
    this.procsCache.set(key, handle);
    return handle;
  }

  async beginCall() {
    this.paramsPtr = this.bufferPtr + this.bufferParamsOffset;
    this.moreDataAmount = 0;
  }

  addIntParam(n: number) {
    this.cpu.mem32s[this.paramsPtr / 4] = n;
    this.paramsPtr += 4;
  }

  addStringParam(s: string, totalParamsLength: number, noAdd = false) {
    const normLength = Math.ceil((s.length + 1) / 4) * 4;
    const vrtPtr = this.bufferPtrVrt + this.bufferParamsOffset + totalParamsLength + this.moreDataAmount;
    writeMemString(this.cpu, this.bufferPtr + this.bufferParamsOffset + totalParamsLength + this.moreDataAmount, s);
    this.moreDataAmount += normLength;
    if (!noAdd) {
      this.cpu.mem32s[this.paramsPtr / 4] = vrtPtr;
      this.paramsPtr += 4;
    }
    return vrtPtr;
  }

  addStructParam(data: number[], totalParamsLength: number, noAdd = false) {
    const vrtPtr = this.bufferPtrVrt + this.bufferParamsOffset + totalParamsLength + this.moreDataAmount;
    data.forEach((d, i) => {
      this.cpu.mem32s[(this.bufferPtr + this.bufferParamsOffset + totalParamsLength + this.moreDataAmount) / 4 + i] = d;
    });
    this.moreDataAmount += data.length * 4;
    if (!noAdd) {
      this.cpu.mem32s[this.paramsPtr / 4] = vrtPtr;
      this.paramsPtr += 4;
    }
    return vrtPtr;
  }

  addFunctionParam(fn: Function, noAdd = false) {
    const id = this.lastCallback;
    this.callbacks.set(id, fn);
    this.lastCallback++;
    if (!noAdd) this.addIntParam(this.callbackPtr);
    return this.callbackPtr;
  }

  async call(proc: number, stackSize: number, async = false): Promise<number> {
    const result = await new Promise<number>(resolve => {
      this.remoteCallStack.push({ continueFn: resolve });
      this.cpu.mem32s[this.bufferPtr / 4 + 2] = proc;
      this.cpu.mem32s[this.bufferPtr / 4 + 3] = stackSize;
      this.rawSend(async ? RpcAdapterCommand_GUEST.RPC_CMD_CALL_ASYNC : RpcAdapterCommand_GUEST.RPC_CMD_CALL);
    });
    return result;
  }

  async callFull(lib: string, fn: string, stackSize: number, async = false): Promise<number> {
    const libPtr = await this.loadLibrary(lib);
    const procPtr = await this.getProcAddress(libPtr, fn);
    return this.call(procPtr, stackSize, async);
  }

  async cacheEntry(lib: string, fn: string) {
    const libPtr = await this.loadLibrary(lib);
    return this.getProcAddress(libPtr, fn);
  }

  private rawSend(command: RpcAdapterCommand_GUEST) {
    this.cpu.mem32s[this.bufferPtr / 4] = command;
    if (!this.inCallback) {
      this.cpu.device_lower_irq(RPC_IRQ);
      this.cpu.device_raise_irq(RPC_IRQ);
    }
  }
}
