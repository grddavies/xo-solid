import { Component, For, children, JSXElement, createEffect } from "solid-js";
import { SquareVal, Square } from "./Square";

interface BoardProps {
  squares: SquareVal[];
  onClick: (i: number) => void;
  winningLine: number[];
}

const Board: Component<BoardProps> = (props: BoardProps) => {
  let rows = [0, 1, 2];
  let cols = rows;
  return (
    <div>
      <For each={rows}>
        {(i) => (
          <div className="board-row">
            <For each={cols}>
              {(j) => {
                console.log("squid:", 3*i+j, "=", props.squares[3 * i + j])
                return (
                <Square
                  id={3 * i + j}
                  value={props.squares[3 * i + j]}
                  inWinningLine={props.winningLine.includes(3 * i + j)}
                  onClick={() => props.onClick(3 * i + j)}
                />
              )}}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};

export { Board };
