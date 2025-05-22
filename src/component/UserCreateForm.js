import React, { useState } from "react";
import axios from "axios";
import Apiconfigs from "../apiconfigs/Apiconfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserCreateForm = () => {
  const navigate = useNavigate();

  const [_isloading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // new field
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const response = await axios({
        method: "POST",
        url: Apiconfigs.register,
        data: formData,
      });

      if (response?.data?.response === 200) {
        setIsloading(false);
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      setIsloading(false);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>Create New User</h2>

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        disabled={_isloading}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={_isloading}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={_isloading}
      />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={_isloading}
      />

      <button type="submit">
        {_isloading ? "Creating User..." : "Create User"}{" "}
      </button>
    </form>
  );
};

export default UserCreateForm;
