 //import axios from "axios";
 //import { postDatas } from '../../../api/httpsrequests';
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { getAlldatas,deleteDatasByID,getAlldatasbyID } from '../api/httpsrequest';
 import { Table } from "antd";
 //import {useNavigate} from "react-router-dom"
 //import { Link } from "react-router-dom";
function Mypage() {
    // const navigate = useNavigate();

  let [suppliers, setSuppliers] = useState([]);
  const columns = [
     {
       title: "id",
       dataIndex: "id",
     },
     {
       title: "companyName",
       dataIndex: "companyName",
     
     },
     {
       title: "contactName",
       dataIndex:"contactName"
     },
     {
       title: "contactTitle",
       dataIndex: "contactTitle",
     }, 
     {
       title: "Delete",
       render: (value)=><Button variant='contained' style={{backgroundColor:"red"}} onClick={()=>{
         console.log(value)
           deleteDatasByID(value.id)
           setSuppliers(suppliers.filter((itms)=>itms.id != value.id))
       }}>Delete</Button>
     }, 

     // {
     //   title: "Edit",
     //   render: (value)=><Button variant='contained' style={{backgroundColor:"blue"}}
     //    onClick={()=>()=>navigate("/")}>Edit</Button>
     // }, 
   ];
   useEffect(() => { getAlldatas().then((data) => {
     setSuppliers(data)
           })}, []);
     
  return (
     
     <>
     <div className='formdiv'>
     <Box className='box'
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <form >
     <TextField  style={{marginTop:10}} id="outlined-basic" label="CompanyName" variant="outlined" />
      <TextField style={{marginTop:10}} id="outlined-basic" label="ContactName" variant="outlined" />
      <TextField style={{marginTop:10}} id="outlined-basic" label="ContactTitle" variant="outlined" />
      <Button    style={{marginTop:10}}  variant="contained">Contained</Button>
    </form> 
   </Box>
     </div>
     <div style={{margin:"0 auto",width:"90%"}}>
< Table
      columns={columns}
      dataSource={suppliers}
      rowKey={(item)=>item.id}
      scroll={{
        x: 5,
      }}
    />
</div>
     </>
  )
}

export default Mypage
