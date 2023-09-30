import axios from "axios";
import React from "react";
import { ButtonSmall } from "../../Buttons";
import { baseURL } from "../../../redux/store";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteSubscription } from "../../../redux/admin/subscriptionsReducer/action";
import { useCustomToast } from "../../utils/useCustomToast";

export const AdminSubscriptionsCard = ({
  id,
  logo,
  name,
  type,
  description,
  amount,
  getSubscriptionsData,
  setEditState,
  setNewState,
}) => {

  const dispatch = useDispatch();
  const { showToast, ToastContainer } = useCustomToast();

  const handleDelete = (id) => {
    dispatch(deleteSubscription(id, showToast, getSubscriptionsData));
    // getSubscriptionsData();
  };

  const handleEdit = () => {
    // console.log("Edited");
    setEditState((prev) => !prev)
    setNewState((prev) =>!prev)
  };

  return (
    <DIV className="subscription-card">
      <img src={logo} className="subscriptions-card-img" alt="" />
      <div className="subscriptions-card-details-div">
        <h5>{name}</h5>
        <h5>{type}</h5>
        <p>{description}</p>
        <p>$ {amount}</p>
      </div>
      <div className="subscriptions-card-buttons-div">
        <ButtonSmall children="Edit" onClick={handleEdit} />
        <ButtonSmall
          children="Delete"
          onClick={() => {
            handleDelete(id);
          }}
        />
      </div>
      <ToastContainer />
    </DIV>
  );
};

const DIV = styled.div`
  /* height: 300px; */
  /* border: 1px solid white; */
  text-align: left;
  background-color: var(--background-light);
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

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
`;
