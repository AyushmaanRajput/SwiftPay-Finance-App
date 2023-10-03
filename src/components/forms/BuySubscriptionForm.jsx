import React, { useEffect, useState } from "react";
import { ButtonSmall } from "../Buttons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/usersReducer/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import subscriptionEndDate from "../../functions/subscriptionEndDate";
import { useToast } from "../custom/ToastProvider";

export const BuySubscriptionForm = ({ closeModal, viewSubscriptionData }) => {
  const showToast = useToast();
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [paymentMode, setPaymentMode] = useState(true);

  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  const dispatch = useDispatch();

  let totalCost =
    billingCycle === "Monthly"
      ? viewSubscriptionData.amount
      : billingCycle === "Quarterly"
      ? viewSubscriptionData.amount * 3
      : viewSubscriptionData.amount * 12;

  totalCost = paymentMode ? Math.floor(totalCost -= totalCost * 0.1) : totalCost;
  let endDate = subscriptionEndDate(billingCycle);

  const handleBuy = () => {
    const newObj = {
      ...loggedInUser,
      balance: !paymentMode
        ? Math.floor(loggedInUser.balance - totalCost)
        : loggedInUser.balance,
      swiftCoin: paymentMode
        ? Math.floor(loggedInUser.swiftCoin - totalCost)
        : loggedInUser.swiftCoin,
      subscriptions: [
        ...loggedInUser.subscriptions,
        {
          id:
            loggedInUser.subscriptions[loggedInUser.subscriptions.length - 1]
              .id + 1,
          subscription_id: viewSubscriptionData.id,
          name: viewSubscriptionData.name,
          amount: viewSubscriptionData.amount,
          billingCycle: billingCycle,
          platform: viewSubscriptionData.platform,
          subscription_end_date: endDate,
        },
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
      <p id="buy-subscription-offer-msg">
        Pay using SwiftCoin to get an extra 10% off
        <FontAwesomeIcon style={{ marginLeft: "5px" }} icon={faGift} />
      </p>
      <div className="buy-subscription-select-radio-div">
        <div className="buy-subscription-div">
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
        </div>
        <div className="buy-subscription-div">
          <div>
            <label>Wallet</label>
            <input
              type="radio"
              checked={!paymentMode}
              name="Wallet"
              onChange={() => setPaymentMode((prev) => !prev)}
            />
          </div>
          <div>
            <label>SwiftCoin</label>
            <input
              type="radio"
              checked={paymentMode}
              name="SwiftCoin"
              onChange={() => setPaymentMode((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <h5>Total Cost: ${totalCost}</h5>
      {/* <h4>Confirm Buy</h4> */}
      <p>Confirm Purchase?</p>
      <div className="buy-subscription-btn-div">
        <ButtonSmall children={"Yes"} onClick={handleBuy} />
        <ButtonSmall
          children={"No"}
          onClick={() => {
            setBillingCycle("Monthly");
            setPaymentMode(true);
            closeModal();
          }}
        />
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
    padding: 2px;
    border-radius: 5px;
    font-size: 0.9rem;
  }
  .buy-subscription-btn-div {
    display: flex;
    gap: 20px;
    justify-content: space-evenly;
  }
  .buy-subscription-div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .buy-subscription-div > div {
    width: 100px;
    display: flex;
    justify-content: space-between;
  }
  .buy-subscription-select-radio-div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  #buy-subscription-offer-msg {
    font-size: 0.8rem;
    color: var(--primary-light);
  }
`;
