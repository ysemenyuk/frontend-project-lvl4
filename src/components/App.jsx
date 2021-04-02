import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import Modal from './Modal.jsx';

const App = () => (
  <Row className="h-100 pb-3">
    <Col xs={3} className="border-right">
      <Channels />
    </Col>
    <Col className="h-100">
      <Chat />
    </Col>
    <Modal />
  </Row>
);

export default App;
