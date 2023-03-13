import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, notification } from "antd";
import { checkInGuard } from "../api/guards";

const { TextArea } = Input;

const CheckInForm = ({ guardId, onUpdateGuard }) => {
  const [checkInNote, setCheckInNote] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await checkInGuard(guardId, checkInNote);
      notification.success({
        message: "Guard Checked In",
        description: `Guard ${response.data.name} has checked in successfully.`,
      });
      onUpdateGuard(response.data);
      setCheckInNote("");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred while checking in guard.",
      });
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Check In Note">
        <TextArea
          rows={3}
          value={checkInNote}
          onChange={(e) => setCheckInNote(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Check In
        </Button>
      </Form.Item>
    </Form>
  );
};

CheckInForm.propTypes = {
  guardId: PropTypes.string.isRequired,
  onUpdateGuard: PropTypes.func.isRequired,
};

export default CheckInForm;
