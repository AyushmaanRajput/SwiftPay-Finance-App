import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postQuery } from "../../redux/admin/SupportReducer/action";

export const QueryForm = ({userTransactionData}) => {
  const dispatch = useDispatch();
  const [data,setData] = useState({ subject: "", message: "", priority: ""})
  const [userData, setUserData] = useState(userTransactionData);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // userData.message = 
    setUserData((prev) => {
      return {...prev,message : data.message,subject:data.subject,priority:data.priority}
    })
    dispatch(postQuery(userData));
    setData({...data, subject: "", message: "", priority: ""})
  };
  console.log(userData)


  return (
    <DIV>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={data.subject}
          onChange={(e) => setData({ ...data, subject: e.target.value })}
          required
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          required
        />

        <select name="priority" value={data.priority} required onChange={(e)=>setData({...data,priority : e.target.value})}>
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
