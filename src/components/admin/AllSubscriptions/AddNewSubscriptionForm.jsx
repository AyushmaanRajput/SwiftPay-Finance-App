import { useState } from "react";
import { ButtonSmall } from "../../Buttons";
import styled from "styled-components";
import { SubscriptionsInput } from "./SubscriptionsInput";

export const AddNewSubscriptionForm = ({addNewSubscription, editState, setEditState, setNewState}) => {
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
        <div>
          <H3>Enter New Subscription Data</H3>
        </div>

        <SubscriptionsInput
          subscriptionData={subscriptionData}
          handleChange={handleChange}
          editState={editState}
          setEditState={setEditState}
          setNewState={setNewState}
        />

        <div className="subscriptionDataBtnDiv">
          <ButtonSmall
            children={"Go Back"}
            onClick={() => setNewState((prev) => !prev)}
          ></ButtonSmall>
          <ButtonSmall
            children={"Add New"}
            onClick={handleAddNewSubscription}
          />
        </div>
        {/* <ButtonSmall children={"Add New"} onClick={handleAddNew} /> */}
      </NEWDIV>
    );
  };

  const NEWDIV = styled.div`
  /* width: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    text-align: left;
    color: var(--primary-white);
  }

  input,
  select {
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .newDataDiv {
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .subscriptionDataBtnDiv {
    /* border: 1px solid wheat; */
    width: 30%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
  }
`;

const H3 = styled.h3`
  color: var(--text-paragraph);
  margin-bottom: 20px;
`;