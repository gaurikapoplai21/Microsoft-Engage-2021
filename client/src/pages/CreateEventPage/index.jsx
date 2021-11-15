import React from "react";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Button from "@mui/material/Button";
import "react-datepicker/dist/react-datepicker.css";
import { GET, POST } from "../../config/api";
import { apiEndpoints } from "../../constants/apiEndpoints";

const Index = () => {
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
    createdBy: "gaurika",
  });
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = () => {
    let data2;
    console.log(selectedFile)
    if(selectedFile !== null)
    {
        const data3 = {
          uploadedFiles: selectedFile.name,
        };
        const data = {
          registrationDeadline: registrationDeadline,
          submissionDeadline: submissionDeadline,
        };
         data2 = {
          ...event,
          ...data,
          ...data3,
        };

    }
    else
    {
         const data = {
           registrationDeadline: registrationDeadline,
           submissionDeadline: submissionDeadline
         };
          data2 = {
           ...event,
           ...data,
         };

    }
    
    
    if(data2.registrationDeadline===''||data2.submissionDeadline===''||data2.eventName===''||
    data2.eventDescription===''||data2.minTeamSize===''||data2.maxTeamSize===''||data2.maxMarks=='')
    {
        alert("All fields except Reference links and files are mandatory")
    }
    else
    {   if(data2.referenceLinks===''||data2.uploadedFiles==='')
        {
            data2.referenceLinks= "#deadbeef"
            data2.uploadedFiles= "#deadbeef"

        }
        POST(apiEndpoints.EVENTS, data2)
          .then((response) => {
            alert("event successfully created");
          })
          .catch((err) => {
            alert("event creation unsuccessful");
          });
        setEvent({
          eventName: "",
          eventDescription: "",
          referenceLinks: "",
          minTeamSize: "",
          maxTeamSize: "",
          maxMarks: "",
          createdBy: "gaurika",
        });
        setRegistrationDeadline('');
        setSubmissionDeadline('');
        setSelectedFile(null);

    }
    //check for compulsory fields
    
  };
  return (
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
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Reference Files</Form.Label>
          <Form.Control type="file" onChange={handleChange} />
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
              minDate={new Date()}
            />
          </Col>
        </Row>
        <br />
        <Button onClick={handleSubmit} variant="contained">
          Submit{" "}
        </Button>
      </Form>
    </div>
  );
};

export default Index;
