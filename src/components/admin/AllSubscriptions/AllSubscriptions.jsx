import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import { Button, ButtonSmall } from "../../Buttons";
import { SubscriptionsInput } from "./SubscriptionsInput";
import { AdminSubscriptionsCard } from "./AdminSubscriptionsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubscriptions,
  getSubscriptions,
} from "../../../redux/admin/subscriptionsReducer/action";
import { useCustomToast } from "../../utils/useCustomToast";
import { AddNewSubscriptionForm } from "./AddNewSubscriptionForm";

export const AllSubscriptions = () => {
  const { isLoading, isError, subscriptions } = useSelector(
    (store) => store.subscriptionsReducer
  );
  const { showToast, ToastContainer } = useCustomToast();

  console.log(isLoading, isError, subscriptions);

  const [newState, setNewState] = useState(false);
  const [editState, setEditState] = useState(false);

  const dispatch = useDispatch();

  const getSubscriptionsData = () => {
    dispatch(getSubscriptions());
  };

  const addNewSubscription = (newSubsciptionData) => {
    dispatch(addSubscriptions(newSubsciptionData, showToast));
    getSubscriptionsData();
  };

  useEffect(() => {
    getSubscriptionsData();
  }, []);

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
            onClick={() => setNewState((prev) => !prev)}
          />
        </div>
      )}
      {newState && (
        <AddNewSubscriptionForm
          addNewSubscription={addNewSubscription}
          editState={editState}
          setEditState={setEditState}
          setNewState={setNewState}
        />
      )}
      {/* { editState && <EditNewSubscriptionForm />} */}
      <DIV className="all-subscriptions-container">
        {!newState &&
          subscriptions &&
          subscriptions.map((ele) => {
            return (
              <AdminSubscriptionsCard
                key={ele.id}
                {...ele}
                editState={editState}
                setEditState={setEditState}
                setNewState={setNewState}
                getSubscriptionsData={getSubscriptionsData}
              />
            );
          })}
      </DIV>
      <ToastContainer />
    </div>
  );
};

const DIV = styled.div`
  color: var(--text-paragraph);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  /* display: grid; */
`;
