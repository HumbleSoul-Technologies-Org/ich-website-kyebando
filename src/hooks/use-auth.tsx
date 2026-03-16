import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { type User } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// simple auth context: stores user and provides login/logout helpers

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isInitializing: boolean; // waiting for localStorage
  error: Error | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

 
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // load persisted user from storage
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setIsInitializing(false);
  }, []);

  // simple login / logout helpers
  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiRequest("POST", "/auth/admin/login", credentials);
      const data = (await res.json()) as User;
      setUser(data);
      try {
        localStorage.setItem("authUser", JSON.stringify(data));
      } catch {}
      toast({
        title: "Welcome back!",
        description: `Logged in as ${data.username}`,
      });
    } catch (err: any) {
      setError(err);
      console.log('====================================');
      console.log(err);
      console.log('====================================');
      toast({
        title: "Login failed",
        description: err.message || String(err),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    try {
      localStorage.removeItem("authUser");
    } catch {}
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isInitializing,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
