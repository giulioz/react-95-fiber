import { WS_VISIBLE, WS_CHILD } from "../emulator95/constants";

export function Button({
  onClick,
  x,
  y,
  w,
  h,
  children,
}: {
  onClick?: () => void;
  x: number;
  y: number;
  w: number;
  h: number;
  children: string | JSX.Element;
}) {
  return (
    <w95Window
      type="Button"
      onCommand={onClick}
      params={WS_VISIBLE | WS_CHILD}
      x={x}
      y={y}
      w={w}
      h={h}
    >
      {children}
    </w95Window>
  );
}
