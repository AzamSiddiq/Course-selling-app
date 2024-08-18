import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AppBar() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState(null);

useEffect(()=>{
    function callBack2(data){
      if(data.username){
        setUserEmail(data.username)
      }
    }
    function callBack1(res){
      res.json().then(callBack2)
    }
    fetch("http://localhost:3000/admin/me",{
      method:"GET",
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(callBack1);
  }, []);
  if(userEmail){
      return  <div style={{display:"flex",
        justifyContent:"space-between",
        padding:4  
  }}> 
  <div>
  <Typography variant='h6'>Coursera</Typography>
  </div>

  <div style={{display:'flex'}}>
<div>
  {userEmail}
</div>
  <div style={{marginRight:10}}><Button
  variant='contained'
  onClick={()=>{
    localStorage.setItem("token", null);
    window.location= "/";  

    // history.push("/signup")
    // window.location="/signup"
  }}>Logout</Button>
  </div>
  </div>
  </div>
    }

  // const history = {useHistory}
  return (
    <div style={{display:"flex",
                justifyContent:"space-between",
                padding:4  
    }}> 
   <div>
    <Typography variant='h6'>Coursera</Typography>
    </div>

    <div style={{display:'flex'}}>

        <div style={{marginRight:10}}><Button
         variant='contained'
          onClick={()=>{
            navigate("/signup")
            // history.push("/signup")
            // window.location="/signup"
          }}>
          Sign up</Button>
          </div>

        <div>
          <Button
          variant='contained'
          onClick={()=>{
            navigate("/login")
            // history.push("/login")
            // window.location="/login"
          }}>
            Sign in</Button></div>
    
    </div>
    </div>
  );
}

export default AppBar;
