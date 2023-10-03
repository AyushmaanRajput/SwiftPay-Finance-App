import React from "react";
import styled from "styled-components";
import { ButtonSmall } from "../../Buttons";
import { motion } from "framer-motion";

export const SubscriptionsCard = ({
  id,
  logo,
  name,
  type,
  description,
  amount,
  billing_cycle,
  children,
}) => {
  // const handleCancel = () => {
  //   console.log("Subscription Canceled");
  // }

  // const handleChangePlan = () => {
  //   console.log("Subscription Changed Plan");
  // }

  return (
    <motion.div
      key={id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
    >
      <CARDDIV className="subscriptions-card">
        <img src={logo} className="subscriptions-card-img" alt="" />
        <div className="subscriptions-card-details-div">
          <h5>{name}</h5>
          <h5>{type}</h5>
          {/* <p>{description}</p> */}
          <p className="subscription-card-price">$ {amount}</p>
          {!children ? <p>Billed: {billing_cycle}</p> : null}
        </div>
        <div className="subscriptions-card-buttons-div">
          {/* <ButtonSmall children={"Cancel"} onClick={handleCancel} /> */}
          {/* <ButtonSmall children={"Change Plan"} onClick={handleChangePlan} /> */}
        </div>
        {children}
      </CARDDIV>
    </motion.div>
  );
};

const CARDDIV = styled.div`
  width: 220px;
  text-align: left;
  background-image: var(--secondary-gradient);
  border: 2px solid var(--primary-grey);
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);

  .subscriptions-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .subscriptions-card-details-div {
    /* height: 200px; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    color: var(--primary-grey);
  }
  .subscriptions-card-buttons-div > button {
    margin-bottom: 5px;
  }
  .subscription-card-price {
    color: var(--primary-light);
  }

  .recommendedSubscriptions-card-buttons-div {
    display: flex;
    padding: 10px;
    justify-content: space-between;
  }
  .recommendedSubscriptions-card-buttons-div > button {
    margin-bottom: 5px;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    borderRadius: '1rem',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.01,
    boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
    transition: {
      duration: 0.2,
    },
  },
};