import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // import CSS
import axios from "axios";
import Apiconfigs from "../apiconfigs/Apiconfig";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, getProfile } = useAuth();
  const from = localStorage.getItem("routing");
  const [username, setUsername] = useState("YoyoHoney@mailinator.com");
  const [password, setPassword] = useState("1234");

  const handleLogin = async () => {
    try {
      if (username === "" && password === "") {
        alert("Enter password and email.");
        return false;
      }
      const response = await axios({
        url: Apiconfigs?.login,
        data: {
          email: username,
          password: password,
        },
        method: "POST",
      });

      if (response?.data?.response === 200) {
        const token = response?.data?.userData?.token;
        localStorage.setItem("token", token);
        getProfile(token);
        toast.success(response?.data?.message);
        login(token);
        navigate("/");
      }
    } catch (error) {
      if (error?.status === 400) {
        toast.error(error?.response?.data?.message);
      }
      console.log("error", error);
    }
  };
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
