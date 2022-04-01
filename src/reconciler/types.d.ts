declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      w95Window: {
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
        onCommand?: () => void;
      };
    }
  }
}

export {};
