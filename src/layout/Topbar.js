import React from "react";
import Logo from "../component/Logo";
import { Link } from "react-router-dom";
import "../cssStyle/topbar.css";
import Menus from "./Menus";
import { useAuth } from "../context/AuthContext";
const Topbar = () => {
  const { logout } = useAuth();
  return (
    <div className="topbar-shadow">
      <div className="container">
        <div className="logout-manage">
          <div className="menu-logo">
            <div className="logo-container">
              <Link to="/">
                <Logo logo="/assets/logo.png" />
              </Link>
            </div>
            <Menus />
          </div>
          <div className="logout-div">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
