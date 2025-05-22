import { useState } from "react";
import UserForm from "./UserForm";

export default function UserList({ users, setUsers }) {
  const [editingUserId, setEditingUserId] = useState(null);

  const deleteUser = (id) => {
    // fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" }).then(() =>
    //   setUsers(users.filter((user) => user.id !== id))
    // );
  };

  return (
    <div>
      <h3>All Users</h3>
      {users.map((user) => (
        <div key={user.id} style={styles.card}>
          <div>
            <strong>Name:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Role:</strong> {user.role}
          </div>
          <div>
            <button onClick={() => setEditingUserId(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>

          {editingUserId === user.id && (
            <div style={styles.formWrapper}>
              <UserForm
                user={user}
                onClose={() => setEditingUserId(null)}
                setUsers={setUsers}
                users={users}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    padding: "1rem",
    margin: "1rem 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  formWrapper: {
    marginTop: "1rem",
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
};
