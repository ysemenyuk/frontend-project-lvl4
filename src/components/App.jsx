import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

const App = () => {
  console.log('App');

  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <Channels />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
    </Row>
  );
};

export default App;
