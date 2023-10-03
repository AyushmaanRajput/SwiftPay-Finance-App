// Input.js
import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  color: ${(props) => (props.error ? "red" : "var(--primary-light)")};
  transition: all 0.2s ease;
  transform: ${(props) =>
    props.focused || props.value ? "translateY(-5px)" : "none"};
  font-size: ${(props) =>
    props.focused || props.value ? "smaller" : "inherit"};
  align-self: flex-start;
`;

const StyledInput = styled.input`
  width: 25rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => (props.error ? "red" : "#ccc")};
  border-color: ${(props) =>
    props.valid && !props.error ? "green" : props.error ? "red" : "#ccc"};
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s ease;
  font-size: normal;
`;

const ErrorText = styled.span`
  color: red;
  font-size: smaller;
  margin-top: 5px;
`;

function Input({ label, type, placeholder, value, onChange, onBlur }) {
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    value
  );

  const isError = touched && (value === undefined || value.trim() === "");
  const isPasswordValid = !isError && type === "password" && value.length >= 8;

  return (
    <InputContainer>
      <Label htmlFor={placeholder} error={isError} focused={focused} value={value}>
        {label}
      </Label>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        onBlur={(e) => {
          handleBlur();
          onBlur && onBlur(e);
        }}
        onFocus={handleFocus}
        error={isError}
        valid={isPasswordValid || (type === "email" && isValidEmail)}
      />
      {type !== "password" && isError && (
        <ErrorText>{`${label} is required`}</ErrorText>
      )}
      {type === "password" && !isError && !isPasswordValid && (
        <ErrorText>Must be at least 8 characters long</ErrorText>
      )}
      {type === "email" && !isError && !isValidEmail && (
        <ErrorText>Invalid email format</ErrorText>
      )}
    </InputContainer>
  );
}

export { Input };
