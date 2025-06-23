import React,{ useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import {Context} from '../main'
import toast from 'react-hot-toast'
import axios from 'axios'
import { server } from '../main'
import { Navigate } from 'react-router-dom'

const Login = () => {

      const [email,setEmail]=useState("")
      const [password,setPassword]=useState("")
      const {isAuthenticated,setIsAuthenticated}=useContext(Context);
      const {loader,setLoader}=useContext(Context);

      const submitHandler = async (e) => {
        e.preventDefault()
        console.log(email,password)
        setLoader(true);
        try {
            //axios syntax- axios.Method(url,data,config)
        const {data}= await axios.post(`${server}/users/login`,{  //data contains the response
            
            email,
            password
        },{
            headers: {
                "Content-Type": "application/json" //Default value,
                
            },
            withCredentials: true //Mandetory otherwise cookies won't work
        });

        toast.success(data.message)
        setIsAuthenticated(true)
        setLoader(false)
        console.log(data)
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
            setIsAuthenticated(false)
            setLoader(false)
        }
           

    }

      if(isAuthenticated) return <Navigate to={'/'} />


  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type='submit' disabled={loader}>Login</button>
            <h4>Or Don't have an account</h4>
            <Link  to={'/register'}>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login
