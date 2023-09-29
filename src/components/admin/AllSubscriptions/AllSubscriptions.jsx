import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Button, ButtonSmall } from "../../Buttons";
import { SubscriptionsInput } from "./SubscriptionsInput";

export const AllSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newState, setNewState] = useState(false);

  const baseURL = `http://localhost:8080`;

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

  const deleteSubscription = (id) => {
    axios
      .delete(`${baseURL}/subscriptions/${id}`)
      .then((res) => {
        console.log(res);
        getSubscriptionsData();
        // setSubscriptions
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubscriptionsData();
  }, []);

  const handleDelete = (id) => {
    // console.log("Deleted");
    deleteSubscription(id);
  };

  const handleEdit = () => {
    console.log("Edited");
  };

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
          <ButtonSmall onClick={handleBackBtn}>Go Back</ButtonSmall>
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
              <div key={ele.id} className="subscriptions-card">
                <img src={ele.logo} className="subscriptions-card-img" alt="" />
                <div className="subscriptions-card-details-div">
                  <h5>{ele.name}</h5>
                  <h5>{ele.type}</h5>
                  <p>{ele.description}</p>
                  <p>$ {ele.amount}</p>
                </div>
                <div className="subscriptions-card-buttons-div">
                  <ButtonSmall children="Edit" onClick={handleEdit} />
                  <ButtonSmall
                    children="Delete"
                    onClick={() => {
                      handleDelete(ele.id);
                    }}
                  />
                </div>
              </div>
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

  .subscriptions-card {
    /* height: 300px; */
    /* border: 1px solid white; */
    text-align: left;
    background-color: var(--background-light);
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .subscriptions-card:hover {
    transform: scale(1.03);
  }

  .subscriptions-card-img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .subscriptions-card-details-div {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .subscriptions-card-buttons-div {
    padding: 5px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  /* display: grid; */
`;
