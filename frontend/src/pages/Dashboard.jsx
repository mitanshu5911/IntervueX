import React from 'react'
import {useAuth} from '../contexts/AuthContext'

const Dashboard = () => {
  const {user, logout} = useAuth();
  return (
    <div>welcome {user?.name}  
    <br />
    <button
      onClick={()=>logout()}
    >Logout</button>
    </div>

  )
}

export default Dashboard