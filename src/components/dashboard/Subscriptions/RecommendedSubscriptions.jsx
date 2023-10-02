import React, { useState } from "react";
import styled from "styled-components";
import { SubscriptionsCard } from "./SubscriptionsCard";
import { ButtonSmall } from "../../Buttons";
import { Modal } from "../../modals/Modal";
import { SubscriptionDetails } from "../../forms/SubscriptionDetails";

export const RecommendedSubscriptions = ({
  recommendedSubscriptions,
  openViewModal,
  setModalSubscriptionData,
  openBuyModal,
  getSubscriptions
}) => {
  const handleBuySubscription = (ele) => {
    setModalSubscriptionData(ele);
    openBuyModal();
  };

  const handleViewDetails = (ele) => {
    setModalSubscriptionData(ele);
    openViewModal();
  };

  return (
    <DIV>
      {recommendedSubscriptions &&
        recommendedSubscriptions.map((ele) => {
          return (
            <SubscriptionsCard
              key={ele.id}
              {...ele}
              children={
                <div className="recommendedSubscriptions-card-buttons-div">
                  <ButtonSmall
                    children={"Buy"}
                    onClick={() => {
                      handleBuySubscription(ele);
                    }}
                  />
                  <ButtonSmall
                    children={"View Details"}
                    onClick={() => {
                      handleViewDetails(ele);
                    }}
                  />
                </div>
              }
            />
          );
        })}
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;

  .subscriptions-card:hover {
    transform: scale(1.02);
    transition: 1sec;
    border: 1px solid var(--primary-grey);
  }
`;
