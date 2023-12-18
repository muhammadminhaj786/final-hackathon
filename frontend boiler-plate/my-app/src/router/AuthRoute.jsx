
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const userType = localStorage.getItem("userType")
const AuthRoute = () => {
    return !localStorage.getItem("accessToken") ? <Outlet /> :<Navigate to={"/"} />
};

export default AuthRoute;