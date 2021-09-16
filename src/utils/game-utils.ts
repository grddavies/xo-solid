import { SquareVal } from "../components/Square";
import zipWith from "./zipWith";

function diffBoards(current: SquareVal[], last: SquareVal[]) {
  const squareChanged = zipWith(current, last, (x: any, y: any) => x !== y);
  const newindex = squareChanged.flatMap((bool: boolean, index: number) =>
    bool ? index : []
  )[0];
  return {
    row: Math.floor(newindex / 3),
    col: newindex % 3,
  };
}

function getMoveHistory(history: SquareVal[][]) {
  if (history.length < 1) return []
  return zipWith(history.slice(1), history.slice(0, -1), diffBoards) as {row: number, col: number}[]
}

function calculateWinner(squares: SquareVal[]) {
  const line = getWinningLine(squares);
  return line ? squares[line[0]] : null;
}

function getWinningLine(squares: SquareVal[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return [];
}

export { getMoveHistory, calculateWinner, getWinningLine };
