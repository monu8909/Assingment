import UserList from "./UserList";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <SearchBar setQuery={setQuery} />
      <UserList users={filteredUsers} setUsers={setUsers} />
    </div>
  );
}
