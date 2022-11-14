import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navibar() {
  return (
    <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">KoroLearn</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/log">Log</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
  );
}

export default Navibar;
