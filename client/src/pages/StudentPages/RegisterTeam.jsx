import React from "react";
import {useState} from "react"
import Navbar from "../../components/Navbar/TeacherNavbar";
import { Form, Button, Row, Col } from "react-bootstrap";

const RegisterTeam = (props) => {

const handleInput = (e) => {
   const field = e.target.name;
   const value = e.target.value;
   setTeam({ ...team, [field]: value });
 };
const [teamSize, setTeamSize] = useState(
    {
        size: 0
    }
)
const [display, setDisplay] = useState(0)
const handleTeamSize = (e) => {
  const field = e.target.name;
  const value = e.target.value;
  setTeamSize({ ...teamSize,[field]:value });
};
const [team, setTeam] = useState(
    {
        teamName:"",
        createdBy:"Gaurika",
       

        

    }
    )
const handleSubmit = () => {
    const obj = { ...team};
    console.log(obj)
    //get respective userId using email of each member
    //append that userId to 
    const data = {
        "eventName": obj.eventName,
        "createdBy": obj.createdBy,

    }
}

const handleNext = () => {
    console.log(props._id);
    setDisplay(parseInt(teamSize.size))
}
  return (
    <div>
      <Navbar userType="student" />
      <br />
      <h2> Register for Event </h2>
      <br />
      <div style={{ display: "block" }}>
        <Form style={{ width: "50%", display: "inline-block" }}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Team Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Team Name"
                name="teamName"
                value={team.teamName}
                onChange={handleInput}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Team Size
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="text"
                placeholder="Enter Team Size"
                name="size"
                value={teamSize.size}
                onChange={handleTeamSize}
              />
            </Col>
            <br />
          </Form.Group>

          <Button
            variant="success"
            style={{ marginBottom: "20px" }}
            onClick={handleNext}
          >
            Next
          </Button>
          <br />
          {[...Array(display)].map((elementInArray, i) => (
            <div className="" key={i}>
              {" "}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Team Member
                </Form.Label>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name={"member" + i}
                    value={team.i}
                    onChange={handleInput}
                  />
                </Col>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder="Email ID"
                    name={"email" + i}
                    value={team.i}
                    onChange={handleInput}
                  />
                </Col>
              </Form.Group>
            </div>
          ))}
          {display !== 0 ? (
            <Button
              variant="primary"
              style={{ marginBottom: "20px" }}
              onClick={handleSubmit}
            >
              Submit{" "}
            </Button>
          ) : null}
        </Form>
      </div>
    </div>
  );
};

export default RegisterTeam;
