import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/TeacherNavbar";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { GET,POST } from "../../config/api";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const RegisterTeam = (props) => {
  const params = useParams();
  let history = useHistory();
  const user = useSelector(selectUser)

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setTeam({ ...team, [field]: value });
  };
  const [teamSize, setTeamSize] = useState({
    size: 0,
  });
  const [display, setDisplay] = useState(0);
  const handleTeamSize = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setTeamSize({ ...teamSize, [field]: value });
  };
  const [team, setTeam] = useState({
    teamName: "",
    createdBy: user.name,
  });
  
  const [email, setEmail] = useState([])
  const handleEmail = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setEmail({ ...email,[field]:value });
  };

  const [names, setNames] = useState([]);
  const handleNames = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setNames({ ...names, [field]: value });
  };
  
  const handleSubmit = () => {
    const obj = { ...team };
    //get respective userId using email of each member
    //append that userId to members

     let result = Object.keys(email).map((key) => email[key]);

     let result2 = Object.keys(names).map((key) => names[key]);
     
    let data = {
      teamName: obj.teamName,
      createdBy: obj.createdBy,
      eventId : params.id,
      members:[],
      eventName: params.eventName,
      names: result2,
      emails: result
    };
    const emailData = {
      "contacts" : result,
      "eventName" : params.eventName
    }
    console.log(emailData);

    let promises = result.map((em,i)=>(
       GET(apiEndpoints.USERS + "/login/" + em)
      .then((res) => {
       
         data.members.push(res.data._id)

      })
      .catch((err) => {
        console.log(err);
      })
  
    ))


    Promise.allSettled(promises).then(() => {
       
       POST("/teams", data).then((res) => {
           console.log(res)
           alert("Team created successfully!");
           history.push("/student-dashboard");
         })
         .catch((err) => {
           console.log(err);
         });
         
    }).catch((err) => console.log(err))

     const sendEmail = async () => {
       const response = await POST("/email/teamregistered", emailData);
     };
     sendEmail()
       .then((response) => {
         console.log(response);
         
       })
       .catch((err) => {
         console.log(err);
         alert("Email reminder not successful");
       });
    
   
    

    
  };

  const handleNext = () => {
    setDisplay(parseInt(teamSize.size));
  };
  return (
    <div>
      <Navbar userType="student" />
      <br />
      <h2> Register for Event </h2>
      <br />
      <div style={{ display: "block" }}>
        <Form style={{ width: "80%", display: "inline-block" }}>
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
                    name={"name" + i}
                    // value={team.i}
                    onChange={handleNames}
                  />
                </Col>
                <Col sm="5">
                  <Form.Control
                    type="text"
                    placeholder="Email ID"
                    name={"email" + i}
                    // value={team.i}
                    onChange={handleEmail}
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
