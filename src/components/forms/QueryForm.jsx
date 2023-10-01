import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postQuery } from "../../redux/admin/SupportReducer/action";

export const QueryForm = ({userTransactionData,isPresentFunc}) => {
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
        <div className="button-container">
        <button type="submit" className="button">Add new</button>
        <button className="button" onClick={()=>isPresentFunc((prev)=>!prev)}>Go Back</button>
        </div>
      </form>
    </DIV>
  );
};

const DIV = styled.div`
box-sizing: border-box;
  width: 30%;
  margin: auto;
  form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  form > select{
    height: 2rem;
    border-radius: .3rem;
    padding-left: 0.5rem;
    outline : none
  }
  form > input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    border-radius: .3rem;
    padding-left: 0.5rem;
    outline : none
  }
  .button{
    width: 30%;
    height: 1.8rem;
    margin: auto;
    border-radius: 3rem;
    background-color: #c6fe1e;
  }
  .button-container{
    display: flex;
  }
`;
