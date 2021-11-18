import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/logo.png";


const TeacherNavbar = (props) => {
    return (
      <div>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <img src={logo} height="30" width="120" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                  {props.userType === "student" ? (
                    <Nav.Link href="/student-dashboard">Home</Nav.Link>
                  ) : (
                    <Nav.Link href="/teacher-dashboard">Home</Nav.Link>
                  )}
                  <Nav.Link>Profile</Nav.Link>
                  <Nav>
                    {props.userType === "student" ? (
                      <Nav.Link>MyTeams</Nav.Link>
                    ) : null}
                  </Nav>
                  <Nav.Link style={{ marginLeft: "60vw" }} href="/">
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    );
}

export default TeacherNavbar
