import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
const AdminUsers = () => {
  const [data,setData] = useState([]);
  const {authBearerToken} = useAuth();
  const fetchUsersData = async (req, res)=>{
    const response = await fetch("http://localhost:8000/api/admin/users",{
      method:"GET",
      headers:{
        Authorization: authBearerToken
      }
    })
    const ldata = await response.json();
    setData(ldata);
    console.log(data);
  
  }
  useEffect(()=>{fetchUsersData()},[]);
 
  const deleteUser =async(_id)=>{
    console.log("at delete user function" + _id)
    try{
      const response = await fetch(`http://localhost:8000/api/admin/delete/${_id}`, {
        method:"DELETE",
        headers:{
            Authorization: authBearerToken,
            "Content-Type":"application/json"
        }
      })
      if(response.ok){
        fetchUsersData()
      }
      const data = await response.json();
      console.log(data.message)
    }catch(error){
      console.log("delete User Error" + error);
    }
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  };

  const headerRowStyle = {
    backgroundColor: "#f4f4f4",
    borderBottom: "2px solid #ddd",
  };

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
  };

  const editableCellStyle = {
    ...cellStyle,
    color: "blue",
    cursor: "pointer",
  };

  const deleteCellStyle = {
    ...cellStyle,
    color: "red",
    cursor: "pointer",
  };

  return (
    <div>
      <table style={tableStyle}>
      <thead>
        <tr style={headerRowStyle}>
          <th style={cellStyle}>Name</th>
          <th style={cellStyle}>Email</th>
          <th style={cellStyle}>Phone</th>
          <th style={cellStyle}>Update</th>
          <th style={cellStyle}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((currdata, index) => (
          <tr key={index} style={cellStyle}>
            <td style={cellStyle}>{currdata.name}</td>
            <td style={cellStyle}>{currdata.email}</td>
            <td style={cellStyle}>{currdata.phone}</td>
            <td style={editableCellStyle}><Link to={`/admin/users/${currdata._id}/edit`}>Edit</Link></td>
            <td style={deleteCellStyle}><button onClick={()=>{deleteUser(currdata._id)}}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default AdminUsers
