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
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt=" let's fill the login form "
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login
