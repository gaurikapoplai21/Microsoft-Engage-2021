// constants
import { routes } from "./routes";
// components
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import TeacherDashboard from "../pages/TeacherPages/TeacherDashboard";
import StudentDashboard from "../pages/StudentPages/StudentDashboard";
import NotfoundPage from "../pages/NotfoundPage";

export const userTypes = {
  STUDENT: "student",
  TEACHER: "teacher",
};

export const signedOutRoutes = [
  { exact: true, path: routes.SIGNUP, component: SignupPage },
  { exact: true, path: routes.SIGNIN, component: SigninPage },
  { exact: true, path: "/", component: HomePage },
  { exact: true, path: routes.HOME, component: HomePage },

  //{ exact: false, path: routes.NOTFOUND, component: NotfoundPage },
];

export const signedInTeacherRoutes = [
  { exact: true, path: routes.TEACHER_DASHBOARD, component: TeacherDashboard },
];

export const signedInStudentRoutes = [
  { exact: true, path: routes.STUDENT_DASHBOARD, component: StudentDashboard },
];

export const pageTitles = {
  HOME: "Home",
  SIGNIN: "Sign-in",
  SIGNUP: "Sign-up",
  TEACHER_DASHBOARD: "Teacher Dashboard",
  STUDENT_DASHBOARD: "Student Dashboard",
};
