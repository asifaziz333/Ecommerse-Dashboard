import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const [product,setProduct]=useState({
    name:"",
    price:"",
    category:"",
    company:""
  })
  const navigate=useNavigate();
  const [err,setError]=useState(false);
const params=useParams();
console.log(`${params.sid}`);
useEffect(()=>{
  if(params.sid!=':sid')
  getData();
},[])
const getData=async()=>{
   const response=await fetch(`http://localhost:4000/userproduct/${params.sid}`,{
    headers:{
      "authorization":`bearer ${JSON.parse(localStorage.getItem("token"))}`
    }
   })
   const data=await response.json();
   if(data){
console.log(data);
setProduct(
  {
    name:data[0].name,
    price:data[0].price,
    category:data[0].category,
    company:data[0].company
  }
);
   }
}
  const handle=(e)=>{
    const {name,value}=e.target;
    setProduct({
      ...product,[name]:value
    })
  }
  const update_product=async(e)=>{
    e.preventDefault();
    const {name,price,company,category}=product;
    if(!name || !price || !company || !category){
      setError(true);
      return;
    }

    // const sid=JSON.parse(localStorage.getItem("user"))._id;
    let response=await fetch(`http://localhost:4000/updateproduct/${params.sid}`,
      {
        method:'put',
        body:JSON.stringify({name,price,company,category}),
        headers:{
          "Content-Type":"application/json",
            "authorization":`bearer ${JSON.parse(localStorage.getItem("token"))}`
          
        }
       }
    )
    response=await response.json();
    console.log(response);
    navigate('/')
  }
  return (
    <div>
      <form method='post' autoComplete='off'>
        <h2>Update Product</h2>
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
        <button onClick={update_product}>Update</button>
      </form>
    </div>
  )
}

export default Update
