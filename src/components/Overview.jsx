import React from "react";
import styled from "styled-components";
import { CardSmall } from "../components/overview/OverviewCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDollarToSlot,
  faCreditCard,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../redux/admin/subscriptionsReducer/action";
import { OverviewCharts } from "./overview/OverviewCharts";
import AccountStatus from "./overview/AccountStatus";
import Coin from "./overview/Coin";
import { AllPageFooter } from "../pages/sections/AllPageFooter";
import { motion } from "framer-motion";
import Loader from "./Loader";

export const Overview = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.authReducer);
  const user = useSelector((store) => store.authReducer.loggedInUser) || null;
  console.log(user);
  const { income, expenses } = user.monthlyIncomeExpenses[0];
  let flag = income > expenses ? "happy" : "sad";
  let userids = user.subscriptions.map((sub) => sub.subscription_id);
  let subs = useSelector((store) => store.subscriptionsReducer.subscriptions);
  let filteredSubs = subs.filter((sub) => userids.includes(sub.id));
  let leftSubs = subs.filter((sub) => !userids.includes(sub.id));

  React.useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      borderRadius: "2rem",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
  };

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <OVERVIEW>
      <DETAILSCARDS>
        <h3>Stats</h3>
        <div>
          <motion.div
            className="transaction-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <CardSmall
              color="var(--background-light)"
              bg="var(--primary-grey)"
              accent="var(--primary-light)"
            >
              <div className="card-heading">
                <FontAwesomeIcon icon={faLandmark} />
                <span>Account Balance</span>
              </div>
              <div className="card-content">
                <h4>${user.balance}</h4>
                <p>
                  Highes Last Month:{" "}
                  <span>${user.monthlyIncomeExpenses[0].income}</span>
                </p>
              </div>
            </CardSmall>
          </motion.div>
          <motion.div
            className="transaction-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <CardSmall
              bg="var(--background-light)"
              color="var(--primary-white)"
              accent="var(--primary-light)"
            >
              <div className="card-heading">
                <FontAwesomeIcon icon={faCircleDollarToSlot} />
                <span>SwiftCoin</span>
              </div>
              <div className="card-content">
                <h4>${user.swiftCoin}</h4>
                <p>
                  Per Purchase
                  <span> 10% off</span>
                </p>
              </div>
            </CardSmall>
          </motion.div>
          <motion.div
            className="transaction-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <CardSmall
              bg="var(--background-light)"
              color="var(--primary-white)"
              accent="var(--primary-light)"
            >
              <div className="card-heading">
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Transactions</span>
              </div>
              <div className="card-content">
                <p>
                  <h4>{user.transactions.length} transactions completed</h4>
                </p>
                <p>
                  Saved Over
                  <span> $400</span> on transactions
                </p>
              </div>
            </CardSmall>
          </motion.div>
        </div>
      </DETAILSCARDS>
      <ACCOUNTSTATUS>
        <motion.div
          className="transaction-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
        >
          <CardSmall
            bg="var(--background-light)"
            color="var(--primary-grey)"
            accent="var(--primary-light)"
            className="strech"
          >
            <h4>Account Status</h4>
            <AccountStatus className="hide" flag={flag} />
          </CardSmall>
        </motion.div>
      </ACCOUNTSTATUS>
      <SUBSCRIPTIONSOVERVIEW>
        <motion.div
          className="transaction-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
        >
          <CardSmall
            bg="var(--primary-light)"
            color="var(--background-light)"
            accent="var(--background-light)"
            className="subssection"
          >
            <h4>Purchases</h4>
            <div>
              {filteredSubs.length > 0 &&
                filteredSubs.map((sub) => {
                  return (
                    <div className="subrow">
                      <img src={sub.logo} alt={sub.name} />
                      <div>
                        <h6>{sub.name}</h6>
                        <p>{sub.platform}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <hr />
            <div>
              <h4>Recommended</h4>
              <div>
                {leftSubs.length > 0 &&
                  leftSubs.splice(0, 2).map((sub) => {
                    return (
                      <div className="recommendedsub">
                        <div>
                          <img src={sub.logo} alt={sub.name} />
                          <div>
                            <h5>{sub.name}</h5>
                            <h5>${sub.amount}</h5>
                          </div>
                        </div>
                        <p>{sub.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CardSmall>
        </motion.div>
      </SUBSCRIPTIONSOVERVIEW>
      <OverviewCharts></OverviewCharts>
    </OVERVIEW>
  );
};

const OVERVIEW = styled.main`
  color: var(--primary-white);
  display: grid;
  grid-template-columns: repeat(3, 1fr) min-content;
  grid-template-rows: auto;
  gap: 3rem 2rem;
  grid-template-areas:
    "detailscards detailscards detailscards account-status"
    "charts charts charts subsoverview";
  @media screen and (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem 1rem;
  }
  @media screen and (max-width: 1000px) {
    gap: 1rem;
    grid-template-areas:
      "detailscards detailscards detailscards account-status"
      "charts charts charts charts"
      "subsoverview subsoverview subsoverview subsoverview";
  }
  @media screen and (max-width:900px){
    grid-template-areas:
    "account-status account-status account-status account-status"
    "detailscards detailscards detailscards detailscards"
    "charts charts charts charts"
      "subsoverview subsoverview subsoverview subsoverview";
  }
`;

const DETAILSCARDS = styled.div`
  grid-area: detailscards;
  > h3 {
    text-align: left;
    margin-bottom: 1rem;
    transition: color 0.1s ease-in;
    &:hover {
      color: var(--primary-light);
    }
  }
  > div {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 1rem;
    > * {
      flex-grow: 1;
      height: 100%;
      &:nth-of-type(3) {
        grid-column: span 2;
      }
    }
    @media screen and (max-width: 1300px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  .card-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
  .card-heading > *:first-child {
    color: var(--primary);
    font-size: 1.5rem;
    margin-right: 1rem;
    border: 4px solid var(--primary);
    padding: 1rem;
    border-radius: 50%;
    border-top-color: transparent;
  }
  .card-heading span {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .card-content h4 {
    line-height: 1.1;
    font-size: var(--h4);
    /* color:var(--primary-white); */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0;
  }
  .card-content p span {
    color: var(--primary-light);
  }
  @media screen and (max-width: 860px) {
    .card-heading > *:first-child {
    font-size: 1rem;
    margin-right: 0.5rem;
    border: 3px solid var(--primary);
    padding: 0.75rem;
    border-top-color: transparent;
  }
  }
`;

const ACCOUNTSTATUS = styled.div`
  grid-area: account-status;
  align-self: end;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding-top: 1rem;
  h4 {
    text-align: left;
    transition: color 0.1s ease-in;
    color: var(--primary-white);
    line-height: 1.2;
    &:hover {
      color: var(--primary-light);
    }
  }
  .hide {
    overflow: hidden;
  }
  @media screen and (max-width: 1300px) {
    h4 {
      font-size: 1.2rem;
      margin: 0;
    }
  }
`;

const SUBSCRIPTIONSOVERVIEW = styled.div`
  grid-area: subsoverview;
  align-self: end;
  /* * {
    color: var(--background-dark);
  } */

  h4 {
    margin-bottom: 1rem;
  }
  hr {
    background-color: var(--background-light);
    border-color: transparent;
    margin-block: 1rem;
  }
  .subrow {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    padding-block: 0.5rem;
  }

  .subrow img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: var(--primary-white);
  }
  .subrow div {
    border-left: 1px solid var(--background-light);
    padding-left: 0.5rem;
  }
  .subrow div strong {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.85rem;
  }
  .subrow div p {
    font-size: 0.75rem;
  }
  .recommendedsub {
    display: flex;
    gap: 0.75rem;
    flex-direction: column;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--background-light);
  }
  .recommendedsub:last-of-type {
    border: none;
  }
  .recommendedsub > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
  .recommendedsub > div img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: var(--primary-white);
  }
  .recommendedsub > div div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .recommendedsub > p {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
    /* justify-content: */
    .subssection {
      display: flex;
    }
  }
`;
