import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
const AdminServices = () => {
  const [data,setData] = useState([]);
  const {authBearerToken} = useAuth();
  const getAllServices = async()=>{
  try{
    console.log(authBearerToken);
    const response = await fetch("http://localhost:8000/api/admin/services",{
      method:"GET",
      headers:{
        Authorization:authBearerToken
      }
    })
    const ldata = await response.json();
    setData(ldata);
    console.log(data);
  }catch(error){
      console.log(error)
  }
}
useEffect(()=>{getAllServices()}, []);

const deleteService =async (_id)=>{
  try{
    
  }catch(error){
    console.log(error);
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
<>
<table style={tableStyle}>
      <thead>
        <tr style={headerRowStyle}>
          <th style={cellStyle}>Service</th>
          <th style={cellStyle}>Description</th>
          <th style={cellStyle}>Price</th>
          <th style={cellStyle}>Provider</th>
          <th style={cellStyle}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((currdata, index) => (
          <tr key={index} style={cellStyle}>
            <td style={cellStyle}>{currdata.service}</td>
            <td style={cellStyle}>{currdata.description}</td>
            <td style={cellStyle}>{currdata.price}</td>
            <td style={cellStyle}>{currdata.provider}</td>
            <td style={deleteCellStyle}><button onClick={()=>{deleteService(currdata._id)}}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
</>
  )
}

export default AdminServices
