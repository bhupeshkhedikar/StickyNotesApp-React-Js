import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";

export default function Display() {
  let [stateData, setStateData] = React.useState({
    localStorage: JSON.parse(localStorage.getItem("googleArr")),
    calendarArr: [],
  });

  let [calendar, setCalendar] = React.useState();
  // console.log("cal", calendar);
  let [showCalendar, setShowCalendar] = React.useState(false);

  let token =
    "";
  let key = "AIzaSyDRFZeN0A7Pad_D1GcKlxNZSZnYBsfZgyg";

  let getCalenderData = () => {
    let url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key}`;
    setShowCalendar((prev) => !prev);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
        Accept: `application/json`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStateData((prev) => {
          return {
            ...prev,
            calendarArr: data,
          };
        });
      });
  };

  let render = stateData?.calendarArr?.items?.map((item) => {
    let title = item?.summary;
    let str = item?.start?.dateTime;
    let newStr = [];
    if (str) {
      for (let i = 0; i < 10; i++) {
        newStr.push(str[i]);
      }
    }
    let date = newStr.join("");
    return { title: title, date: date };
  });

  React.useEffect(() => {
    setCalendar(render);
  }, [stateData.calendarArr]);

  return (
    <>
      <div>
        <div>
          <div>
            <Button
              variant="contained"
              onClick={getCalenderData}
              className="btn-header"
            >
              {showCalendar ? "Close Calendar" : "Get Calender"}
            </Button>
          </div>
        </div>
        <Container>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={calendar ? [...calendar] : []}
          />
        </Container>
      </div>
    </>
  );
}
