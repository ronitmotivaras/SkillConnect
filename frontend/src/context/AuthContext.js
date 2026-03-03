import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

axios.defaults.baseURL = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sc_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/auth/me")
        .then(({ data }) => {
          if (data.success) setUser(data.user);
        })
        .catch(() => localStorage.removeItem("sc_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (formData) => {
    const { data } = await axios.post("/api/auth/register", formData);
    if (data.success) {
      localStorage.setItem("sc_token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
    }
    return data;
  };

  const login = async (email, password) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    if (data.success) {
      localStorage.setItem("sc_token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      setUser(data.user);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("sc_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
