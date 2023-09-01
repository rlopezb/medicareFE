import AppBar from "../components/AppBar";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";

function DefaultLayout({children}) {
  const user = useSelector(state => state.user);

  return <Container fluid className="mt-3 mb-3">
    <AppBar user={user}/>
    {children}
  </Container>
}

export default DefaultLayout;