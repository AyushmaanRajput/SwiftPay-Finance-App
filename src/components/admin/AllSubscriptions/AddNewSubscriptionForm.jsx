import { useState } from "react";
import { ButtonOutline, ButtonSmall } from "../../Buttons";
import styled from "styled-components";
import { SubscriptionsInput } from "./SubscriptionsInput";

export const AddNewSubscriptionForm = ({
  addNewSubscription,
  editState,
  setEditState,
  setNewState,
}) => {
  const initState = {
    name: "",
    logo: "",
    type: "",
    description: "",
    amount: 0,
    platform: "",
    billing_cycle: "",
  };
  const [subscriptionData, setSubscriptionData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddNewSubscription = () => {
    console.log(subscriptionData);

    addNewSubscription(subscriptionData);
    setNewState((prev) => !prev);
  };

  return (
    <NEWDIV>
      <SubscriptionsInput
        subscriptionData={subscriptionData}
        handleChange={handleChange}
        editState={editState}
        setEditState={setEditState}
        setNewState={setNewState}
      />

      <div className="subscriptionDataBtnDiv">
        <ButtonOutline
          children={"Go Back"}
          onClick={() => setNewState((prev) => !prev)}
        ></ButtonOutline>
        <ButtonSmall children={"Add New"} onClick={handleAddNewSubscription} />
      </div>
      {/* <ButtonSmall children={"Add New"} onClick={handleAddNew} /> */}
    </NEWDIV>
  );
};

const NEWDIV = styled.div`
  /* width: 200px; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding: 3rem 0;
  max-width: 25rem;
  margin-inline: auto;

  label {
    text-align: left;
    color: var(--primary-grey);
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: var(--button);
  }

  input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--primary-grey);
    background-color: transparent;
    color: var(--primary-white);
    border-radius: 0.25rem;
    &:focus {
      outline-color: var(--primary-light);
    }
  }
  select {
    background-color: transparent;
    border: 1px solid var(--primary-grey);
    padding: 0.5rem 1rem;
    color: var(--primary-grey);
    border-radius: 0.25rem;
    option {
      background-color: var(--background-light);
    }
  }

  .newDataDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .subscriptionDataBtnDiv {
    /* border: 1px solid red; */
    width: 100%;
    /* border: 1px solid wheat; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
  }
`;

const H3 = styled.h3`
  color: var(--primary-grey);
  margin-bottom: 20px;
`;
