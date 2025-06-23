import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = !!localStorage.getItem("auth_token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
} 