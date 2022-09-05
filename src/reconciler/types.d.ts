declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      w95Window: {
        ref?: React.Ref<{ hwnd: number } | null | undefined>;
        type: 'Button' | 'Static' | 'Edit' | 'WindowsApp';
        text?: string;
        extStyle?: number;
        params: number;
        x: number;
        y: number;
        w: number;
        h: number;
        menuId?: number;
        children?: null | string | JSX.Element | (string | JSX.Element | null)[];
        onEvent?: (e: EventPayload, ref: Win95Ref) => void;
        onReady?: () => void;
      };

      w95Font: {
        ref?: React.Ref<{ id: number } | null | undefined>;
        width?: number;
        height?: number;
        weight?: number;
        italic?: boolean;
        underline?: boolean;
        strikeOut?: boolean;
        faceName?: string;
      };
    }
  }
}

export {};
