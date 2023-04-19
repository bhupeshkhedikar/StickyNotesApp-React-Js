import { Button } from '@mui/material';
import React, { useState } from 'react';
import FacebookLogin from "react-facebook-login";

function Fblogin() {
const [login, setLogin] = useState(false);
const [data, setData] = useState({});
const [picture, setPicture] = useState('');
    
    const responseFacebook = (response) => {
        console.log(response);
        // Login failed
        if (response.status === "unknown") {
          alert("Login failed!");
          setLogin(false);
          return false;
        }
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      };
      const logout = () => {
        setLogin(false);
        setData({});
        setPicture("");
      };
    
    
    return (
        <>

      {!login && (
        <FacebookLogin
          appId="930896601213263"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}

      {login && (
       
      <div>
            <img  src={picture} alt="Profile" />
            <h5 className="card-title">{data.name}</h5>
            <p >Email ID: {data.email}</p>
            <a href="#"  onClick={logout}>
              Logout
            </a>
            </div>
      )}
 </>
        
    );
}

export default Fblogin;