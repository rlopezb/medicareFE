import {Badge, Button, Container, DropdownButton, Navbar, Offcanvas, Dropdown} from "react-bootstrap";
import {BsCapsulePill, BsFillCartFill, BsPersonFill} from "react-icons/bs";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ShoppingCart from "./ShoppingCart";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


function AppBar() {
  const location = useLocation();
  let dispatch = useDispatch();
  const navigate = useNavigate();
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
  const onLogout = () => {
    dispatch({type: "DELETE_USER"});
    toast.success("Logged out successfully");
    navigate('/');
  }


  return typeof user !== 'undefined' && <div><Navbar className="bg-body-tertiary">
    <Container fluid>
      <Navbar.Brand><BsCapsulePill size={40} className="me-3 text-danger"/>Medicare Corporation</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {user.username}
        <DropdownButton align="end" disabled={loading} variant='light' className='ms-2'
                        title={<BsPersonFill size={28} className="text-primary"/>}>
          {user.role === 'ROLE_USER' && <div><Dropdown.Item href="/home">Home</Dropdown.Item>
            <Dropdown.Item href="/checkout">Checkout</Dropdown.Item>
            <Dropdown.Item href="/orders">Orders</Dropdown.Item>
          </div>}
          {user.role === 'ROLE_ADMIN' && <div><Dropdown.Item href="/admin">Admin</Dropdown.Item>
          </div>}

          <Dropdown.Divider/>
          <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
        </DropdownButton>
        <Button className={(user.role === 'ROLE_ADMIN' || location.pathname === '/checkout') ? 'invisible' : 'visible'}
                disabled={loading || count() === '' || count() === 0} variant="light" onClick={() => onShow()}>
          <BsFillCartFill size={28} className="text-primary"/>
          <Badge pill bg="secondary"
                 className={(count() === '' || count() === 0 || user.role === 'ROLE_ADMIN' || location.pathname === '/checkout') ? 'invisible' : 'visible'}>{count()}</Badge>
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