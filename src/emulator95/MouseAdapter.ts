export const MOUSE_PORT_POS = 0x512;
export const MOUSE_PORT_EVT = 0x508;
export const MOUSE_IRQ = 12;

export class MouseAdapter {
  outQueueMouseEvt: number[] = [];
  outMousePos: number = 0;

  constructor(public cpu: any) {
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

  sendDataMousePos(value: number) {
    this.outMousePos = value;
    this.cpu.device_lower_irq(MOUSE_IRQ);
    this.cpu.device_raise_irq(MOUSE_IRQ);
  }

  sendDataMouseEvt(value: number) {
    this.outQueueMouseEvt.push(value);
    this.cpu.device_lower_irq(MOUSE_IRQ);
    this.cpu.device_raise_irq(MOUSE_IRQ);
  }
}
