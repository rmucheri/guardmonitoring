import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GuardLocationMap from './GuardLocationMap';

const GuardHome = ({ user }) => {
  const [guard, setGuard] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuard = async () => {
      try {
        const response = await axios.get(`/api/guards/${user.id}`);
        setGuard(response.data);
        setLocation(response.data.location);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };

    fetchGuard();
  }, [user.id]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleCheckIn = async () => {
    try {
      const response = await axios.post('/api/checkin', {
        guardId: guard._id,
        location,
      });
      setGuard(response.data);
      setLocation(response.data.location);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {guard && (
        <div>
          <h2>Guard Home</h2>
          <p>Welcome, {guard.name}!</p>
          <p>Your current status is {guard.status}.</p>
          <GuardLocationMap location={location} onLocationChange={handleLocationChange} />
          <button onClick={handleCheckIn}>Check In</button>
        </div>
      )}
    </>
  );
};

export default GuardHome;
