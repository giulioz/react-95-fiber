declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      w95Window: {
        type: "Button" | "Static";
        text?: string;
        params: number;
        x: number;
        y: number;
        w: number;
        h: number;
        children?: JSX.Element | string;
        onCommand?: () => void;
      };
    }
  }
}

export {};
