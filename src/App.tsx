import type { Component } from "solid-js";

import Game from './components/Game'

const App: Component = () => {
  return (
    <div>
      <header>
        Let's play Noughts & Crosses
      </header>
      <Game></Game>
    </div>
  );
};

export default App;
