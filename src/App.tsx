import type { Component } from "solid-js";

import { Row, Game, Container, Col } from "./components";

const App: Component = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col width="6" className="offset-3">
          <h1 className="text-center">Noughts & Crosses</h1>
          <Game></Game>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
