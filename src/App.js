import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import AppRouter from "./router/AppRouter";
import './style/App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Container>
      <ToastContainer position="top-center" theme="colored"/>
      <AppRouter/>
    </Container>
  );
}

export default App;
