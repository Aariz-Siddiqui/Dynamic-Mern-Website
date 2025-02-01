import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone:"",
    password:""
  });
const navigate = useNavigate();
const {setTokenInLs} = useAuth();
  // Handle form input changes
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,  // Spread the existing user state
      [name]: value  // Dynamically update the name or email
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try{
      e.preventDefault(); // Prevent page refresh
      console.log(`Name: ${user.name}, Email: ${user.email} , Phone:${user.phone}, Password:${user.password}`);
      const response = await fetch("http://localhost:8000/api/auth/register",{  //sending the data
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
      }
      )
      console.log(response);
      if(response.ok){
        const res_data = await response.json(); //receiving response
        toast.success(res_data.message);
        console.log(res_data.token);
        setTokenInLs(res_data.token);
        setUser({name: "",email: "",phone:"",password:""});
        navigate("/");
      }
      if(!response.ok){
        const res_data = await response.json();
        toast.success(res_data.extraDetails ? res_data.extraDetails:res_data.message);
      }
    }catch(error){
      console.log("register",error);
    }

  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                  <label htmlFor="name">Name</label>
              <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={user.name}
              onChange={handleInput}
              />
                  </div>

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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
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
  );
};

export default Register;
