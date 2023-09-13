import {Route, Routes} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
function AppRouter(){
  return <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
    <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
    <Route path='/admin' element={<ProtectedRoute admin><Admin/></ProtectedRoute>}/>
  </Routes>;
}

export default AppRouter;