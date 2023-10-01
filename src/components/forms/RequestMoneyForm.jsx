import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const avatars = [
  "/avatars/Asian Man.png",
  "/avatars/Black Lady.png",
  "/avatars/Black Man.png",
  "/avatars/College Student.png",
  "/avatars/Indian Man.png",
  "/avatars/Middle Eastern Lady.png",
  "/avatars/Old Man.png",
  "/avatars/Western Man.png",
  "/avatars/White Lady.png",
  "/avatars/Young Lady.png",
];

const userAvatarIds = {
  1: 8,
  2: 7,
  3: 10,
  4: 3,
  5: 4,
};

const RequestMoneyFormContainer = styled.div`
  padding: 1rem;
  h3 {
    color: var(--primary-white);
    text-align: left;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CustomSelectDropdown = styled.div`
  position: relative;
`;

const CustomSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--primary-grey);
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
`;

const CustomSelectAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--primary-white);
  display: ${(props) => (props.showAvatar ? "block" : "none")};
`;

const CustomSelectContactInfo = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CustomSelectName = styled.span`
  color: var(--primary-white);
  font-weight: bold;
`;

const CustomSelectMobile = styled.span`
  color: var(--primary-light);
`;

const CustomSelect = styled.select`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid var(--primary-light);
  border-radius: 0.25rem;
`;

const CustomSelectOptions = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  color: var(--primary-white);
  background-color: var(--background-light);
  border: 1px solid var(--primary-light);
  border-radius: 0.25rem;
  z-index: 1;
`;

const CustomSelectOption = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
  border-bottom: 1px solid var(--primary-grey);

  &:hover {
    background-color: var(--primary-light);
    color: var(--background-light);
  }
  &:last-of-type {
    border-bottom: none;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--primary-grey);
  border-radius: 0.25rem;
  background-color: transparent;
  color: var(--primary-white);
  &:focus {
    outline-color: var(--primary-light);
    border-color: transparent;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--primary-grey);
  border-radius: 0.25rem;
  background-color: transparent;
  color: var(--primary-white);
  min-height: 10rem;
  min-width: 20rem;
  resize: none;
  &:focus {
    outline-color: var(--primary-light);
    border-color: transparent;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const CancelButton = styled.button`
  cursor: pointer;
  background-color: transparent !important;
  border: 1px solid var(--primary-light);
  color: var(--primary-light);
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: var(--link);
  letter-spacing: 0.2px;
`;

const ReceiveButton = styled.button`
  cursor: pointer;
  background-color: var(--primary) !important;
  color: var(--background-light) !important;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: var(--link);
  letter-spacing: 0.2px;
`;

export const RequestMoneyForm = ({ onClose }) => {
  const user = useSelector((store) => store.authReducer.loggedInUser);
  const [formData, setFormData] = useState({
    sender: "",
    amount: "",
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectContact = (contactId) => {
    setFormData({ ...formData, sender: contactId });
    toggleDropdown();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) {
      console.log("Amount is required");
      return;
    }
    if (parseFloat(formData.amount) > user.balance) {
      console.log("Amount exceeds your balance");
      return;
    }
    console.log("Receiving money:", formData);
    setFormData({
      sender: "",
      amount: "",
      message: "",
    });
    onClose();
  };

  const handleClose = () => {
    // Clear form data when modal is closed
    setFormData({
      sender: "",
      amount: "",
      message: "",
    });

    onClose();
  };

  return (
    <RequestMoneyFormContainer>
      <h3>Request Money</h3>
      <Form onSubmit={handleSubmit}>
        <CustomSelectDropdown>
          <CustomSelectWrapper onClick={toggleDropdown}>
            <CustomSelectAvatar
              src={
                formData.sender
                  ? avatars[
                      user.contacts.find(
                        (contact) => contact.id === formData.sender
                      ).avatarNum - 1
                    ]
                  : ""
              }
              alt="Avatar"
              showAvatar={formData.sender ? true : false}
            />
            {formData.sender ? (
              <CustomSelectContactInfo>
                <CustomSelectName>
                  {
                    user.contacts.find(
                      (contact) => contact.id === formData.sender
                    ).name
                  }
                </CustomSelectName>
                <CustomSelectMobile>
                  {
                    user.contacts.find(
                      (contact) => contact.id === formData.sender
                    ).mobile
                  }
                </CustomSelectMobile>
              </CustomSelectContactInfo>
            ) : (
              <CustomSelectName>Select Contact</CustomSelectName>
            )}
          </CustomSelectWrapper>
          <CustomSelectOptions open={isDropdownOpen}>
            {user.contacts.map((contact) => (
              <CustomSelectOption
                key={contact.id}
                onClick={() => selectContact(contact.id)}
              >
                {contact.name}
              </CustomSelectOption>
            ))}
          </CustomSelectOptions>
        </CustomSelectDropdown>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
        />
        <TextArea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message (optional)"
        />
        <ButtonsWrapper>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <ReceiveButton type="submit">Receive Money</ReceiveButton>
        </ButtonsWrapper>
      </Form>
    </RequestMoneyFormContainer>
  );
};
