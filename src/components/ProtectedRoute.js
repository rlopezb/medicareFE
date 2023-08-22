import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const ProtectedRoute = ({children, admin}) => {
  const user = useSelector((state) => state.user);

  if (admin && !user) {
    toast.error("You must be authenticated as administrator");
    return <Navigate to="/login" replace/>;
  }
  if (!user) {
    toast.error("You must be authenticated");
    return <Navigate to="/login" replace/>;
  }
  if (admin && user.role !== "ROLE_ADMIN") {
    toast.error("You must be administrator");
    return <Navigate to="/login" replace/>;
  }
  return children ? children : <Outlet/>;
};

export default ProtectedRoute;