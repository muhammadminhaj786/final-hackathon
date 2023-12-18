
import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = () => {
  return localStorage.getItem("accessToken") && (localStorage.getItem("userType")=="admin") ? ( <> <Header />
  <Outlet />
  </>) :( <Navigate to={"/login"} />)
}

export default AdminRoute