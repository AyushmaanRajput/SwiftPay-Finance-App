import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postQuery } from "../../redux/admin/SupportReducer/action";
import { useToast } from "../custom/ToastProvider";
import { ButtonOutline, ButtonSmall } from "../Buttons";

export const QueryForm = ({ userTransactionData, isPresentFunc }) => {
  const showToast = useToast();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(userTransactionData);
  console.log(userTransactionData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postQuery(userData, showToast));
    setUserData({ ...userData, message: "", subject: "", priority: "" });
    isPresentFunc((prev) => !prev);
  };
  console.log(userData);

  return (
    <DIV>
      <h3>Raise Ticket</h3>
      <p>
        Transaction ID : <span>{userTransactionData.transactionId}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <select
          name="priority"
          value={userData.priority}
          required
          onChange={(e) =>
            setUserData({ ...userData, priority: e.target.value })
          }
        >
          <option name="">Select Priority</option>
          <option name="low">Low</option>
          <option name="medium">Medium</option>
          <option name="high">High</option>
        </select>
        <input
          type="text"
          name="subject"
          placeholder="Write a subject"
          value={userData.subject}
          onChange={(e) =>
            setUserData({ ...userData, subject: e.target.value })
          }
          required
        />
        <textarea
          type="text"
          name="message"
          placeholder="Mention details in message"
          value={userData.message}
          onChange={(e) =>
            setUserData({ ...userData, message: e.target.value })
          }
          required
        />

        <div className="button-container">
          <ButtonOutline onClick={() => isPresentFunc((prev) => !prev)}>
            Go Back
          </ButtonOutline>
          <ButtonSmall type="submit">Add new</ButtonSmall>
        </div>
      </form>
    </DIV>
  );
};

const DIV = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  width: 35rem;
  margin: auto;
  text-align: left;
  color: var(--primary-white);
  h3 {
    text-align: left;
  }
  p {
    margin-bottom: 2rem;
    span {
      color: var(--primary-light);
    }
  }
  form > select {
    background-color: transparent;
    border: 1px solid var(--primary-grey);
    padding: 0.5rem 1rem;
    color: var(--primary-grey);
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    option {
      background-color: var(--background-light);
    }
  }
  form > input,
  form > textarea {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-grey);
    background-color: transparent;
    margin-bottom: 1rem;
    color: var(--primary-white);
    border-radius: 0.25rem;
    &:focus {
      outline-color: var(--primary-light);
    }
  }
  form > textarea {
    margin-bottom: 3rem;
  }
  .button {
    width: 30%;
    height: 1.8rem;
    margin: auto;
    border-radius: 3rem;
    background-color: #c6fe1e;
  }
  .button-container {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
  }
`;
