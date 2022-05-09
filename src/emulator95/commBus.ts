export const COMMBUS_PORT_IN = 0x504;
export const COMMBUS_PORT_OUT = 0x500;
export const MOUSE_PORT_EVT = 0x508;
export const MOUSE_PORT_POS = 0x512;

export class CommBus {
  outQueue: number[][] = [];
  inQueue: number[] = [];

  outQueueMouseEvt: number[] = [];
  outMousePos: number = 0;

  constructor(public cpu: any, onPacket: (pkg: ArrayBuffer) => void) {
    cpu.io.register_write(
      COMMBUS_PORT_IN,
      this,
      () => console.warn('Invalid 8 bit write!'),
      () => console.warn('Invalid 16 bit write!'),
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
        console.warn('Invalid 16 bit read!');
        return 0;
      },
      () => {
        const toSend = (this.outQueue[0]?.length > 0 && this.outQueue[0]) || this.outQueue.shift();
        if (!toSend) return 0;

        const byte = toSend.shift();
        if (byte === undefined) return 0;

        return byte | ((toSend.length + 1) << 8);
      },
    );

    cpu.io.register_read(
      MOUSE_PORT_EVT,
      this,
      () => {
        console.warn('Invalid 8 bit read!');
        return 0;
      },
      () => {
        console.warn('Invalid 16 bit read!');
        return 0;
      },
      () => {
        const byte = this.outQueueMouseEvt.shift();
        return byte || 0;
      },
    );

    cpu.io.register_read(
      MOUSE_PORT_POS,
      this,
      () => {
        console.warn('Invalid 8 bit read!');
        return 0;
      },
      () => {
        console.warn('Invalid 16 bit read!');
        return 0;
      },
      () => this.outMousePos,
    );
  }

  sendData(buffer: ArrayBuffer) {
    const bytes = new Uint8ClampedArray(buffer);
    this.outQueue.push(Array.from(bytes));
  }

  sendDataMousePos(value: number) {
    this.outMousePos = value;
    this.cpu.device_lower_irq(12);
    this.cpu.device_raise_irq(12);
  }

  sendDataMouseEvt(value: number) {
    this.outQueueMouseEvt.push(value);
  }
}
