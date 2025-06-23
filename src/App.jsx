import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Header from './components/Header'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Context } from './main'
import { server } from './main'

const App = () => {

  const {setUser,setIsAuthenticated,setLoader}=useContext(Context);

  useEffect(() => {
    setLoader(true)
   axios.get(`${server}/users/me`,{
    withCredentials: true,
   }).then((res) => {
     setUser(res.data.user);
     setIsAuthenticated(true);
     setLoader(false)
   }).catch((error) => {
     console.log(error)
     setUser({})
     setIsAuthenticated(false);
     setLoader(false)
   })
  },[])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App;

