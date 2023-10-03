import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MySubscriptions } from "./dashboard/Subscriptions/MySubscriptions";
import { RecommendedSubscriptions } from "./dashboard/Subscriptions/RecommendedSubscriptions";
import axios from "axios";
import { baseURL } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ViewSubscriptionModal } from "./modals/ViewSubscriptionModal";
import { BuySubscriptionModal } from "./modals/BuySubscriptionModal";
import { getSubscriptions } from "../redux/admin/subscriptionsReducer/action";

export const Subscriptions = () => {
  const dispatch = useDispatch();

  const subscriptions = useSelector((store) => store.subscriptionsReducer.subscriptions);
  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  const loggedInUserSubscriptonsIDs = loggedInUser.subscriptions.map(
    (ele) => ele.subscription_id || ele.id
  );

  const userSubscriptions = [];
  const recommendedSubscriptions = [];

  subscriptions.forEach((ele) => {
    if(loggedInUserSubscriptonsIDs.includes(ele.id)) {
      userSubscriptions.push(ele);        
    } else {
      recommendedSubscriptions.push(ele);
    }
  })

  const [ isViewModalOpen, setIsViewModalOpen ] = useState(false);
  const [ isBuyModalOpen, setIsBuyModalOpen ] = useState(false);
  
  const [ modalSubscriptionData, setModalSubscriptionData ] = useState({});

  const openViewModal = () => {
    setIsViewModalOpen(true);
  };

  const openBuyModal = () => {
    setIsBuyModalOpen(true);
  };
  
  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);
  
  // getAllSubscriptions();
  
  return (
    <DIV>
      <div id="my-subscriptions-div">
        <H4>My Subscriptions</H4>
        <MySubscriptions userSubscriptions={userSubscriptions} />
      </div>
      <div id="recommended-subscriptions-div">
        <H4>Recommended Subscriptions</H4>
        <RecommendedSubscriptions
          recommendedSubscriptions={recommendedSubscriptions}
          openViewModal={openViewModal}
          setModalSubscriptionData={setModalSubscriptionData}
          openBuyModal={openBuyModal}
        />
      </div>
      <ViewSubscriptionModal
        isModalOpen={isViewModalOpen}
        closeModal={() => setIsViewModalOpen(false)}
        viewSubscriptionData={modalSubscriptionData}
      />
      <BuySubscriptionModal
        isModalOpen={isBuyModalOpen}
        closeModal={() => setIsBuyModalOpen(false)}
        viewSubscriptionData={modalSubscriptionData}
        getSubscriptions={getSubscriptions}
      />
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* justify-content: space-evenly; */
  text-align: left;
  padding: 10px;
`;

const H4 = styled.h4`
  color: var(--text-paragraph);
`;
