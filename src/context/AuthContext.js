import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import Apiconfigs from "../apiconfigs/Apiconfig";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [_history, setHistory] = useState([]);
  const [_userdata, setUserData] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("isAuthenticated");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  const getProfile = async (token) => {
    try {
      const response = await axios({
        url: Apiconfigs?.get_profile,
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}` || `Bearer ${token}`,
        },
      });
      if (response?.data?.response === 200) {
        setUserData(response?.data?.userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error?.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
      await getProfile(token);
    };

    fetchProfile();
  }, []);
  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");

    setIsAuthenticated(false);
  };
  let data = {
    isAuthenticated,
    loading,
    login,
    logout,
    _history,
    getProfile,
    _userdata,
    setHistory: (value) => setHistory(value),
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
