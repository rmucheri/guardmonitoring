import React, { useState } from "react";
import PropTypes from "prop-types";

const WriteUpForm = ({ onSubmit }) => {
  const [guardId, setGuardId] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ guardId, reason, date, time });
    setGuardId("");
    setReason("");
    setDate("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Write Up a Guard</h2>
      <label htmlFor="guardId">Guard ID:</label>
      <input
        type="text"
        id="guardId"
        value={guardId}
        onChange={(e) => setGuardId(e.target.value)}
      />
      <br />

      <label htmlFor="reason">Reason:</label>
      <input
        type="text"
        id="reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <br />

      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />

      <label htmlFor="time">Time:</label>
      <input
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

WriteUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WriteUpForm;
