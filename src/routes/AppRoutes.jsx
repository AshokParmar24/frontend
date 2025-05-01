// src/routes/AppRouter.js

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/Login/index";
import Authentication from "../middlewares/Authentication";
import RegisterPage from "../pages/Register";
import DashboardPage from "../pages/Dashboard";
import { useEffect, useState } from "react";
import AdminAuthorization from "../middlewares/Authorization";
import UserProfilePage from "../pages/UserProfile/UserProfile";
import KthElementPage from "../pages/KthElement/KthElement";

const AppRouter = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setIsLogin(!!token);
    setIsAdmin(role === "ADMIN");
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Authentication />}>
          <Route element={<AdminAuthorization />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/kthelement" element={<KthElementPage />} />

          
        </Route>
        {!isLogin && (
          <>
            {" "}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}

        {/* Catch-all fallback */}
        <Route
          path="*"
          element={
            <Navigate
              to={isLogin ? (!!isAdmin ? "/dashboard" : "/dashboard") : "/"}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
