import React from 'react'
import { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'

const Profile = () => {
  const {isAuthenticated,loader,user}=useContext(Context);
  //console.log(user);
  return (
    loader?<Loader/>:(
      <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>
    )
  )
}

export default Profile
