import React, { useState } from "react";
import { ButtonSmall } from "../Buttons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/usersReducer/action";
import { useToast } from "../custom/ToastProvider";

export const BuySubscriptionForm = ({
  closeModal,
  viewSubscriptionData,
  getSubscriptions,
}) => {
  const showToast = useToast();
  const [billingCycle, setBillingCycle] = useState("Monthly");

  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  const dispatch = useDispatch();

  const handleBuy = () => {
    const cost =
      billingCycle === "Monthly"
        ? viewSubscriptionData.amount
        : billingCycle === "Quarterly"
        ? viewSubscriptionData.amount * 3
        : viewSubscriptionData.amount * 12;

    const newObj = {
      ...loggedInUser,
      swiftCoin: loggedInUser.swiftCoin - cost,
      subscriptions: [
        ...loggedInUser.subscriptions,
        { ...viewSubscriptionData, billing_cycle: billingCycle },
      ],
    };

    dispatch(
      updateUser(
        loggedInUser.id,
        newObj,
        showToast,
        "Subscription Purchase Successful!"
      )
    );

    closeModal();
  };

  return (
    <DIV>
      <img src={viewSubscriptionData.logo} alt="" />
      {/* <h3>{viewSubscriptionData.name}</h3> */}
      <label>Choose Billing Plan</label>
      <select
        value={billingCycle}
        onChange={(e) => {
          setBillingCycle(e.target.value);
        }}
      >
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Yearly">Yearly</option>
      </select>
      {/* <h4>Confirm Buy</h4> */}
      <p>Are you sure you want to buy this subscription?</p>
      <div className="buy-subscription-btn-div">
        <ButtonSmall children={"Yes"} onClick={handleBuy} />
        <ButtonSmall children={"No"} onClick={closeModal} />
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: var(--primary-grey);

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  select {
    padding: 5px;
    border-radius: 5px;
  }
  .buy-subscription-btn-div {
    display: flex;
    gap: 20px;
    justify-content: space-evenly;
  }
`;
