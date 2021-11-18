import React from "react";
import Navbar from "../../components/Navbar/TeacherNavbar";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { GET, PATCH } from "../../config/api";
import { apiEndpoints } from "../../constants/apiEndpoints";

const Index = () => {
  const params = useParams();
  let history = useHistory();

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setEvent({ ...event, [field]: value });
  };

  const handleSubmit = () => {
    let data2;
    console.log(registrationDeadline);
    if (selectedFile !== null) {
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
    } else {
      const data = {
        registrationDeadline: registrationDeadline,
        submissionDeadline: submissionDeadline,
      };
      const data3 = {
          uploadedFiles: ''
      }
      data2 = {
        ...event,
        ...data,
        ...data3
      };
    }

    if (
      data2.registrationDeadline === "" ||
      data2.submissionDeadline === "" ||
      data2.eventName === "" ||
      data2.eventDescription === "" ||
      data2.minTeamSize === "" ||
      data2.maxTeamSize === "" ||
      data2.maxMarks == ""
    ) {
      alert("All fields except Reference links and files are mandatory");
    } else {
      if (data2.uploadedFiles === "") {
        
        data2.uploadedFiles = "#deadbeef";
      }
      if(data2.referenceLinks === "")
      {
         data2.referenceLinks = "#deadbeef";
      }
      PATCH(apiEndpoints.EVENTS + "/" + params.id + "/edit", data2)
        .then((response) => {
          alert("event successfully updated");
          history.push("/teacher-dashboard");

          window.location.reload(false);
        })
        .catch((err) => {
          alert("event updation unsuccessful");
        });
      setEvent({
        eventName: "",
        eventDescription: "",
        referenceLinks: "",
        minTeamSize: "",
        maxTeamSize: "",
        maxMarks: "",
        createdBy: "Gaurika",
      });
      setRegistrationDeadline("");
      setSubmissionDeadline("");
      setSelectedFile(null);
    }
  };
  const [event, setEvent] = useState({
    eventName: "",
    eventDescription: "",
    referenceLinks: "",
    minTeamSize: "",
    maxTeamSize: "",
    maxMarks: "",
    //registrationDeadline: "",
    //submissionDeadline: "",
    createdBy: "Gaurika",
  });
  useEffect(() => {
    GET(apiEndpoints.EVENTS + "/" + params.id)
      .then((res) => {
        setEvent({
          eventName: res.data.eventName,
          eventDescription: res.data.eventDescription,
          referenceLinks: res.data.referenceLinks.toString(),
          minTeamSize: res.data.minTeamSize,
          maxTeamSize: res.data.maxTeamSize,
          maxMarks: res.data.maxMarks,
          //registrationDeadline: res.data.registrationDeadline,
          //submissionDeadline: res.data.submissionDeadline,
          createdBy: "Gaurika"
        });
        //setRegistrationDeadline(res.data.registrationDeadline)
        //setSubmissionDeadline(res.data.submissionDeadline)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <Navbar userType="teacher" />
      <br />
      <h2> Edit Event </h2>
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
