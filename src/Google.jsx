import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; 
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { GoogleLogout } from "react-google-login";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import {
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Modal,
  Card,
  CardContent,
  Avatar,
  CardHeader,
} from "@mui/material";

export default function Calendar() {
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const [events, setEvents] = useState([]);

  const logout = () => {
    alert("succesfully logout");
    setData({});
    setLogin(false);
    
  };
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
      setData(res.profileObj);
      setLogin(true);

    alert(`Logged in successfully welcome ${res.profileObj.name} . \n`);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
      alert(`Failed to login. `);
      setLogin(false);
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "951264751818-vsajauvjlq2maee9rsq0aann18c3oieb.apps.googleusercontent.com",
      });
    });
  }, []);

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <div>
          <div>{eventInfo.event.title}</div>
          <div>{eventInfo.timeText} EST</div>
        </div>
      </>
    );
  };
 
  const setting = {
    plugins: [
      dayGridPlugin,
      listPlugin,
      interactionPlugin,
      googleCalendarPlugin
    ],
    //Main Key
    googleCalendarApiKey: "AIzaSyDRFZeN0A7Pad_D1GcKlxNZSZnYBsfZgyg",

    eventSources: [
      {
        googleCalendarId:"bhupeshkhedikar1999@gmail.com"
      }
    ],
   
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: ""

    },
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: "short"
    },
    eventContent: renderEventContent
  };
  return (
    <>
        <center>
        {" "}
        <Box sx={{ height: "120px", width: "200px", backgroundColor: "black",color:"white" }}>
          <CardHeader
            avatar={<Avatar alt="Remy Sharp" src={data.imageUrl} />}
            title={data.name}
                  />
          {login ?   
          <GoogleLogout
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          ></GoogleLogout> : 
                  

<GoogleLogin
          clientId="951264751818-vsajauvjlq2maee9rsq0aann18c3oieb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
          disabled={false}
        />
    }

        </Box>
      </center>
      <FullCalendar {...setting} />
    
    </>
  );
}