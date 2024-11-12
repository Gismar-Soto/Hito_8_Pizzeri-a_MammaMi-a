import React, { createContext, useState, useContext } from "react";
import { API_CONFIG } from "../Pages/config";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`http://${API_CONFIG.ip}:${API_CONFIG.port}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        setEmail(data.email);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`http://${API_CONFIG.ip}:${API_CONFIG.port}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        setEmail(data.email);
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setUserProfile(null);
  };

  const getProfile = async () => {
    if (!token) {
      console.error("No token available, user is not authenticated.");
      return;
    }

    try {
      const response = await fetch(`http://${API_CONFIG.ip}:${API_CONFIG.port}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile, userProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
