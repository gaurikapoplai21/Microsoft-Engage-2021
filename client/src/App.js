import { Fragment } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Signin from "../src/pages/SigninPage/index"
import Signup from "../src/pages/SignupPage/index"


// constants
import {
  userTypes,
  signedOutRoutes,
  signedInStudentRoutes,
  signedInTeacherRoutes,
} from "./constants/app";
import history from "./config/history";

function App() {
  const user = 1;
  const userType = userTypes.STUDENT;

  return (
    <div className="App">
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <Switch>
          {user === null ? (
            <Fragment>
              {signedOutRoutes.map((route, routeIdx) => (
                <Route
                  key={routeIdx}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Fragment>
          ) : userType === userTypes.TEACHER ? (
            <Fragment>
              {signedInStudentRoutes.map((route, routeIdx) => (
                <Route
                  key={routeIdx}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {signedInTeacherRoutes.map((route, routeIdx) => (
                <Route
                  key={routeIdx}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Fragment>
          )}
        </Switch>
      </Router>
      <Signup />
      <Signin />
    </div>
  );
}

export default App;
