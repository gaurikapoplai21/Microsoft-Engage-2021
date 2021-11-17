import { useEffect, useState } from "react";
import { pageTitles } from "../../constants/app";
import Button from "@mui/material/Button";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { GET } from "../../config/api";
import { decodePassword } from "../../utils/users";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// helper functions
import { setWindowTitle } from "../../utils/misc";
const SigninPage = () => {
  let history = useHistory();
  const [loggedin, setloggedin] = useState(
    {
      "login" : false,
      "loginType": ""
    }
  );
  useEffect(() => {
    if (loggedin) {
      if(loggedin.loginType === "teacher")
      {
        history.push("/teacher-dashboard");

      }
      else if(loggedin.loginType === "student")
      {
        history.push("/student-dashboard");
      }
      
    }
  }, [loggedin]);

  useEffect(() => {
    setWindowTitle(pageTitles.SIGNIN);
  }, []);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [field]: value });
  };
  const handleSubmit = () => {
    const data = { ...userLogin };
    console.log(data);
    if (userLogin.email === "" || userLogin.password === "") {
      alert("Please fill all the fields.");
    } else {
      GET(apiEndpoints.USERS + "/login/" + userLogin.email, data)
        .then((response) => {
          console.log(response);
          if (response.status === 500) {
            alert("Server not able to log you in.");
          } else if (response.status === 200) {
            if (userLogin.password === decodePassword(response.data.password)) {
              console.log("Login successful");
              setloggedin({
                login: true,
                loginType: response.data.userType,
              });
            } else {
              alert("Password does not match");
            }
          }
          console.log(response.data.password);
        })
        .catch(function (error) {
          console.log(error);
          alert("User does not exist");
        });

      setUserLogin({
        email: "",
        password: "",
      });
    }
  };
  const card = {
    width: "40%",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    display: "inline-block",
  };
  return (
    <div>
      <Card border="dark" style={card}>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Card.Text>
            <form action="">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Email
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  value={userLogin.email}
                  onChange={handleInput}
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Password
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  value={userLogin.password}
                  onChange={handleInput}
                  placeholder="password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <Button variant="contained" onClick={handleSubmit}>
                Login{" "}
              </Button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default SigninPage;
