import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("rtms_user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("rtms_user");
      }
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app this would call an API
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (email === "admin@rtms.gov" && password === "admin123") {
        const user: User = {
          id: "1",
          username: "admin",
          email: "admin@rtms.gov",
          role: "admin"
        };
        
        setCurrentUser(user);
        localStorage.setItem("rtms_user", JSON.stringify(user));
        toast({
          title: "Logged in successfully",
          description: "Welcome back, Admin!",
        });
        
        return;
      } else if (email === "user@example.com" && password === "user123") {
        const user: User = {
          id: "2",
          username: "regularuser",
          email: "user@example.com",
          role: "user"
        };
        
        setCurrentUser(user);
        localStorage.setItem("rtms_user", JSON.stringify(user));
        toast({
          title: "Logged in successfully",
          description: "Welcome back!",
        });
        
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("rtms_user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const isAdmin = () => {
    return currentUser?.role === "admin";
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
