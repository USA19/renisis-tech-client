import Login from "../AuthPages/Login/Login";
import Signup from "../AuthPages/Signup/Signup";
import Home from "../AppViews/Home/Home";
import Profile from "../AppViews/Profile/Profile";
//constants
import { PROFILE_ROUTE, ROUTE_ROUTE, SIGNUP_ROUTE } from "../Constants";

export const AuthRoutes = [
  {
    path: ROUTE_ROUTE,
    component: <Login />,
    exact: true,
  },

  {
    path: SIGNUP_ROUTE,
    component: <Signup />,
    exact: true,
  },
];

export const AppRoutes = [
  {
    path: ROUTE_ROUTE,
    component: <Home />,
    exact: true,
  },

  {
    path: PROFILE_ROUTE,
    component: <Profile />,
    exact: true,
  },
];
