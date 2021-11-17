import { Fragment, useState } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage"
import TeacherDashboard from "../src/pages/TeacherPages/TeacherDashboard/index"
import StudentDashboard from "../src/pages/StudentPages/StudentDashboard/index"
import CreateEvent from "../src/pages/CreateEventPage/index"


// constants
import {
  userTypes,
  signedOutRoutes,
  signedInStudentRoutes,
  signedInTeacherRoutes,
} from "./constants/app";
import history from "./config/history";

function App() {
  const user = null;
  const userType = userTypes.TEACHER;

 

  return (
    <div className="App">
      <Router history={history} basename={process.env.PUBLIC_URL}>
        <Switch>
          {/* {user === null ? (
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
          ) : userType === userTypes.STUDENT ? (
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
          )} */}
          <Route exact path="/" component={LandingPage} />
          <Route path="/teacher-dashboard" component={TeacherDashboard} />
          <Route path="/student-dashboard" component={StudentDashboard} />
          <Route path="/createEvent" component={CreateEvent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
