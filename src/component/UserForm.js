import { useState } from "react";

export default function UserForm({ user, onClose, setUsers, users }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    // fetch(`http://localhost:3001/users/${user.id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((updatedUser) => {
    //     const updatedUsers = users.map((u) =>
    //       u.id === user.id ? updatedUser : u
    //     );
    //     setUsers(updatedUsers);
    //     onClose();
    //   });
  };

  return (
    <div style={modalStyle}>
      <h3>Edit User</h3>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option>Admin</option>
        <option>User</option>
      </select>
      <button onClick={handleUpdate}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

const modalStyle = {
  marginTop: "1rem",
  padding: "1rem",
  border: "1px solid #444",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};
