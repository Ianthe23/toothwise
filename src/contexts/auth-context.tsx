"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  user: { email: string } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const userData = localStorage.getItem("user");

    if (authStatus === "true" && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && pathname !== "/auth") {
      router.push("/auth");
    } else if (isAuthenticated && pathname === "/auth") {
      router.push("/");
    }
  }, [isAuthenticated, pathname, router, isLoading]);

  const login = (email: string, password: string) => {
    // Simple frontend-only authentication
    const userData = { email };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    router.push("/auth");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
