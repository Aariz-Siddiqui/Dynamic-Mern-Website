import {React, useState} from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
const Contact = () => {
const [user,setUser] = useState({
  username:"",
  email:"",
  message:""
});

const [loggedIn , setLoggedIn] = useState(true);

const {userData} = useAuth();

if(userData && loggedIn){
  setUser({
    username:userData.name,
    email:userData.email,
    message:""
  })
  setLoggedIn(false);
}

const handleInput =(e)=>{
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
    [name]:value
  })
}

const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/contact", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })

    if(response.ok){
      toast.success("message sent successfuly");
      setUser({
        ...user,
        message:"",
    })
    }
}

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>Name</label>
      <input type='text' name='username' id='name' placeholder="Enter your name please"
      autoComplete="off"
      value={user.username} onChange={handleInput}/>
      <br/>
      <label htmlFor='email'>Email</label>
      <input type="email" name='email' id='email' placeholder='enter your email please'
      autoComplete="off"
      value={user.email} onChange={handleInput}/>
      <br/>
      <label htmlFor='message'>Message</label>
      <input type='text' name='message' id="message" placeholder='enter your message please'
      autoComplete="off"
      value={user.message} onChange={handleInput}/>
      <button>Submit</button>
    <br/>
    </form>
    </>
  )
}

export default Contact
