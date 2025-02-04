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
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={user.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={user.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

      </section>
    </>
  )
}

export default Contact
