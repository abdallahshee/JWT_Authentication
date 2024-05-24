import React from 'react' 
import {Field,Formik} from 'formik'
import { UserRequest } from '/imports/user'
import {instance} from './../../imports/dotenv'

export type Login={
    username:string
    password:string
}

const initialValues:Login={
    username:'',
    password:'',
}
const loginUser=async(form:Login)=>{
    const result=await instance.post('/login', form)
     console.log(result)
    localStorage.setItem('token',result.data.token)
}
const Login = () => {
  return (
  <Formik initialValues={initialValues} onSubmit={(values:Login)=>{
    console.log(values)
    loginUser(values)
  }

  }>
    {({handleSubmit})=>(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <Field name='username'></Field>
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

export default Login