import { Component, createEffect, createMemo, Show } from "solid-js";
import { Board } from "./Board";
import {
  calculateWinner,
  getMoveHistory,
  getWinningLine,
} from "../utils/game-utils";
import { SquareVal } from "./Square";
// import createLocalStore from "../utils/createLocalStore";
import { createStore } from "solid-js/store";

interface Game {
  history: SquareVal[][];
  currentMoveNum: number;
  winner: SquareVal
}

const Game: Component = () => {
  // set up game state
  let initState: Game = {
    history: [Array(9).fill(null)],
    currentMoveNum: 0,
    winner: null
  };
  const [state, setState] = createStore(initState);
  const lastMoveNum = createMemo(() => state.history.length);
  const moveHistory = createMemo(() => getMoveHistory(state.history));
  const winningLine = createMemo(() => getWinningLine(state.history[state.currentMoveNum]))
  // function to handle clicks on squares based on turn
  const handleClick = (i: number) => {
    console.log("called handleClick")
    const current = state.history[state.currentMoveNum];
    const squares = current.slice();
    // ignore clicks on filled squares or after end
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // update square being clicked
    squares[i] = state.currentMoveNum % 2 === 0 ? "X" : "O";

    setState((state) => ({
      history: state.history.concat([squares]),
      currentMoveNum: state.currentMoveNum + 1,
      winner: calculateWinner(squares)
    }));
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history[state.currentMoveNum]}
          onClick={(i) => handleClick(i)}
          winningLine={winningLine()}
        />
      </div>
      <div className="game-info">
        <Show when={!state.winner} fallback={"Winner: " + state.winner}>
          {"Next player: " + (state.currentMoveNum % 2 === 0 ? "X" : "O")}
        </Show>
      </div>
    </div>
  );
};

export default Game;
