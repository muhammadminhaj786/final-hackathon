import React, { useState } from 'react'
import "./Login.css"
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/slices/authSlice';

//create a schema
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    // .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(7, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});



const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
//   for signup navigate
 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
  
      dispatch(loginAction({values,navigate}))
      
    },
  });

  return (
    <div className='  main-screen'>
        <div className=' my-bg'>
     
        </div>
        <div className='  second-screen  '>
          <div className='Inner '>
          <div style={{marginTop:"18%"}}>
          <h1 className='main-heading-2'>
            Login Account
          </h1>
          </div>
          <p className=' main-para-2 '>
            Attendence System 
          </p>
            <form onSubmit={formik.handleSubmit}>
            <div className='inp' >
          <TextField sx={{width:"100%"}}
          name='email'
          label="Email"
          // type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          // autoComplete="current-password"
        />
            <br />
            
            <TextField sx={{width:"100%" ,marginTop:"10px"}}
          name='password'
          label="Password"
          type="password"
          // autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
          </div>
          <div className='down-field' >
              {/* <p className=' inp3 ' >
                <Link className='link1' to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                <br />
                <Link className='link1' to="/forgot" variant="body2">
                  {"Forgot Password"}
                </Link>
              </p> */}
          </div>
          <div style={{marginTop:"20px"}} className='w-[80%] mx-auto '>
            <button  type='submit' className='login-btn ' >Login</button>
          </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login

