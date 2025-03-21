"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  let autoLogoutTimer = null;

  const clearAutoLogoutTimer = () => {
    if (autoLogoutTimer) {
      clearTimeout(autoLogoutTimer);
      autoLogoutTimer = null;
    }
  };

  const login = (userToken, keepMeLoggedIn) => {
    setToken(userToken);
    setKeepLoggedIn(keepMeLoggedIn);
    localStorage.setItem("token", userToken);

    clearAutoLogoutTimer();
    if (!keepMeLoggedIn) {
      autoLogoutTimer = setTimeout(() => {
        logout();
      }, 60000);
    }
  };

  const logout = () => {
    clearAutoLogoutTimer();
    setToken(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    return () => clearAutoLogoutTimer();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
