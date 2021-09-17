import type { Component } from "solid-js";

import Game from "./components/Game";

const App: Component = () => {
  return (
    <div>
      <h1>Let's play Noughts & Crosses</h1>
      <Game></Game>
    </div>
  );
};

export default App;
