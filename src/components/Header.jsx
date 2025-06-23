import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import { server } from '../main'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

const Header = () => {
  const {isAuthenticated,setIsAuthenticated}=useContext(Context);
  const {loader,setLoader}=useContext(Context);
  

  console.log(isAuthenticated);

  const logoutHandler = async (e) => {
        
        
        setLoader(true)
        try {
            //axios syntax- axios.Method(url,data,config)
        const {data}= await axios.get(`${server}/users/logout`,{
            
            withCredentials: true //Mandetory otherwise cookies won't work
        });

        toast.success(data.message)
        setIsAuthenticated(false)
        setLoader(false)
        //console.log(data)
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error)
            setIsAuthenticated(true)
            setLoader(false)
        }
           

    }

  return (
    <nav className='header'>
      <div>
        <h2>ToDo App</h2>
      </div>
      <article>
        <Link to={"/"}>
        Home
        </Link>
        <Link to={"/profile"}>
        Profile
        </Link>
        {
          isAuthenticated?<button className='btn' disabled={loader} onClick={logoutHandler}>LogOut</button>:<Link className='btn' to={"/login"}>Login</Link>
        }
      </article>
    </nav>
  )
}

export default Header
