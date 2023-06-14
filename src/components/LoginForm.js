import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { loginAsync, selectAccount, selectIsAuthorized } from '../store/reducer/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const LoginForm = () => {
    const autoritzed = useSelector(selectIsAuthorized)
    const {handleSubmit, register,formState:{isSubmitSuccessful},setValue} = useForm()
    const [loginUser,setLoginUser] = useState()

    const dispatch = useDispatch()


    const onSubmit = (data) => {
      setLoginUser(data)
      setValue('email','')
      setValue('password','')
        }
        useEffect(()=>{
          if (isSubmitSuccessful) {
            const {email,password} = loginUser
          dispatch(loginAsync(email,password))
          }
        },[isSubmitSuccessful])

        if (autoritzed && isSubmitSuccessful) {
          return <Navigate to={'/user-list'} replace/>
        }
        
  return (

        <Form onSubmit={handleSubmit(onSubmit)} className='register-form' >
      <Form.Group className="mb-3  d-grid" controlId="exampleForm.ControlInput3">
        <Form.Label size='lg'>Email address</Form.Label>
        <Form.Control {...register("email",{required:true})} placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3  d-grid" controlId="exampleForm.ControlInput4">
        <Form.Label size='lg'>Password</Form.Label>
        <Form.Control {...register("password",{required:true})} placeholder="Password" />
      </Form.Group>
      <div className='d-grid mb-3'><Button size='lg' variant="primary" type='submit'>Submit</Button></div>
      <Link to={'/'} > If you have not registrate? Go to Sign up </Link>
    </Form>

  )
}

export default LoginForm