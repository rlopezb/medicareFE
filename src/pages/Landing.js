import LoginLayout from "../layouts/LoginLayout";
import {Link} from "react-router-dom";
import React from "react";

function Landing(){
  return <LoginLayout>
    <h1 style={{width: '32rem', margin: '0 auto'}}>Medicare Corporation</h1>
    <div className="mt-3">
      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary fw-bold">Sign up</Link>
      </p>
    </div>
    <div className="mt-3">
      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary fw-bold">Login</Link>
      </p>
    </div>
  </LoginLayout>
}

export default Landing;