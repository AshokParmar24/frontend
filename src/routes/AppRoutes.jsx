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

const AppRouter = () => {
  const isLogin = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") == "ADMIN";
  return (
    <Router>
      <Routes>
        <Route element={<Authentication />}>
          <Route path="/dashbord" element={<DashboardPage />} />
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
              to={isLogin ? (isAdmin ? "/dashbord" : "/kgmfdlgmld") : "/"}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
