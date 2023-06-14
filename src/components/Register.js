import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useSelector } from 'react-redux'
import { selectIsAuthorized, selectIsLoginAuthToken } from '../store/reducer/authReducer'

const Register = () => {
    const authToken = useSelector(selectIsLoginAuthToken)
    
  if (!authToken) {
    <Navigate to={'/signup'}/>
  }
  return (
    <div className='container d-flex flex-column justify-content-center align-content-center h-100'>
        csdcsd
        
            <Routes>
        
        
        </Routes>
    </div>
  )
}

export default Register