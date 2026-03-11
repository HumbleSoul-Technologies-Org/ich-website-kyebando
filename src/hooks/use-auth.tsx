import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { type User } from "@/types/schema";
import { useToast } from "@/hooks/use-toast";

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

// Mock user for simulation
const MOCK_USER: User = {
  id: 1,
  username: "admin",
  password: "password123",
  role: "admin",
};

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

    // demo-mock path
    if (import.meta.env.VITE_USE_MOCK_AUTH === "true") {
      await new Promise((r) => setTimeout(r, 500));
      setUser(MOCK_USER);
      try {
        localStorage.setItem("authUser", JSON.stringify(MOCK_USER));
      } catch {}
      toast({
        title: "Welcome back!",
        description: `Logged in as ${MOCK_USER.username}`,
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiRequest("POST", "/auth/login", credentials);
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
