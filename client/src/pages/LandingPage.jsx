import React from 'react'
import {useState} from 'react'
import Signin from "../pages/SigninPage/index";
import Signup from "../pages/SignupPage/index";
import Navbar from "../components/Navbar/index";

const LandingPage = () => {
     const [loginType, setLoginType] = useState("Register");

     const handlecallback = (childData) => {
       setLoginType(childData);
     };
    return (
      <div>
        <Navbar loginType={handlecallback} />
        <br />
        {loginType === "Register" ? <Signup /> : <Signin />}
      </div>
    );
}

export default LandingPage
