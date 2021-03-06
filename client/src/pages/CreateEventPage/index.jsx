import React from "react";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Button from "@mui/material/Button";
import "react-datepicker/dist/react-datepicker.css";
import { GET, POST } from "../../config/api";
import { apiEndpoints } from "../../constants/apiEndpoints";
import Navbar from "../../components/Navbar/TeacherNavbar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const Index = () => {
  let history = useHistory();
  const user = useSelector(selectUser);

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setEvent({ ...event, [field]: value });
  };

  const [event, setEvent] = useState({
    eventName: "",
    eventDescription: "",
    referenceLinks: "",
    minTeamSize: "",
    maxTeamSize: "",
    maxMarks: "",
    createdBy: user.name,
    createdId: user.id,
  });
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  

  const handleSubmit = () => {
    let data2;
    
      const data = {
        registrationDeadline: registrationDeadline,
        submissionDeadline: submissionDeadline,
      };
      
      data2 = {
        ...event,
        ...data
       
      };
    

    if (
      data2.registrationDeadline === "" ||
      data2.submissionDeadline === "" ||
      data2.eventName === "" ||
      data2.eventDescription === "" ||
      data2.minTeamSize === "" ||
      data2.maxTeamSize === "" ||
      data2.maxMarks == ""
    ) {
      alert("All fields except Reference links are mandatory");
    } else {
     
     
      const createTeam = async () => {
        const response = await POST(apiEndpoints.EVENTS, data2);
      };
      createTeam()
        .then((response) => {
          console.log(response);
          alert("Event created successfully");
          history.push("/teacher-dashboard");
        })
        .catch((err) => {
          console.log(err);
          alert("event creation unsuccessful");
        });

      const emailData = {
        contacts: [user.email],
        eventName: data2.eventName,
      };
      const sendEmail = async () => {
        const response = await POST("/email/eventcreated/teacher", emailData);
      };
      sendEmail()
        .then((response) => {
          //  alert("Event created successfully")
          //  history.push("/teacher-dashboard");
        })
        .catch((err) => {
          alert("Email reminder to teacher not successful")
        });

      const getEmails = async () => {
        const response = await GET("/users/students");
        const emailData = {
          eventName: data2.eventName,
          contacts: response.data,
          teacher: user.name
        };
      
        const sendEmail = async () => {
          const response = await POST("/email/eventcreated/students", emailData);
        };
        sendEmail()
          .then((response) => {
            
          })
          .catch((err) => {
            console.log(err);
            alert("Email reminder to students not successful");
          });
      };
      getEmails()
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      setEvent({
        eventName: "",
        eventDescription: "",
        referenceLinks: "",
        minTeamSize: "",
        maxTeamSize: "",
        maxMarks: "",
        createdBy: user.name,
      });
      setRegistrationDeadline("");
      setSubmissionDeadline("");
    }
    //check for compulsory fields
  };
  return (
    <div>
      <Navbar userType="teacher" />
      <br />
      <h2> Create an Event </h2>
      <br />
      <div style={{ display: "block" }}>
        <Form style={{ width: "50%", display: "inline-block" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={event.eventName}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="eventDescription"
              value={event.eventDescription}
              onChange={handleInput}
            />
          </Form.Group>
         
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Reference Links</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="referenceLinks"
              value={event.referenceLinks}
              onChange={handleInput}
            />
          </Form.Group>
          <br />
          <Row>
            <Col>
              <Form.Label>Minimim Team Size</Form.Label>
              <Form.Control
                placeholder="Minimum Team Size"
                name="minTeamSize"
                value={event.minTeamSize}
                onChange={handleInput}
              />
            </Col>
            <Col>
              <Form.Label>Maximum Team Size</Form.Label>
              <Form.Control
                placeholder="Maximum Team Size"
                name="maxTeamSize"
                value={event.maxTeamSize}
                onChange={handleInput}
              />
            </Col>
            <Col>
              <Form.Label>Maximum Marks</Form.Label>
              <Form.Control
                placeholder="Maximum Marks"
                name="maxMarks"
                value={event.maxMarks}
                onChange={handleInput}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Registration Deadline</Form.Label>
              <DatePicker
                name="registrationDeadline"
                selected={registrationDeadline}
                onChange={(date) => setRegistrationDeadline(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </Col>
            <Col>
              <Form.Label>Submission Deadline</Form.Label>
              <DatePicker
                selected={submissionDeadline}
                onChange={(date) => setSubmissionDeadline(date)}
                dateFormat="dd/MM/yyyy"
                minDate={registrationDeadline}
              />
            </Col>
          </Row>
          <br />
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ marginBottom: "20px" }}
          >
            Submit{" "}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Index;
