import React from 'react'
import {Outlet,NavLink,Navigate} from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
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
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaRegListAlt /> Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default AdminLayouts
