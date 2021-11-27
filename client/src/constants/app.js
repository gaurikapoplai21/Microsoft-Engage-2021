// constants
import { routes } from "./routes";
// components
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import TeacherDashboard from "../pages/TeacherPages/TeacherDashboard";
import StudentDashboard from "../pages/StudentPages/StudentDashboard";
import NotfoundPage from "../pages/NotfoundPage";
import SignIn from "../pages/SigninPage/index"
import SignUp from "../pages/SignupPage/index"

export const userTypes = {
  STUDENT: "student",
  TEACHER: "teacher",
};

export const signedOutRoutes = [
  { exact: true, path: routes.SIGNUP, component: SignUp },
  { exact: true, path: routes.SIGNIN, component: SignIn },
  { exact: true, path: "/", component: SignUp },
  { exact: true, path: routes.HOME, component: SignUp },

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
