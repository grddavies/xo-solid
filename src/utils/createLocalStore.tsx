import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import Game from "../components/Game";

const LOCAL_STORAGE_KEY = "xo-solid";
export default function createLocalStore(value: Game) {
  // load stored game state on init
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY),
    gamedata: Game = stored ? JSON.parse(stored)! : value,
    [state, setState] = createStore(gamedata);
  // JSON.stringify creates deps on every iterable field
  createEffect(() =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  );
  return { state, setState };
}
