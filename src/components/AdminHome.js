import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GuardList from "./GuardList";
import WriteUpForm from "./WriteUpForm";
import { getUsers } from "../services/userService";
import { writeUpGuard } from "../services/guardService";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [writeUp, setWriteUp] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleWriteUpChange = (event) => {
    setWriteUp(event.target.value);
  };

  const handleWriteUpSubmit = async (event) => {
    event.preventDefault();
    try {
      await writeUpGuard(selectedUser, writeUp);
      alert("Guard successfully written up!");
      setSelectedUser("");
      setWriteUp("");
    } catch (ex) {
      alert("Could not write up guard: " + ex.response.data);
    }
  };

  return (
    <div>
      <h2>Admin Home</h2>
      <div>
        <h3>Write Up Guard</h3>
        <form onSubmit={handleWriteUpSubmit}>
          <label>
            Guard:
            <select value={selectedUser} onChange={handleUserChange}>
              <option value="">Select a guard</option>
              {users
                .filter((user) => user.role === "guard")
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <label>
            Write-up:
            <textarea value={writeUp} onChange={handleWriteUpChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <hr />
      <div>
        <h3>Guard List</h3>
        <GuardList />
      </div>
      <hr />
      <div>
        <Link to="/create-user">Create User</Link>
      </div>
    </div>
  );
};

export default AdminHome;
