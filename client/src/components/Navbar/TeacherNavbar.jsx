import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";


const TeacherNavbar = (props) => {
   let history = useHistory()
   const dispatch = useDispatch();

   const handleLogout = () =>{
     dispatch(logout())
     history.push("/")
   }
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
                    <Nav.Link
                      onClick={() => history.push("/student-dashboard")}
                    >
                      Home
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      onClick={() => history.push("/teacher-dashboard")}
                    >
                      Home
                    </Nav.Link>
                  )}

                  <Nav>
                    {props.userType === "student" ? (
                      <Nav.Link onClick={() => history.push("/myTeams")}>
                        MyTeams
                      </Nav.Link>
                    ) : (
                      <Nav.Link onClick={() => history.push("/create-event")}>
                        Create Event
                      </Nav.Link>
                    )}
                  </Nav>
                  <Nav>
                    {props.userType === "student" ? (
                      <Nav.Link onClick={() => history.push("/mySubmissions")}>
                        MySubmissions
                      </Nav.Link>
                    ) : null}
                  </Nav>
                  <Nav>
                    {props.userType === "student" ? (
                      <Nav.Link
                        onClick={() => history.push("/mySchedules/student")}
                      >
                        MySchedules
                      </Nav.Link>
                    ) : (
                      <Nav.Link
                        onClick={() => history.push("/mySchedules/teacher")}
                      >
                        MySchedules
                      </Nav.Link>
                    )}
                  </Nav>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    );
}

export default TeacherNavbar
