
import React, {useEffect, useState } from 'react';
import './css/Sign.css'
import {useNavigate} from 'react-router-dom';
const Register = () => {
const[img,setImg]=useState("");
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    repassword:""
  })
  
  const [err,setError]=useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate=useNavigate();
  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth){
      navigate('/');
    }
  },[])
 

 let msg=document.getElementById("msg")
const register=async(e)=>{
    e.preventDefault();
    const {name,email,password,repassword}=user;
    if(!name|| !email || !password || !repassword){
      setError(true);
      return;
    }
    if(name&&email&&password&&(password==repassword)){
      //console.log(user);
    let response=await fetch("http://localhost:4000/register",
    {
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        "Content-Type":"application/json"
      }
     }
    );
    
     //console.log(response);
     response=await response.json();
     console.log(response.exists);
    //  localStorage.setItem("user",JSON.stringify(response));
    console.log(response);
    if (response.exists) {
      console.log("yes");
      setErrorMessage('This email is already in use.');
    } else {
      console.log("no");
      setErrorMessage('');
     navigate('/login')
    }
    }
    else{
      msg.style.display="block";
    }
 
}
  const handleChange=(e)=>{
   // console.log(e.target.value);
    const {name,value}=e.target;
   // console.log(name,value);
    setUser({
      ...user,[name]:value
    })
  }

  return (
   <>
   
   <form autoComplete='off' method='post'>
   <h2>Registration Page</h2>
    <div className='input'>
    <input type='text' placeholder='Enter name' id="name" name="name" value={user.name} onChange={handleChange}/><br/>
    {err&&!user.name&&<span>Name field is required</span>}
    </div>
    <div className='input'>
    <input type='email' placeholder='Enter Email' id="email" value={user.email} name="email" onChange={handleChange}/><br/>
    {err&&!user.email&&<span>Email field is required</span>}
    </div>
    <div className='input'>
    <input type="text" placeholder='Enter Password' id="password" name="password"  value={user.password} onChange={handleChange}/><br/>
    {err&&!user.password&&<span>Password field is required</span>}
    </div>
    <div className='input'>
   <input type="text" placeholder="Re Enter Pasword" id="repassword" name="repassword"  value={user.repassword} onChange={handleChange}/><br/>
   {err&&!user.repassword&&<span>repassword field is required</span>}
   </div>
   <div className='input'>
    <input type="file" onChange={(e)=>setImg(e.target.files[0])} />
   </div>
    <span id='msg' name='msg' style={{display:"none"}}>Email Does not match</span>
    
    <button onClick={register}>Register</button>
    {errorMessage && <p style={{ color: 'red',fontSize:20 }}>{errorMessage}</p>}
   </form>
   
   </>
  )
}

export default Register
