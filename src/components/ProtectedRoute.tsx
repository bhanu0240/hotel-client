import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const loggedIn = !!auth.token;

  if (!loggedIn) return <Navigate to="/login" replace />;
  if (adminOnly && auth.user?.role !== "admin")
    return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
