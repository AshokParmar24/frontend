// src/routes/AppRouter.js

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/Login/index";
import Authentication from "../middlewares/Authentication";
import HomePage from "../pages/Home";
import RegisterPage from "../pages/Register";

const AppRouter = () => {
  const isLogin = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route element={<Authentication />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to={isLogin ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
