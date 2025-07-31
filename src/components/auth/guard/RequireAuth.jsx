import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const isLoggedIn = document.cookie.split(";").some((c) => c.trim().startsWith("token="));
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/wattwizards/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;