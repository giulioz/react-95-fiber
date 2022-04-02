declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      w95Window: {
        ref?: React.Ref<{ id: number } | null | undefined>;
        type: 'Button' | 'Static' | 'Edit' | 'WindowsApp';
        text?: string;
        extStyle?: number;
        params: number;
        x: number;
        y: number;
        w: number;
        h: number;
        menuId?: number;
        children?: JSX.Element[] | JSX.Element | string;
        onEvent?: (e: EventPayload, ref: Win95Ref) => void;
      };
    }
  }
}

export {};
