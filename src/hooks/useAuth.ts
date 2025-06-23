import { useCallback } from "react";

export function useAuth() {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  const login = useCallback((token: string) => {
    localStorage.setItem("auth_token", token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
  }, []);

  return { isAuthenticated, login, logout };
} 