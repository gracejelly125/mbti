import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("currentUserId")
    if (token && userId) {
      setIsAuthenticated(true);
      setCurrentUserId(userId);
    }
  }, []);

  const setToken = (token, userId) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("currentUserId", userId);
    setIsAuthenticated(true);
    setCurrentUserId(userId);
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUserId");
    setIsAuthenticated(false);
    setCurrentUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUserId, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
