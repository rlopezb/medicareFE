import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import api from "../api/api";
import {toast} from "react-toastify";
import {Button, Card, Form} from "react-bootstrap";
import React, {useState} from "react";
import LoginLayout from "../layouts/LoginLayout";

function Register() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [user, setUser] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined
  });

  const onRegister = (event) => {
    event.preventDefault();
    dispatch(register());
  }

  function register() {
    return dispatch => {
      api
          .post("/auth/register", user)
          .then(result => {
            dispatch({type: "SET_USER", payload: result.data});
            toast.success("User registered successfully");
            navigate('/login');
          })
          .catch(error => {
            if (error.response) {
              toast.error("User already exists");
            } else if (error.request) {
              toast.error("No connection. Try again later.");
            } else {
              toast.error("Error: " + error.message);
            }
          });
    };

  }

  return <LoginLayout>
    <Card style={{width: '18rem', margin: '0 auto'}} className="shadow-lg">
      <Card.Img variant="top" src="img/medicare.jpg"/>
      <Card.Body>
        <Card.Title>Medicare user register</Card.Title>
        <Form>
          <Form.Group className="mb-3"><Form.Label className="text-center">Username</Form.Label><Form.Control
              type="text" placeholder="Enter username"
              onChange={(event) => setUser({...user, username: event.target.value})}/></Form.Group>
          <Form.Group className="mb-3"><Form.Label className="text-center">Password</Form.Label><Form.Control
              type="password" placeholder="Enter password"
              onChange={(event) => setUser({...user, password: event.target.value})}/></Form.Group>
          <Form.Group className="mb-3"><Form.Label className="text-center">Email</Form.Label><Form.Control
              type="email" placeholder="Enter email"
              onChange={(event) => setUser({...user, email: event.target.value})}/></Form.Group>
          <Form.Group className="mb-3"><Form.Label className="text-center">First name</Form.Label><Form.Control
              type="text" placeholder="Enter your first name"
              onChange={(event) => setUser({...user, firstName: event.target.value})}/></Form.Group>
          <Form.Group className="mb-3"><Form.Label className="text-center">Last name</Form.Label><Form.Control
              type="text" placeholder="Enter your last name"
              onChange={(event) => setUser({...user, lastName: event.target.value})}/></Form.Group>
          <div className="d-grid"><Button variant="primary" type="submit"
                                          onClick={(event) => onRegister(event)}>Register</Button></div>
        </Form>
        <div className="mt-3">
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-bold">Login</Link>
          </p>
        </div>
      </Card.Body>
    </Card>
  </LoginLayout>
}

export default Register;