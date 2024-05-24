import React from 'react' 
import {Field,Formik} from 'formik'
import { UserRequest } from '/imports/user'
import {instance} from './../../imports/dotenv'
const initialValuies:UserRequest={
    username:'',
    email:'',
    password:'',
}
const registerUser=async(form:UserRequest)=>{
    const result=await instance.post('/register', form)
     console.log(result)
    localStorage.setItem('token',result.data.token)
}
const Register = () => {
  return (
  <Formik initialValues={initialValuies} onSubmit={(values:UserRequest)=>{
    console.log(values)
    registerUser(values)
  }

  }>
    {({handleSubmit})=>(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <Field name='username'></Field>
            </div>
            <div>
                <label>Email</label>
                <Field name='email'></Field>
            </div>
            <div>
                <label>Password</label>
                <Field name='password' type='pasword'></Field>
            </div>
            <div>
                <button type='submit'>Register</button>
            </div>
        </form>
    )}
  </Formik>
  )
}

export default Register