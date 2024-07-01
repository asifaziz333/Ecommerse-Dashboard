import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem("user");
    console.log(auth);
    if(!auth){
      navigate('/signup')
    }
  },[])
  return (
    <div>
      <h2>Logout page</h2>
    </div>
  )
}

export default Logout
