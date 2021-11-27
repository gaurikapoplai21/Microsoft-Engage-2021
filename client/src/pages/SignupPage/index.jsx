import { useEffect, useState } from "react";
import { pageTitles } from "../../constants/app";
import Button from "@mui/material/Button";
import { GET, POST } from "../../config/api";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { encodePassword } from "../../utils/users";
import { Card,Form,Col} from "react-bootstrap";
import Navbar from "../../components/Navbar/index";



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
      <Navbar />
      <br />
      <br />
      <Card border="dark" style={{ width: "40%", display: "inline-block" }}>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Card.Text>
            <form action="">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    User Name
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  name="userName"
                  id="userName"
                  autoComplete="off"
                  required
                  value={userRegistration.userName}
                  onChange={handleInput}
                  placeholder="User Name"
                  aria-label="User Name"
                  aria-describedby="basic-addon1"
                />
              </div>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Select onChange={handleInput} name="userType">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Form.Select>
              </Form.Group>
              <br />
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    Email
                  </span>
                </div>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  value={userRegistration.email}
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
                  value={userRegistration.password}
                  onChange={handleInput}
                  placeholder="password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                />
              </div>

              <Button variant="contained" onClick={handleRegister}>
                Register{" "}
              </Button>
            </form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignupPage;
