import { Navigate, Outlet } from "react-router-dom";

const AdminAuthorization = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "ADMIN") {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default AdminAuthorization;
