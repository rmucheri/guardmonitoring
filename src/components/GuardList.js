import React, { useEffect, useState } from "react";
import axios from "axios";

const GuardList = ({ supervisors }) => {
  const [guards, setGuards] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await axios.get("/api/guards");
        setGuards(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch guard data");
      }
    };

    fetchGuards();
  }, []);

  return (
    <div>
      <h1>Guard List</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {guards.map((guard) => (
            <tr key={guard._id}>
              <td>{guard.name}</td>
              <td>{guard.status}</td>
              <td>{guard.supervisor.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuardList;
