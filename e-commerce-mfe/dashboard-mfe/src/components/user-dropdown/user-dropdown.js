import React, { useEffect, useState } from "react";
import { getAllusers } from "../../services/user-service";
const UserDropdown = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const userList = await getAllusers();
        if (!userList || !Array.isArray(userList)) {
          throw new Error("Unexpected response format");
        }
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleSelectionChange = (e) => {
    const selectedUserId = e.target.value;
    if (onUserSelect) {
      onUserSelect(selectedUserId);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="userDropdown" style={{ marginRight: "10px" }}>
        Select Vendor:
      </label>
      <select
        id="userDropdown"
        onChange={handleSelectionChange}
        defaultValue=""
        style={{ padding: "5px" }}
      >
        <option value="" disabled>
          -- Select a Vendor --
        </option>
        {users
          .filter((user) => user.role === "VENDOR")
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default UserDropdown;