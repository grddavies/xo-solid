import { Component } from "solid-js";

type SquareVal = 'X' | 'O' | null

interface Square {
    id: number;
    value: SquareVal;
    onClick: () => void;
    highlight?: boolean;
    inWinningLine?: boolean;
}

const Square: Component<Square> = (props: Square) => (
    <button
      className={"square" + (props.inWinningLine ? " winningline" : "")}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );

export { SquareVal, Square }