import React, { useEffect, useState } from 'react'
import './css/product.css'
import { Link } from 'react-router-dom'
const Product = () => {
const [products,setProducts]=useState([])
  useEffect(()=>{
    getData();
  },[])
  const auth=localStorage.getItem("user");
    const userId=JSON.parse(auth)._id
  const getData=async()=>{
    const response=await fetch(`http://localhost:4000/product/${userId}`,{
      headers:{
        "authorization":`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    const data=await response.json();
    //console.log(data);
    setProducts(data)
  }

  const searchHandler=async(e)=>{
    const key=e.target.value;
    if(key){
    const response=await fetch(`http://localhost:4000/search/${key}/${userId}`,{
      headers:{
        "authorization":`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    const data=await response.json();
    setProducts(data);
    }else{
      getData();
    }
  }

const del=async(sid)=>{
  const response=await fetch(`http://localhost:4000/product/${sid}`,
    {method:"DELETE",
      headers:{
        "authorization":`bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    })
    const data=await response.json();
    getData();
    console.log(data);
    }

const upd={
  textDecoration:"none",
  color:"blue"
}
  return (
  
    <div style={{textAlign:"center"}} >
     
      <h2 >Product List</h2>
      <input type='text' className='search' placeholder='search ' onChange={searchHandler}/>
      <table border={1} cellSpacing={0}>
        <tr>        
        <th>S.N0.</th>
        <th>Name</th>
        <th>Company</th>
        <th>Price</th>
        <th>Category</th>
        <th>Operation</th>
        </tr>
        {
          products.map((product,index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{product.name}</td>
              <td>{product.company}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td><a className='del' onClick={()=>del(product._id)}>Delete</a>/<Link style={upd} to={`/updateproduct/${product._id}`}>Update</Link></td>
            </tr>
        )
        )}
     
      </table>
    </div>
  )
}

export default Product
