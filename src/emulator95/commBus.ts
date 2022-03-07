export const COMMBUS_PORT_IN = 0x502;
export const COMMBUS_PORT_OUT = 0x500;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class CommBus {
  outQueue: number[][] = [];
  inQueue: number[] = [];

  constructor(cpu: any, onPacket: (pkg: ArrayBuffer) => void) {
    cpu.io.register_write(
      COMMBUS_PORT_IN,
      this,
      () => console.warn('Invalid 8 bit write!'),
      (pkg: number) => {
        const byte = pkg & 0xff;
        const avail = pkg >> 8;
        if (avail > 0) {
          this.inQueue.push(byte);
        } else if (this.inQueue.length > 0) {
          onPacket(new Uint8ClampedArray(this.inQueue).buffer);
          this.inQueue = [];
        }
      },
    );

    cpu.io.register_read(
      COMMBUS_PORT_OUT,
      this,
      () => {
        console.warn('Invalid 8 bit read!');
        return 0;
      },
      () => {
        const toSend = (this.outQueue[0]?.length > 0 && this.outQueue[0]) || this.outQueue.shift();
        if (!toSend) return 0;

        const byte = toSend.shift();
        if (byte === undefined) return 0;

        return byte | (Math.min(255, toSend.length + 1) << 8);
      },
    );
  }

  sendData(buffer: ArrayBuffer) {
    const bytes = new Uint8ClampedArray(buffer);
    this.outQueue.push(Array.from(bytes));
  }

  sendString(str: string) {
    this.sendData(encoder.encode(str).buffer);
  }
}
