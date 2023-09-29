import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { handlePostQueryForm } from "../../redux/user/userQuery/action";

export const QueryForm = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ subject: "", message: "", priority: ""});
  useEffect(() => {
    dispatch(handlePostQueryForm);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userData)
  };

  return (
    <DIV>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={userData.subject}
          onChange={(e) => setUserData({ ...userData, subject: e.target.value })}
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={userData.message}
          onChange={(e) => setUserData({ ...userData, message: e.target.value })}
        />

        <select name="priority" value={userData.priority} onChange={(e)=>setUserData({...userData,priority : e.target.value})}>
          <option name="">Select Priority</option>
          <option name="low">Low</option>
          <option name="medium">Medium</option>
          <option name="high">High</option>
        </select>
        <input type="submit" />
      </form>
    </DIV>
  );
};

const DIV = styled.div`
  width: 50%;
  margin: auto;
  form {
    background-color: white;
  }
  form > input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
