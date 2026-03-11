import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

// Generic route guard that redirects unauthorized users to the login page
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isInitializing } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!isInitializing && !user) {
      setLocation("/admin");
    }
  }, [user, isInitializing, setLocation]);

  // don't render children until we know the auth state; this prevents a flash
  if (isInitializing || !user) {
    return null;
  }

  return <>{children}</>;
}
