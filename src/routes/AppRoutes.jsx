// src/routes/AppRouter.js

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/Login";
import Authentication from "../middlewares/Authentication";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Authentication />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to={isLogin() ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
