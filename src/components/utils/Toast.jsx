import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: ${(props) =>
    props.type === "error"
      ? "red"
      : props.type === "warning"
      ? "orange"
      : "green"};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.show ? 1 : 0)};
  animation: ${(props) => (props.show ? fadeIn : fadeOut)} 0.3s ease forwards;
`;

export function Toast({ type, message, duration, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, duration || 3000);

    return () => clearTimeout(timer);
  }, [duration]);

  const onAnimationEnd = useCallback(() => {
    if (!show) {
      onClose(); // Call the onClose function after fade-out animation
    }
  }, [show, onClose]);

  return (
    <ToastContainer type={type} show={show} onAnimationEnd={onAnimationEnd}>
      {message}
    </ToastContainer>
  );
}
