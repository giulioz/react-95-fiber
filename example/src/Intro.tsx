import React from 'react';
import { Button, Window, Label, Icon } from '../../src';

export function Intro({ openIconsViewer, openCalculator }: { openIconsViewer: () => void; openCalculator: () => void }) {
  return (
    <Window title='react-95-fiber' w={280} h={220}>
      <Icon iconId={39} x={10} y={10} w={32} h={32} />

      <Label x={10} y={55} w={250} h={25}>
        Welcome to react-95-fiber :)
        <w95Font weight={700} />
      </Label>

      <Label x={10} y={80} w={220} h={20}>
        Use the buttons below to open examples:
      </Label>

      <Button onClick={openIconsViewer} x={10} y={110} w={120} h={25}>
        Available icons
      </Button>

      <Button onClick={openCalculator} x={10} y={145} w={120} h={25}>
        Calculator
      </Button>
    </Window>
  );
}
