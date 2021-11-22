import { Fragment, useState } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage"
import TeacherDashboard from "../src/pages/TeacherPages/TeacherDashboard/index"
import StudentDashboard from "../src/pages/StudentPages/StudentDashboard/index"
import CreateEvent from "../src/pages/CreateEventPage/index"
import RegisterTeam from "../src/pages/StudentPages/RegisterTeam"
import EditEvent from "../src/pages/EditEventPage/index"
import EventDetails from "./pages/EventDetails"
import EventTeamDetails from "./pages/EventTeamDetails"
import Profile from "./pages/Profile"
import MyTeams from  "./pages/MyTeams"
import MySubmissions from "./pages/MySubmissions";

import EditTeam from "./pages/EditTeam"




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
          <Route path="/myTeams" component={MyTeams} />
          <Route path="/mySubmissions" component={MySubmissions} />
          <Route path="/create-event" component={CreateEvent} />
          <Route
            path="/register-team/:id/:eventName"
            component={RegisterTeam}
          />
          <Route path="/edit-event/:id" component={EditEvent} />
          <Route path="/event/:userType/:id" component={EventDetails} />
          <Route path="/teams/:userType/:id" component={EventTeamDetails} />
          <Route path="/edit-team/:id/:size" component={EditTeam} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
