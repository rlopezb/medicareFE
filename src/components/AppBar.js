import {Badge, Button, Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import {BsCapsulePill, BsFillCartFill, BsPersonFill} from "react-icons/bs";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {dispatch as emit} from 'use-bus';
import ShoppingCart from "./ShoppingCart";


function AppBar() {
  const user = useSelector(state => state.user);
  const purchase = useSelector(state => state.purchase);
  const loading = useSelector(state => state.loading);
  let [show, setShow] = useState(false);

  const count = () => {
    if (typeof purchase !== 'undefined') {
      let count = 0;
      purchase.purchaseMedicines.forEach(purchaseMedicine => count = count + purchaseMedicine.quantity);
      return count;
    }
    return '';
  }
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  return <div><Navbar className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand><BsCapsulePill size={40} className="me-3 text-danger"/>Medicare Corporation</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link disabled={loading} href="/home">Home</Nav.Link>
          <Nav.Link disabled={loading} href="/checkout">Checkout</Nav.Link>
          <Nav.Link disabled={loading} href="/orders">Orders</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        {user.username}<Button disabled={loading} variant="light" className="ms-2"><BsPersonFill size={28}
                                                                              className="text-primary"/></Button>
        <Button disabled={loading || count() === '' || count() === 0} variant="light" onClick={() => onShow()}>
          <BsFillCartFill size={28} className="text-primary"/>
          <Badge pill bg="secondary"
                 className={(count() === '' || count() === 0) ? 'invisible' : 'visible'}>{count()}</Badge>
        </Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    <Offcanvas show={show} onHide={onClose} placement='end'>
      <Offcanvas.Header closeButton/>
      <Offcanvas.Body>
        <ShoppingCart/>
      </Offcanvas.Body>
    </Offcanvas>
  </div>

}

export default AppBar;