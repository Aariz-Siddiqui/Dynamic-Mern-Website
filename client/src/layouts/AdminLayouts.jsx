import React from 'react'
import {Outlet,NavLink,Navigate} from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { MdDesignServices } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import { useAuth } from '../store/auth';

const AdminLayouts = () => {
  const {userData} = useAuth();
  const {isLoading} = useAuth();
  if(isLoading){
    return <h1>Loading...</h1>
  }
  console.log(userData.isAdmin);
  if(!userData.isAdmin){
    return <Navigate to="/"/>
  }

  return (
    <>
    <header>
      <div className="container">
          admin home page
      </div>
    <nav>
      <ul>
        <li><NavLink to = "/admin"><IoIosHome/>Home</NavLink></li>
        <li><NavLink to = "/admin/users"><FaUsers/>Users</NavLink></li>
        <li><NavLink to = "/admin/contacts"><MdConnectWithoutContact/>Contacts</NavLink></li>
        <li><NavLink to = "/admin/services"><MdDesignServices/>Services</NavLink></li>
      </ul>
    </nav>
    </header>
    <Outlet/>
    </>
  )
}

export default AdminLayouts
