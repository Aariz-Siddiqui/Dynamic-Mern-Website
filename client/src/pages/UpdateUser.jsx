import React, { useEffect } from 'react'
import { data, useParams } from 'react-router-dom'
import { useAuth } from '../store/auth';
import { useState } from 'react';
const UpdateUser = () => {
  const [data,setData] = useState({
    name:"",
    email:"",
    phone:""
  })
 
  const params = useParams(); //to get user id from params
  const {authBearerToken} = useAuth();
  const singleUserData = async ()=>{
      try{
        const response = await fetch(`http://localhost:8000/api/admin/users/${params.id}`,{
          method:'GET',
          headers:{
            Authorization:authBearerToken
          }
        })
        console.log(params)
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        setData(data);
      }catch(error){
        console.log(`Error from Update user ${error}`);
      }
  }
  useEffect(()=>{singleUserData()},[])
  const handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]:value
    }
    )
  }

  const updateUserData = async(e) =>{
    try{
      e.preventDefault();
      const response = await fetch(`http://localhost:8000/api/admin/users/update/${params.id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Authorization:authBearerToken
        },
        body:JSON.stringify(data)
      })
      if(response.ok){
        console.log(data.name);
        alert("Data updated successfully")
      }
    }catch(error){
      console.log("error from updateUserData"+ error)
    }
  }
  return (
    <>
    <form>
      <label htmlFor='name'>Name</label>
      <input type='text' name='name' id='name' 
      autoComplete="off"
      value={data.name} onChange={handleInput}/>
      <br/>
      <label htmlFor='email'>Email</label>
      <input type="email" name='email' id='email' 
      autoComplete="off"
      value={data.email} onChange={handleInput}/>
      <br/>
      <label htmlFor='phone'>phone</label>
      <input type='text' name='phone' id="phone" 
      autoComplete="off"
      value={data.phone} onChange={handleInput}/>
      <button onClick={updateUserData}>Update</button>
    <br/>
    </form>
    </>
  )
}

export default UpdateUser
