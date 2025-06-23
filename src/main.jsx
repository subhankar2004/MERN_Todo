import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/app.scss"
import "./styles/login.scss"
import "./styles/features.scss"
import "./styles/mediaquery.scss"
import "./styles/header.scss"
import App from './App.jsx'
import { createContext,useState } from 'react'

export const server="https://node-api-2ok4.onrender.com/api/v1"

export const Context=createContext({isAuthenticated:false})

const AppWrapper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [loader,setLoader]=useState(false);
  const [user,setUser]=useState({});
  return (
    <Context.Provider value={
      {
        isAuthenticated,
        setIsAuthenticated,
        loader,
        setLoader,
        user,
        setUser
      }
    }>
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
    
  </StrictMode>,
)
