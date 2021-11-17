import React from 'react'
import {useState} from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/logo.png"


const NavbarHome = (props) => {
    const [loginType, setLoginType] = useState("Login")
    const handleClick = (e) => {
          if(loginType==="Register")
          {
             setLoginType("Login");
          }
          else
          {
              setLoginType("Register");
          }
          console.log(props.loginType)
          props.loginType(loginType)
          
    }
    return (
      <div>
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand ><img src={logo} height="30" width="120" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link style={{ "marginLeft": "60vw" }} onClick={handleClick}>{loginType}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavbarHome
