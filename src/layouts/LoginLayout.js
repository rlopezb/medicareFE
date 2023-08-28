import {Col, Container, Row} from "react-bootstrap";
import background from "./background.jpg";

function LoginLayout({children}) {
  return <Container fluid className="vh-100 flex-column d-flex justify-content-center align-content-center"
                    style={{backgroundImage: `url(${background})`, backgroundSize: '100%', color: 'white'}}>
    <Row>
      <Col>
        {children}
      </Col>
    </Row>
  </Container>
}

export default LoginLayout;