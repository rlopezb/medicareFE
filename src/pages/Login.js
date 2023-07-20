import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../api/api";

function Login() {
  let user = useSelector(gs => gs.user);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function onLogin(event) {
    event.preventDefault();
    dispatch(login());
  }

  function login() {
    return dispatch => {
      api
          .post("/auth/login", {username: 'rlopezb', password: '25Junio2005'})
          .then(result => {
            dispatch({type: "SET_USER", payload: result.data});
            toast.success("User logged successfully");
            if (user.role === "ROLE_ADMIN") {
              navigate('/admin');
            } else {
              navigate('/home');
            }
          })
          .catch(error => {
            toast.error(error.message);
          });
    };

  }

  return <Container className="vh-100 flex-column d-flex justify-content-center align-content-center">
    <Row>
      <Col>
        <Card style={{width: '18rem', margin: '0 auto'}} className="shadow-lg">
          <Card.Img variant="top" src="img/medicare.jpg"/>
          <Card.Body>
            <Card.Title>Medicare</Card.Title>
            <Form>
              <Form.Group className="mb-3"><Form.Label className="text-center">Username</Form.Label><Form.Control
                  type="text" placeholder="Enter username"/></Form.Group>
              <Form.Group className="mb-3"><Form.Label className="text-center">Password</Form.Label><Form.Control
                  type="password" placeholder="Enter password"/></Form.Group>
              <div className="d-grid"><Button variant="primary" type="submit"
                                              onClick={(event) => onLogin(event)}>Login</Button></div>
            </Form>
            <div className="mt-3">
              <p className="text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary fw-bold">Sign up</Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default Login;