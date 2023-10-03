import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { ButtonOutline, ButtonSmall } from "../../Buttons";
import { AdminSubscriptionsCard } from "./AdminSubscriptionsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubscriptions,
  getSubscriptions,
} from "../../../redux/admin/subscriptionsReducer/action";
import { useToast} from '../../custom/ToastProvider';
import { AddNewSubscriptionForm } from "./AddNewSubscriptionForm";

export const AllSubscriptions = () => {
  const { isLoading, isError, subscriptions } = useSelector(
    (store) => store.subscriptionsReducer
  );
  const showToast=useToast();

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

  if(isLoading) {
    <h2>Loading...</h2>
  }

  return (
    <div>

      <H1>All Subscriptions</H1>
      {!newState && (
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
          }}
        >
          <ButtonOutline
            children={"Add New Subscription"}
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
    </div>
  );
};

const DIV = styled.div`
  color: var(--text-paragraph);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  /* display: grid; */
  padding:2rem 0;
  `

const H1 = styled.h1 `
  color: var(--primary-white);
  line-height: 1.1;
  text-align: left;
  margin-bottom: 1rem;
`
