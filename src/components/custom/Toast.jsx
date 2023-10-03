// Toast.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  background-color: ${(props) => getBackgroundColor(props.type)};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  z-index: 1000000;
`;

const getBackgroundColor = (type) => {
  switch (type) {
    case "success":
      return "green"; // Customize the color for success
    case "warning":
      return "orange"; // Customize the color for warning
    case "error":
      return "red"; // Customize the color for error
    default:
      return "#333"; // Default color
  }
};

const Toast = ({ type, message, duration }) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <ToastContainer type={type} show={showToast}>
      {message}
    </ToastContainer>
  );
};

export default Toast;
