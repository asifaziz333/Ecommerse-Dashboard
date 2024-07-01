import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [user,setUser]=useState({
    email:"",
    password:""  
  })
  const [err,setError]=useState(false);

  const navigate=useNavigate();
  const handleChange=(e)=>{
     const {name,value}=e.target;
     console.log(name,value);
     setUser({
       ...user,[name]:value
     })
   }
   useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth){
      navigate('/');
    }
  },[])

const login=async(e)=>{
  e.preventDefault();

  const {email,password}=user;
  if(!email || !password){
    setError(true);
    return;
  }
  if(email&&password){
    console.log(user);
  let response=await fetch("http://localhost:4000/login",
  {
    method:'post',
    body:JSON.stringify({email,password}),
    headers:{
      "Content-Type":"application/json"
    }
   }
  )
  console.log(response);
  response=await response.json();
  console.log(response);
  if(response.auth){
  localStorage.setItem("user",JSON.stringify(response.user));
  localStorage.setItem("token",JSON.stringify(response.auth));
  navigate('/')
  }else{
    alert("please fill correct detail")
  }
}
}

  return (

    <>   
   <form autoComplete='off' method='post' style={{height:"320px",marginTop:"70px",width:"340px"}}>
   <h2>Login Page</h2>
   <div className='input'>
    <input type='email' placeholder='Enter Email' id="email" value={user.email} name="email" onChange={handleChange}/><br/>
    {err&&!user.email&&<span>Email field is required</span>}
    </div>
    <div className='input'>
    <input type="text" placeholder='Enter Password' id="password" name="password"  value={user.password} onChange={handleChange}/><br/>
    {err&&!user.password&&<span>Password field is required</span>}
    </div>
    <button onClick={login}>Login</button>
    </form>
</>
  )
}

export default Login
