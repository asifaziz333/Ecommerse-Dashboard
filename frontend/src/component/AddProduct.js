import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const [product,setProduct]=useState({
    name:"",
    price:"",
    category:"",
    company:""
  })
  const [err,setError]=useState(false);
  const navigate=useNavigate()

  const handle=(e)=>{
    const {name,value}=e.target;
    setProduct({
      ...product,[name]:value
    })
  }
  const add_product=async(e)=>{
    e.preventDefault();
    const {name,price,company,category}=product;
    if(!name || !price || !company || !category){
      setError(true);
      return;
    }
    const sid=JSON.parse(localStorage.getItem("user"))._id;
    console.log(sid);
    const response=await fetch("http://localhost:4000/addproduct",
    {
      method:"post",
      body:JSON.stringify({name,price,company,category,sid}),
      headers:{
       "Content-Type" : "application/json",
        "authorization":`bearer ${JSON.parse(localStorage.getItem("token"))}`
      
      }
    })
    let result=await response.json();
    console.log(result);
    alert("product add")
    navigate('/')

 
  }
  return (
    <div>
      <form method='post' autoComplete='off'>
        <h2>Add Product</h2>
        <div className='input'>
        <input type='text' placeholder='Enter Product name' id="name" name="name" value={product.name} onChange={handle}/><br/>
        {err&&!product.name&&<span>Name field is required</span>}
        </div>
        <div className='input'>
        <input type="text" placeholder="Enter product price" value={product.price} id='price' name='price' onChange={handle}/><br/>
        {err&&!product.price&&<span>Price field is required</span>}
        </div>
        <div className='input'>
        <input type='text' placeholder='Enter product company' value={product.company} id='company' name='company' onChange={handle}/><br/>
        {err&&!product.company&&<span>Company field is required</span>}
        </div>
        <div className='input'>
        <input type="text" placeholder='Enter the product category' value={product.category} id='category' name='category' onChange={handle}/><br/>
        {err&&!product.category&&<span>Name field is required</span>}
        </div>
        <button onClick={add_product}>Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
