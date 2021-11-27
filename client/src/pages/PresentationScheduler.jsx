import React from "react";
import Navbar from "../components/Navbar/TeacherNavbar";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useParams ,useHistory} from "react-router-dom";
import { GET, POST } from "../config/api";
import utc from "moment";

import { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";

const PresentationScheduler = () => {
  
  const [schedule, setSchedule] = useState({});
  const user = useSelector(selectUser);
  const params = useParams();
  const history = useHistory();
  const [duration, setDuration] = useState({
    minutes: "0",
  });
  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setDuration({ ...duration, [field]: value });
  };
  const [disabled, setDisabled] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [numSlots, setNumSlots] = useState([]);

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    if (numSlots.length === parseInt(field)) {
      setNumSlots((numSlots) => [...numSlots, value]);
    } else {
      numSlots[parseInt(field)] = value;
    }
    if (disabled === true && clicked === false) {
      setDisabled(false);
    }
    
  };

  const [selectedDate, setSelectedDate] = useState([]);

  const handleSubmit = () => {
    selectedDate.map(
      (date, i) => (selectedDate[i] = utc(date.toISOString()).format())
    );
    
    const data = {
      selectedDate: selectedDate,
      numSlots: numSlots,
      duration: duration,
      eventId: params.id,
    };
    const requestSchedule = async () => {
      const res = await POST("/make-schedule", data);
      setSchedule(res.data);
    };
    requestSchedule()
      .then((response) => {
        
      })
      .catch((err) => {
        console.log(err);
        alert("Schedule Generation not successful");
      });

      setDisabled(true);
      setClicked(true);

     
  };

  const [display, setDisplay] = useState(0);

  const [numTeams, setNumTeams] = useState(0);

  useEffect(() => {
    GET("/teams/event/" + params.id)
      .then((res) => {
        setNumTeams(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   const scheduleData = Object.keys(schedule).map((d, key) => {
     return (
       <tr>
         <td>{schedule[d].startDate}</td>
         <td>{schedule[d].startTime}</td>
         <td>{schedule[d].duration}</td>
         <td>{schedule[d].teamName}</td>
         <td>
           {schedule[d].names.map((member, i) => (
             <div>
               {member}
               <br />
             </div>
           ))}
         </td>
         <td>
           {schedule[d].emails.map((email, i) => (
             <div>
               {email}
               <br />
             </div>
           ))}
         </td>
         
       </tr>
     );
   });
  const handleRelease = () => {
     const data = {
       "eventId" : params.id,
       "eventName" : params.eventName,
       "createdBy" : user.id,
       "schedule" : schedule
      
     }
      const getEmails = async () => {
        const response = await GET("/users/students");
        //setEmails(response.data);
        const emailData = {
          eventName: params.eventName,
          contacts: response.data,
        };
        const sendSchedule = async () => {
          const response = await POST("/schedule", data);
        };
        sendSchedule()
          .then((response) => {
            console.log("post successful");
          })
          .catch((err) => {
            console.log(err);
            alert("Schedule release not successful");
          });

        const sendEmail = async () => {
          const response = await POST("/email/schedulegenerated", emailData);
        };
        sendEmail()
          .then((response) => {
            alert("Schedule release successful");
            history.push("/teacher-dashboard");
          })
          .catch((err) => {
            console.log(err);
            alert("Email reminder not successful");
          });
      };
      getEmails()
        .then((response) => {
          
        })
        .catch((err) => {
          console.log(err);
          
        });
    
     
     
     

  }
  return (
    <div>
      <Navbar usertype={user.userType} />
      <h4 style={{ marginBottom: "2%", marginTop: "2%" }}>
        Automated Scheduler for Conducting Presentations
      </h4>
      <Form style={{ width: "80%", display: "inline-block" }}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="5">
            Presentation Duration
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              placeholder="Enter duration"
              name="minutes"
              value={duration.minutes}
              onChange={handleInput}
            />
            <Form.Text className="text-muted">
              This field for entering the duration of each presentation in
              minutes
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="5">
            Number of Teams Registered
          </Form.Label>
          <Col sm="2">
            <Form.Control plaintext readOnly value={numTeams} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="5">
            Total Time Needed to be Scheduled
          </Form.Label>
          <Col sm="2">
            <Form.Control
              plaintext
              readOnly
              value={
                parseInt(numTeams) * parseInt(duration.minutes) + " minutes"
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="5">
            Scheduled Minutes
          </Form.Label>
          <Col sm="2">
            <Form.Control
              plaintext
              readOnly
              value={
                numSlots.reduce((a, b) => parseInt(a) + parseInt(b), 0) *
                parseInt(duration.minutes)
              }
            />
          </Col>
        </Form.Group>
      </Form>
      <div>
        <br />
        <h4 style={{ display: "inline-block" }}>Schedule</h4>
        <Button
          variant="primary"
          style={{ display: "inline-block", marginLeft: "40%" }}
          onClick={() => setDisplay(display + 1)}
        >
          Add Slot
        </Button>
        <Button
          variant="warning"
          style={{ display: "inline-block", marginLeft: "1%" }}
          onClick={() => {
            if (display > 0) {
              if(selectedDate.length === display)
              {
                selectedDate.pop();
                numSlots.pop();

              }
              setDisplay(display - 1);
              
            }
          }}
        >
          Remove Slot
        </Button>
        <br />
        <br />
      </div>

      {[...Array(display)].map((elementInArray, i) => (
        <div className="" key={i}>
          <div style={{ display: "inline-block" }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Form.Label column sm="3" style={{ marginRight: "13px" }}>
                Start Date&Time
              </Form.Label>
              <KeyboardDateTimePicker
                variant="dialog"
                format="dd/MM/yyyy HH:mm:ss"
                margin="normal"
                label="Date and Time Picker"
                value={selectedDate[i]}
                onChange={(date) => {
                  if (selectedDate.length === i) {
                    setSelectedDate((selectedDate) => [...selectedDate, date]);
                  } else {
                    selectedDate[i] = date;
                  }
                }}
                // onChange = {setSelectedDate(...selectedDate,selectedDate[i])}
                KeyboardButtonProps={{
                  "aria-label": "change-date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div style={{ display: "inline-block" }}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
              style={{ marginTop: "1%" }}
            >
              <Form.Label column sm="5" style={{ marginRight: "13px" }}>
                Number of slots
              </Form.Label>
              <Col sm="5" style={{ marginLeft: "-10%" }}>
                <Form.Control
                  type="text"
                  placeholder="Enter Slots"
                  name={i}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  This field denotes the number of presentations.
                </Form.Text>
              </Col>
            </Form.Group>
          </div>
        </div>
      ))}
      
      <Button
        variant="success"
        onClick={handleSubmit}
        style={{ marginBottom: "2%" }}
        disabled={disabled}
      >
        Generate Schedule
      </Button>
      <br />
      {Object.keys(schedule).length !== 0 ? (
        <div style={{ marginLeft: "3%", marginRight: "3%" }}>
          <Table
            striped
            bordered
            hover
            responsive
            style={{ backgroundColor: "#E6E6FA" }}
          >
            <thead>
              <tr>
                <th>Scheduled Date</th>
                <th>Presentation Time</th>
                <th> Duration of Presentation</th>
                <th>Team Name</th>
                <th>Names of Members</th>
                <th>Emails</th>
              </tr>
            </thead>
            <tbody>{scheduleData}</tbody>
          </Table>
          <Button onClick={handleRelease}>Release Schedule</Button>
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default PresentationScheduler;
