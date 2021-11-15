import { useEffect, useState } from "react";
import { pageTitles } from "../../constants/app";
import Button from "@mui/material/Button";
import { apiEndpoints } from "../../constants/apiEndpoints";
import { GET } from "../../config/api";
import { decodePassword } from "../../utils/users";


//front end and switch between register and login

// helper functions
import { setWindowTitle } from "../../utils/misc";
const SigninPage = () => {
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
      GET(apiEndpoints.USERS + "/login/" + userLogin.email, data).then(
        (response) => {
          console.log(response)
          if (response.status === 500) {
            alert("Server not able to log you in.");
          } else if (response.status === 200) {
            if (userLogin.password === decodePassword(response.data.password)) {
                  alert("Login successful")

            } else {
              alert("Password does not match");
            }
          }
          console.log(response.data.password);
        }
      ).catch(function(error) {
        alert("User does not exist");})

      setUserLogin({
        email: "",
        password: "",
      });
    }
  };
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            required
            value={userLogin.email}
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
            value={userLogin.password}
            onChange={handleInput}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Login{" "}
        </Button>
      </form>
    </div>
  );
};

export default SigninPage;
