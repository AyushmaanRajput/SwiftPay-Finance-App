import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postQuery } from "../../redux/admin/SupportReducer/action";

export const QueryForm = ({userTransactionData,isPresentFunc}) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(userTransactionData);
  
  const handleSubmit = (e) => {
    e.preventDefault()
     dispatch(postQuery(userData));
     setUserData({...userData,message:"",subject:"",priority:""})
     isPresentFunc((prev)=>!prev)
  };
  console.log(userData)

  return (
    <DIV>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={userData.subject}
          onChange={(e) => setUserData({ ...userData, subject: e.target.value })}
          required
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={userData.message}
          onChange={(e) => setUserData({ ...userData, message: e.target.value })}
          required
        />

        <select name="priority" value={userData.priority} required onChange={(e)=>setUserData({...userData,priority : e.target.value})}>
          <option name="">Select Priority</option>
          <option name="low">Low</option>
          <option name="medium">Medium</option>
          <option name="high">High</option>
        </select>
        <div className="button-container">
        <button type="submit" className="button">Add Query</button>
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
