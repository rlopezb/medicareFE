import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {BsCapsulePill, BsFillCartFill, BsPersonFill} from "react-icons/bs";
import React from "react";

function AppBar({user}) {
  return <Navbar className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand><BsCapsulePill size={40} className="me-3 text-danger"/>Medicare Corporation</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/checkout">Checkout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        {user.username}<Button variant="light" className="ms-2"><BsPersonFill size={28} className="text-primary"/></Button>
        <Button variant="light"><BsFillCartFill size={28} className="text-primary"/></Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

export default AppBar;