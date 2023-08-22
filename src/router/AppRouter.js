import {Route, Routes} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
function AppRouter(){
  return <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/admin' element={<ProtectedRoute admin><Admin/></ProtectedRoute>}/>
  </Routes>;
}

export default AppRouter;