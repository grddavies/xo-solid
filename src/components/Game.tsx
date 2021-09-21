import {
  Component,
  createMemo,
  createSignal,
  Show,
  Switch,
  Match,
} from "solid-js";
import { Board, Col, Row } from "./index";
import {
  calculateWinner,
  getMoveHistory,
  getWinningLine,
} from "../utils/game-utils";
import { SquareVal } from "./Square";
import createLocalStore from "../utils/createLocalStore";

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
  const [state, setState] = createLocalStore(initState),
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
    <Row>
      <Row>
        <Col className="d-flex justify-content-center">
    <div className="game">
      <button onclick={() => initGame()}>New Game</button>
      <div className="game-board">
        <Board
          squares={current()}
          onClick={(i) => handleClick(i)}
          winningLine={winningLine()}
        />
        </Col>
      </Row>
      <Row className="game-board">
        <Col className="d-flex justify-content-center">
          <Board
            squares={current()}
            onClick={(i) => handleClick(i)}
            winningLine={winningLine()}
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className="game-ctrl">
            <Show when={state.currentMoveNum > 0}>
              <button
                class="btn btn-sm btn-outline-dark"
                onclick={() => initGame()}
              >
                New Game
              </button>
            </Show>
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default Game;
