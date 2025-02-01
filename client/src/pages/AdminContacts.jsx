import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
const AdminContacts = () => {
  const [data,setData] = useState([]);
  const {authBearerToken} = useAuth(); 
  const getContactData =async(req,res)=>{
    try{
      const response = await fetch("http://localhost:8000/api/admin/contact",{
        method:"GET",
        headers:{
          Authorization:authBearerToken
        }
      })
      if(response.ok){
        const data = await response.json();
        console.log("response"+ data);
        setData(data);
      }
    }catch(error){
        console.log("error from get contact data function" + error);
    }
  }
  const deleteMessage =async (_id)=>{
    try{
      const response = await fetch(`http://localhost:8000/api/admin/message/delete/${_id}`,{
        method:"DELETE",
      })
      if(response.ok){
        console.log("deleteMessage Function is getting called")
        const rdata = await response.json();
        console.log(rdata);
        getContactData()
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{getContactData()},[])
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
          <th style={cellStyle}>Message</th>
          <th style={cellStyle}>Update</th>
          <th style={cellStyle}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((currdata, index) => (
          <tr key={index} style={cellStyle}>
            <td style={cellStyle}>{currdata.username}</td>
            <td style={cellStyle}>{currdata.email}</td>
            <td style={cellStyle}>{currdata.message}</td>
            <td style={editableCellStyle}>Edit</td>
            <td style={deleteCellStyle}><button onClick={()=>{deleteMessage(currdata._id)}}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default AdminContacts
