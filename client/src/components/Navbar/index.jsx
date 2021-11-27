import React from 'react'
import {useState} from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/logo.png"
import {useHistory} from "react-router-dom"


const NavbarHome = (props) => {
    // const [loginType, setLoginType] = useState("Login")
    // const handleClick = (e) => {
    //       if(loginType==="Register")
    //       {
    //          setLoginType("Login");
    //       }
    //       else
    //       {
    //           setLoginType("Register");
    //       }
    //       console.log(props.loginType)
    //       props.loginType(loginType)
          
    // }
    const history = useHistory()
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <img src={logo} height="30" width="120" onClick={() => history.push("/")}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link  onClick={()=>history.push("/register")}>
                  Register
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link  onClick={()=>history.push("/login")}>
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavbarHome
