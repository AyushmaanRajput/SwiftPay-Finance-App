import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
// import { Login } from "../pages/Login";
import { AuthPage } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { Admin } from "../pages/Admin";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<AuthPage />}></Route>
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};
