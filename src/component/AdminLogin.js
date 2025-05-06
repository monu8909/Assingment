import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // import CSS

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleLogin = () => {
    const userCheck = users.find((userEmail) => userEmail?.email === username);
    const userPasswordCheck = users.find(
      (user_password) => user_password?.password === password
    );

    console.log("userCheckuserPasswordCheck", userCheck, userPasswordCheck);

    if (username === "admin" && password === "admin123") {
      navigate("/admin/dashboard");
    } else if (
      userCheck !== undefined &&
      userPasswordCheck !== undefined &&
      userCheck.email == userPasswordCheck.email
    ) {
      navigate("/products");
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
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
