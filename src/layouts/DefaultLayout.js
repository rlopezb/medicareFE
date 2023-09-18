import React from "react";
import AppBar from "../components/AppBar";
import {Container} from "react-bootstrap";

function DefaultLayout({children}) {
  return <Container fluid className="mt-3 mb-3">
    <AppBar/>
    {children}
  </Container>
}

export default DefaultLayout;