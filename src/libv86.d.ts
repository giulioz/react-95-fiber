type V86StarterEventParams = {
  'serial0-output-char': string;
  'screen-set-mode': boolean;
  'emulator-started': undefined;
};

type URLOrArrayBuffer = { url?: string; async?: boolean; size?: number } | { buffer: ArrayBuffer } | File;

type V86StarterOptions = {
  wasm_path?: string;
  wasm_fn?: any;
  bios?: URLOrArrayBuffer;
  vga_bios?: URLOrArrayBuffer;
  hda?: URLOrArrayBuffer;
  fda?: URLOrArrayBuffer;
  boot_order?: number;
  memory_size?: number;
  vga_memory_size?: number;
  disable_mouse?: boolean;
  disable_keyboard?: boolean;
  disable_floppy?: boolean;
  autostart?: boolean;
  network_relay_url?: string;
  cdrom?: URLOrArrayBuffer;
  bzimage?: URLOrArrayBuffer;
  initrd?: URLOrArrayBuffer;
  bzimage_initrd_from_filesystem?: boolean;
  initial_state?: URLOrArrayBuffer;
  filesystem?: URLOrArrayBuffer;
  serial_container?: HTMLTextAreaElement;
  screen_container?: HTMLElement;
};

declare module 'v86' {
  class V86Starter {
    constructor(options: V86StarterOptions);

    bus: any;
    v86: any;

    serial0_send(data: string): void;
    add_listener<T extends keyof V86StarterEventParams>(event: T, fn: (arg: V86StarterEventParams[T]) => void): void;
    remove_listenerr<T extends keyof V86StarterEventParams>(event: T, fn: (arg: V86StarterEventParams[T]) => void): void;
    screen_set_scale(sx: number, sy: number): void;
    get_bzimage_initrd_from_filesystem(filesystem): {
      initrd: any;
      bzimage: any;
    };
    run(): void;
    stop(): void;
    destroy(): void;
    restart(): void;
    restore_state(state: ArrayBuffer): void;
    save_state(callback: (error: Object, state: ArrayBuffer) => void): void;
    get_statistics(): any;
    get_instruction_counter(): number;
    is_running(): boolean;
    keyboard_send_scancodes(codes: number[]): void;
    keyboard_send_keys(codes: number[]): void;
    keyboard_send_text(text: string): void;
    screen_make_screenshot(): void;
    screen_go_fullscreen(): void;
    lock_mouse(): void;
    mouse_set_status(enabled: boolean): void;
    keyboard_set_status(enabled: boolean): void;
    serial_send_bytes(serial: number, data: Uint8Array): void;
    mount_fs(path: string, baseurl: string | undefined, basefs: string | undefined, callback: (err: Object) => void): void;
    create_file(file: string, data: Uint8Array, callback: (err: Object) => void): void;
    read_file(file: string, callback: (err: Object, data: Uint8Array) => void): void;
    read_memory(offset: number, length: number): Uint8Array;
    write_memory(blob: Uint8Array, offset: number): any;
  }
}
