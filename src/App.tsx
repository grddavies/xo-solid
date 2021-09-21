import type { Component } from "solid-js";

import { Row, Game, Navbar, Col } from "./components";

const App: Component = () => {
  return (
    <>
      <Navbar></Navbar>
      <main role="main" className="container">
        <Row>
          <Col width="6" className="offset-3">
            <h1 className="text-center">Noughts & Crosses</h1>
              <Game></Game>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default App;
