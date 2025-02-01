import {React , useState} from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const {setTokenInLs} = useAuth();
  const [user,setUser] = useState({
    email:'',
    password:''
  })
const navigate = useNavigate();
const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name] : value
    }
    )
}


const handleSubmit = async (e)=>{
  try{
    e.preventDefault();
    console.log(user);
    const response = await fetch('http://localhost:8000/api/auth/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user)
    })
    if(response.ok){
      const res_data = await response.json();
      toast.success(res_data.message);
      setTokenInLs(res_data.token);
      navigate("/")
    }
    if(!response.ok){
      const res_data = await response.json();
      toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
      console.log(res_data);
    }
  }catch(error){
    console.log("contact" + error)
  }
}

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor='email'>email</label>
      <input type='email' name='email' id='email' placeholder='enter your email' 
      value={user.email} onChange={handleInput}/>
      <br/>
      <label htmlFor='password'>password</label>
      <input type='password' name='password' id="password" placeholder='enter your password'
      value={user.password} onChange={handleInput}/>
      <br/>
      <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default Login
