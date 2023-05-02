import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, loggedIn }) {
  return loggedIn ? <Component /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;