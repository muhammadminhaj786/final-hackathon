import React from 'react'
import "./App.css"
import Login from './pages/login/Login'
import AppRoutes from "./router/AppRoutes"

const App = () => {
  let userType = localStorage.getItem("userType")
  return (
    <>
      <AppRoutes userType={userType}  />
    </>
  )
}

export default App