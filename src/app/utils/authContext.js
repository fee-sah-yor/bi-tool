"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "./localStorage";

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
    saveToken(userToken);
    setKeepLoggedIn(keepMeLoggedIn);

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
    removeToken()
    router.push("/login");
  };

  useEffect(() => {
    const storedToken = saveToken();
    if (storedToken) {
      setToken(storedToken);
    }
    return () => clearAutoLogoutTimer();
  }, [clearAutoLogoutTimer]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
