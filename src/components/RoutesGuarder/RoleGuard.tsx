// src/components/Guards/RoleGuard.tsx
import { useAuth } from "@/Contexts/AuthProvider";
import { Navigate } from "react-router-dom";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { user} = useAuth();

  if (!user || !allowedRoles.includes(user.userRole)) {
    return <Navigate to="/not-found" />;
  }
  return <>{children}</>;
};
