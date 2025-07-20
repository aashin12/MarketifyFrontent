
import { Navigate, Outlet } from "react-router-dom";

const ADMIN_EMAIL = "marketifyadmin@gmail.com";

export const AdminRoute = () => {
  const user = JSON.parse(sessionStorage.getItem("existingUser"));

  if (!user) return <Navigate to="/login" />;
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export const UserRoute = () => {
  const user = JSON.parse(sessionStorage.getItem("existingUser"));

  if (!user) return <Navigate to="/login" />;
  if (user.email === ADMIN_EMAIL) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};
