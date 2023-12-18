
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import {Admin, Login, MYProfile, Student} from "../pages/index"
const NewuserType = localStorage.getItem("userType")
console.log(NewuserType)

const AppRoutes = ({ userType }) => {
  return (
    <>
      {/* <Routes>
      {userType === "admin" ? (
        <Route element={<AdminRoute />}>
          <Route index element={<Admin />} />
        </Route>
      ) : (
        <Route element={<ProtectedRoute />}>
            <Route index element={<Student />} />
        </Route>
      )}

      <Route element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes> */}
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="login" element={<Login />}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        {/* <Route path="admin" element={<Student />}/>  */}
        {userType=="student"? (
          <>
            <Route index element={<Student />}/>
            <Route path="myprofile" element={<MYProfile />}/>
          </>
        ):(<Route index element={<Admin/ >}/>)}
      </Route>
    </Routes>
    </>
  );
};

export default AppRoutes;
