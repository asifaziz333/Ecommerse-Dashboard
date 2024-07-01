import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './css/Nav.css';
const Nav = () => {
  const auth=localStorage.getItem("user");
 
 
  const navigate=useNavigate();
const logout=()=>{
  localStorage.clear();
  navigate('/signup');
}
  return (
    <div className='nav'>
      {
        auth?
        <>
      <ul>
      <li><NavLink to='/' className="nlink">Product</NavLink></li>
      <li><NavLink to='/addproduct' className="nlink">Add product</NavLink></li>
      <li><NavLink to='/updateproduct/:sid' className="nlink">Update Product</NavLink></li>
      <li><NavLink to='/profile' className="nlink">Profile({JSON.parse(auth).name})</NavLink></li>
      </ul>
      <ul >
      <li><NavLink to='/logout' className="nlink" onClick={logout}>logout</NavLink></li>
      </ul>
      </>
      :
      <ul>
   <li>
    {
      <>
      <NavLink to='/signup' className="nlink" style={{marginRight:"20px"}}>Sign Up </NavLink>
      <NavLink to='/login' className="nlink">Login</NavLink>
      </>
    }
   </li>
   </ul>
}
    </div>
  )
}

export default Nav
