import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

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

function Google() {
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const [events, setEvents] = useState([]);
  let [state, setState] = useState(JSON.parse(localStorage.getItem("token")));

  const calendarID = "bhupeshkhedikar1999@gmail.com";
    const apiKey = "AIzaSyDRFZeN0A7Pad_D1GcKlxNZSZnYBsfZgyg";
  

  const getEvents = (calendarID, apiKey) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            console.log(events);
            setEvents(events);
            localStorage.setItem("token", JSON.stringify(events.accessToken));
            console.log(events);
          },
          function (err) {
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };

  useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    setEvents(events);
  }, []);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({
        clientId:
          "951264751818-vsajauvjlq2maee9rsq0aann18c3oieb.apps.googleusercontent.com",
      });
    });
  }, []);

  // https://www.googleapis.com/calendar/v3/calendars/bhupesh.khedikar@extwebtech.in/events

  const logout = () => {
    alert("succesfully logout");
    setData({});
    setEvents([]);
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
  const eventsData = events?.map((event) => {
    const title = event.summary;
    const date = event.start.dateTime;
    const start = date.slice(0, 10);
    return { title, start };
  });
  return (
    <>
      <center>
        {" "}
        <Box
          sx={{
            height: "120px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <CardHeader
            avatar={<Avatar alt="Remy Sharp" src={data.imageUrl} />}
            title={data.name}
          />
          {login ? (
            <GoogleLogout
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
            ></GoogleLogout>
          ) : (
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
          )}
        </Box>
      </center>
      <center>
        <h1>React App with Google Calendar API!</h1>
      </center>
      <Grid
        container
        spacing={1}
        justify="center"
        style={{ marginTop: "80px" }}
      >
        {events?.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ width: "275px", height: "140px", ml: "50px" }}
              key={event.id}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {" "}
                  Event:
                  {event.summary}
                </Typography>
                <Typography variant="body2" component="div">
                  {" "}
                  Status: {event.status}
                </Typography>
                <Typography variant="body2" component="div">
                  {" "}
                  Organizer: {event.organizer.email}
                </Typography>
                <Typography variant="body2" component="div">
                  {" "}
                  Organizer: {event.start.dateTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
        }}
        events={[...eventsData]}
      />
      <button onClick={() => console.log(eventsData)}>getdata</button>
    </>
  );
}

export default Google;
