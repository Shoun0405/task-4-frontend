import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { registrateAsync} from '../store/reducer/authReducer'
import { Link, useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const {handleSubmit, register,formState:{isSubmitSuccessful},setValue} = useForm()


    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const {firstName,lastName,email,password} = data
        await registrateAsync(firstName,lastName,email,password)
        setValue('firstName','')
        setValue('lastName','')
        setValue('email','')
        setValue('password','')
    }

    useEffect(()=>{
    },[])
    
    if (isSubmitSuccessful) {
      navigate('/login')
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='register-form' >
  <Form.Group className="mb-3 d-grid" controlId="exampleForm.ControlInput1">
    <Form.Label size='lg'>First Name</Form.Label>
    <Form.Control {...register("firstName",{required:true})} placeholder="First name" />
  </Form.Group>
  <Form.Group className="mb-3  d-grid" controlId="exampleForm.ControlInput2">
    <Form.Label size='lg'>Last Name</Form.Label>
    <Form.Control {...register("lastName",{required:true})} placeholder="Last name" />
  </Form.Group>
  <Form.Group className="mb-3  d-grid" controlId="exampleForm.ControlInput3">
    <Form.Label size='lg'>Email address</Form.Label>
    <Form.Control {...register("email",{required:true})} placeholder="Email" />
  </Form.Group>
  <Form.Group className="mb-3  d-grid" controlId="exampleForm.ControlInput4">
    <Form.Label size='lg'>Password</Form.Label>
    <Form.Control {...register("password",{required:true})} placeholder="Password" />
  </Form.Group>
  <div className='d-grid mb-3'><Button size='lg' variant="primary" type='submit'>Submit</Button></div>
  
  <Link to={'/login'}> If you have registrate ? Go to Login</Link>
    </Form>
  )
}

export default SignUpForm