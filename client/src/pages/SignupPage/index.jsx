import { useEffect, useState } from "react";
import { pageTitles } from "../../constants/app";
import Button from "@mui/material/Button";
import { GET, POST } from "../../config/api";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { encodePassword } from "../../utils/users";

//import "./SignupPage.module.css";

// helper functions
import { setWindowTitle } from "../../utils/misc";
const SignupPage = () => {
  useEffect(() => {
    setWindowTitle(pageTitles.SIGNUP);
  }, []);

  const [userRegistration, setUserRegistration] = useState({
    userName: "",
    email: "",
    password: "",
    userType: "student",
  });
  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [field]: value });
  };

  const handleRegister = () => {
    const data = { ...userRegistration };

    if (
      userRegistration.email === "" ||
      userRegistration.password === "" ||
      userRegistration.userName === ""
    ) {
      alert("Please fill all the fields.");
    } else {
      console.log(data);
      GET(apiEndpoints.USERS + "/login/" + userRegistration.email, data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("Email already taken");
            
          }
        })
        .catch((err) => {
          data.password = encodePassword(userRegistration.password);
          POST(apiEndpoints.USERS, data)
            .then((response) => {
              alert("registration successful");
            })
            .catch((err) => {
              alert("registration unsuccessful");
            });

          setUserRegistration({
            userName: "",
            email: "",
            password: "",
            userType: "student",
          });
        });
    }

     
      
    

  };

  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            autoComplete="off"
            required
            value={userRegistration.userName}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="userType">User Type</label>
          <select onChange={handleInput} name="userType">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            required
            value={userRegistration.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            required
            value={userRegistration.password}
            onChange={handleInput}
          />
        </div>
        <Button variant="contained" onClick={handleRegister}>
          Register{" "}
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
