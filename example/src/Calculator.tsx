import React, { useState } from 'react';
import { Button, Edit, ES_READONLY, Window } from '../../src';

const calc = (a: number, b: number, op: '+' | '-') => (op === '+' ? a + b : a - b);

export function Calculator({ open, onClose }: { open: boolean; onClose?: () => void }) {
  const [calcState, setCalcState] = useState({
    writingValue: 0 as number | null,
    writingValueComma: false,
    previousValue: null as number | null,
    op: null as null | '+' | '-',
    isResult: false,
  });

  function addDigit(n: number) {
    setCalcState(state => {
      if (state.writingValue === 0 || state.isResult || state.writingValue === null) return { ...state, writingValue: n, isResult: false };
      else if (!state.writingValueComma) return { ...state, writingValue: state.writingValue * 10 + n };
      else return { ...state, writingValue: Number(state.writingValue.toString() + (Math.floor(state.writingValue) === state.writingValue ? '.' : '') + n) };
    });
  }

  function toggleComma() {
    setCalcState(s => ({ ...s, writingValueComma: true }));
  }

  function setOp(op: '+' | '-') {
    setCalcState(s => ({
      op,
      previousValue: s.previousValue !== null && s.writingValue !== null ? calc(s.previousValue, s.writingValue, op) : s.writingValue,
      writingValue: null,
      writingValueComma: false,
      isResult: false,
    }));
  }

  function calcResult() {
    setCalcState(s =>
      s.previousValue !== null && s.writingValue !== null && s.op
        ? {
            writingValue: calc(s.previousValue, s.writingValue, s.op),
            writingValueComma: false,
            previousValue: null,
            op: null,
            isResult: true,
          }
        : s,
    );
  }

  function clear() {
    setCalcState({ writingValue: 0, writingValueComma: false, previousValue: null, op: null, isResult: false });
  }

  return (
    <>
      <Window title='Calculator' w={184} h={236} open={open} onClose={onClose}>
        <Edit x={16} y={16} w={152} h={20} params={ES_READONLY}>
          {(calcState.writingValue !== null ? calcState.writingValue : calcState.previousValue || 0).toString()}
        </Edit>

        <CalculatorButton onClick={() => addDigit(7)} x={16} y={16 + 20 + 8}>
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(8)} x={16 + 32 + 8} y={16 + 20 + 8}>
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(9)} x={16 + 32 * 2 + 8 * 2} y={16 + 20 + 8}>
          9
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(4)} x={16} y={16 + 20 + 32 + 8 * 2}>
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(5)} x={16 + 32 + 8} y={16 + 20 + 32 + 8 * 2}>
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(6)} x={16 + 32 * 2 + 8 * 2} y={16 + 20 + 32 + 8 * 2}>
          6
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(1)} x={16} y={16 + 20 + 32 * 2 + 8 * 3}>
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(2)} x={16 + 32 + 8} y={16 + 20 + 32 * 2 + 8 * 3}>
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(3)} x={16 + 32 * 2 + 8 * 2} y={16 + 20 + 32 * 2 + 8 * 3}>
          3
        </CalculatorButton>
        <CalculatorButton onClick={clear} x={16} y={16 + 20 + 32 * 3 + 8 * 4}>
          C
        </CalculatorButton>
        <CalculatorButton onClick={() => addDigit(0)} x={16 + 32 + 8} y={16 + 20 + 32 * 3 + 8 * 4}>
          0
        </CalculatorButton>
        <CalculatorButton onClick={toggleComma} x={16 + 32 * 2 + 8 * 2} y={16 + 20 + 32 * 3 + 8 * 4}>
          .
        </CalculatorButton>

        <CalculatorButton onClick={() => setOp('+')} x={16 + 32 * 3 + 8 * 3} y={16 + 20 + 8}>
          +
        </CalculatorButton>
        <CalculatorButton onClick={() => setOp('-')} x={16 + 32 * 3 + 8 * 3} y={16 + 20 + 32 + 8 * 2}>
          -
        </CalculatorButton>
        <CalculatorButton onClick={calcResult} x={16 + 32 * 3 + 8 * 3} y={16 + 20 + 32 * 2 + 8 * 3} h={72}>
          =
        </CalculatorButton>
      </Window>
    </>
  );
}

function CalculatorButton({
  onClick,
  x,
  y,
  w = 32,
  h = 32,
  children,
}: {
  onClick: () => void;
  x: number;
  y: number;
  w?: number;
  h?: number;
  children: string;
}) {
  return (
    <Button onClick={onClick} x={x} y={y} w={w} h={h}>
      {children}
      <w95Font weight={700} />
    </Button>
  );
}
