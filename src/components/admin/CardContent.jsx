import React from "react";
import styled from "styled-components";
import { ButtonSmall } from "../Buttons";

const CardContent = ({
  avatarSrc,
  name,
  email,
  transactionId,
  subject,
  message,
  status,
  priority,
  createdDate,
}) => {
  return (
    <StyledCardContent>
      <div className="user-details">
        <img src={avatarSrc} alt={name} />
        <div>
          <p>
            <strong>User:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Transaction ID:</strong> {transactionId}
          </p>
        </div>
      </div>
      <div className="ticket-details">
        <h2>
          Ticket ID <span>#{transactionId}</span>
        </h2>
        <p>
          <strong>Subject:</strong> {subject}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Priority:</strong> {priority}
        </p>
        <p>
          <strong>Created Date:</strong> {createdDate}
        </p>
        <div className="buttons">
          <ButtonSmall>Reject</ButtonSmall>
          <ButtonSmall>Accept</ButtonSmall>
        </div>
      </div>
    </StyledCardContent>
  );
};

const StyledCardContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-image:var(--secondary-gradient);
  border: 2px solid white;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);

  .user-details {
    display: flex;
    align-items: center;
    padding-right:1rem;
    border-right: 1px solid var(--primary-grey);

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }

    div {
      margin-left: 1rem;

      p {
        margin: 0;
        font-size: 0.75rem;
        color: var(--primary-white);
      }
    }
  }

  .ticket-details {
    flex-grow: 1;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      color: var(--primary-white);
      margin-bottom: 1rem;
    }
    h2 span {
      color: var(--primary-light);
    }
    p {
      margin: 0;
      color: var(--primary-white);
    }

    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
    }
  }
`;

export default CardContent;
