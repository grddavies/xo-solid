import { Component, createMemo, createSignal, Show } from "solid-js";
import Board from "./Board";
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
  winner: SquareVal;
}

const Game: Component = () => {
  const initState: Game = {
    history: [Array(9).fill(null)],
    currentMoveNum: 0,
    winner: null,
  };
  const [state, setState] = createStore(initState),
    [current, setCurrent] = createSignal(state.history[state.currentMoveNum]),
    initGame = () => {
      setState({
        history: [Array(9).fill(null)],
        currentMoveNum: 0,
        winner: null,
      });
      setCurrent(Array(9).fill(null));
    },
    lastMoveNum = createMemo(() => state.history.length),
    moveHistory = createMemo(() => getMoveHistory(state.history)),
    winningLine = createMemo(() => getWinningLine(current())),
    handleClick = (i: number) => {
      const squares = current().slice();
      // ignore clicks on filled squares or after end
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      // update square being clicked
      squares[i] = state.currentMoveNum % 2 === 0 ? "X" : "O";
      setState((state) => ({
        history: state.history.concat([squares]),
        currentMoveNum: state.currentMoveNum + 1,
        winner: calculateWinner(squares),
      }));
      setCurrent(squares);
    };
  return (
    <div className="game">
      <button onclick={() => initGame()}>New Game</button>
      <div className="game-board">
        <Board
          squares={current()}
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
