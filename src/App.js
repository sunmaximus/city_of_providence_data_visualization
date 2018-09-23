import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';

import Providence from './Providence';

class App extends Component {
  render() {
    return (
      <Container>
        <Providence />
      </Container>
    );
  }
}

export default App;
