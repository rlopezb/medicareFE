import {Route, Routes} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
function AppRouter(){
  return <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/home' element={<Home/>}/>
  </Routes>;
}

export default AppRouter;