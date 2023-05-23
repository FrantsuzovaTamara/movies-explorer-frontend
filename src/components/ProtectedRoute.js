import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/movies-explorer-frontend/" replace />;
  }
  return children;
};

export default ProtectedRoute;
