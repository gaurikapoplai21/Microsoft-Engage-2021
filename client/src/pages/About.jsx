import React from 'react'
import Navbar from "../components/Navbar/index";
import home from "../assets/images/home.jpg"
import {Card,Button} from "react-bootstrap"
import { useHistory } from 'react-router-dom';


const About = () => {
    const history = useHistory();
    return (
      <div
        style={{
          backgroundImage: `url(${home})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Navbar />
       
        <Card border="secondary" style={{ width: "70%" ,height: "70%" ,marginLeft:"15%",marginRight:"15%",marginTop:"5%"}}>
          
          <Card.Body>
            <Card.Title>Team-Up</Card.Title>
            <Card.Text>
              Team-Up is a platform to automate the process of project management at schools and colleges. It allows teachers 
              to create events for projects/assignments and for students to form teams and register themselves for the events. The teachers 
              receive collated information about all the teams registered. Students can submit their GitHub links for the projects and the teachers can assign marks for
              their submissions.
              <br />
              <br />
              This portal also has an automatic scheduler for conducting presentations. The teachers have to specify the
              dates and times as per their availability and a schedule is generated where all the registered teams are allocated
              a slot for their presentations. This generated schedule is then available to both teachers and students.
              <br />
              <br />
              Additionally, for every event creation, project submission, schedule release and other important notification,emails 
              are sent to the concerned users.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
           <Button variant="secondary" onClick={()=>history.push("/register")}>Register</Button>
           <Button variant="secondary" style={{marginLeft:"1%"}} onClick={()=>history.push("/login")}>Login</Button>
          </Card.Footer>
        </Card>
      </div>
    );
}

export default About
