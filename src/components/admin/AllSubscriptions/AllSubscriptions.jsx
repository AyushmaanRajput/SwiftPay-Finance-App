import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Button, ButtonSmall } from "../../Buttons";
import { SubscriptionsInput } from "./SubscriptionsInput";
import { AdminSubscriptionsCard } from "./AdminSubscriptionsCard";
import { baseURL } from "../../../redux/store";

export const AllSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newState, setNewState] = useState(false);

  const getSubscriptionsData = () => {
    axios
      .get(`${baseURL}/subscriptions`)
      .then((res) => {
        // console.log(res.data);
        setSubscriptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewSubscription = (newSubsciptionData) => {
    axios
      .post(`${baseURL}/subscriptions`, newSubsciptionData)
      .then((res) => {
        getSubscriptionsData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubscriptionsData();
  }, []);

  const handleAddSubscription = () => {
    // console.log("Add new subscription");
    setNewState((prev) => !prev);
  };

  const AddNewSubscriptionForm = () => {
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

    const handleBackBtn = () => {
      setNewState((prev) => !prev);
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
        />

        <div className="subscriptionDataBtnDiv">
          <ButtonSmall
            children={"Go Back"}
            onClick={handleBackBtn}
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

  return (
    <div>
      {!newState && (
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
          }}
        >
          <Button
            children={"Add Subscription"}
            onClick={handleAddSubscription}
          />
        </div>
      )}
      {newState && <AddNewSubscriptionForm />}
      <DIV className="all-subscriptions-container">
        {!newState &&
          subscriptions &&
          subscriptions.map((ele) => {
            return (
              <AdminSubscriptionsCard
                key={ele.id}
                {...ele}
                getSubscriptionsData={getSubscriptionsData}
              />
            );
          })}
      </DIV>
    </div>
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

const DIV = styled.div`
  color: var(--text-paragraph);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  /* display: grid; */
`;
