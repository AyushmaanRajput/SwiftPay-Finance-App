import React, { useState } from "react";
import styled from "styled-components";
import { CardSmall } from "../components/overview/OverviewCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDollarToSlot,
  faCreditCard,
  faHandHoldingDollar,
  faLandmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../redux/admin/subscriptionsReducer/action";
import { formatAndSortData } from "../functions/transactions";
import { formatAndSortSubscriptions } from "../functions/subscriptions";
import { ButtonOutline } from "../components/Buttons";
import { Modal } from "./modals/Modal";
import { SendMoneyForm } from "./forms/SendMoneyForm";
import { RequestMoneyForm } from "./forms/RequestMoneyForm";
import { BuySwiftCoinsForm } from "./forms/BuySwiftCoinsForm";
import { getAllTransactions } from "../redux/admin/transactionsReducer/action";
import { motion } from "framer-motion"; // Import Framer Motion

const avatars = [
  "/avatars/Asian Man.png",
  "/avatars/Black Lady.png",
  "/avatars/Black Man.png",
  "/avatars/College Student.png",
  "/avatars/Indian Man.png",
  "/avatars/Middle Eastern Lady.png",
  "/avatars/Old Man.png",
  "/avatars/Western Man.png",
  "/avatars/White Lady.png",
  "/avatars/Young Lady.png",
];

const userAvatarIds = {
  1: 8,
  2: 7,
  3: 10,
  4: 3,
  5: 4,
};

export const Payments = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    useSelector((store) => store.authReducer.loggedInUser) || null
  );

  const globalSubs = useSelector(
    (store) => store.subscriptionsReducer.subscriptions
  );
  let userSubs = user.subscriptions;

  let formattedUserSubs = formatAndSortSubscriptions(userSubs, globalSubs);

  const totalTransactions = useSelector(
    (store) => store.transactionsReducer.allTransactions
  );
  let filteredTransactions = totalTransactions.filter((el) =>
    user.transactions.includes(el.id)
  );
  filteredTransactions = formatAndSortData(filteredTransactions);

  React.useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getAllTransactions());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const paymentTabsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
  };

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
      borderRadius: "2rem",
      scale: 1.01,
      // boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <>
      <PAYMENTS>
        <PAYMENTTABS>
          <motion.div
            className="payment-tabs"
            onClick={() => openModal(<SendMoneyForm onClose={closeModal} />)}
            variants={paymentTabsVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            <span>Send Money</span>
          </motion.div>
          <motion.div
            className="payment-tabs"
            onClick={() => openModal(<RequestMoneyForm onClose={closeModal} />)}
            variants={paymentTabsVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faHandHoldingDollar} />
            <span>Request Money</span>
          </motion.div>
          <motion.div
            className="payment-tabs"
            onClick={() =>
              openModal(<BuySwiftCoinsForm onClose={closeModal} />)
            }
            variants={paymentTabsVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <FontAwesomeIcon icon={faCircleDollarToSlot} />
            <span>Buy SwiftCoin</span>
          </motion.div>
        </PAYMENTTABS>
        <DETAILSCARDS>
          <div>
            <motion.div
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
                    Highest For Last Month:{" "}
                    <span>${user.monthlyIncomeExpenses[0].income}</span>
                  </p>
                </div>
              </CardSmall>
            </motion.div>
            <motion.div
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
                  <h4>{user.swiftCoin}</h4>
                  <p>
                    Per Purchase
                    <span> 10% off</span>
                  </p>
                </div>
              </CardSmall>
            </motion.div>
          </div>
        </DETAILSCARDS>

        <TRANSACTIONSSUMMARY>
          <motion.div
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
            >
              <h4>Lastest Transactions</h4>
              <div className="transactions-summary">
                {filteredTransactions.length > 0 &&
                  filteredTransactions.splice(0, 4).map((el, i) => {
                    return (
                      <div key={i} className="subrow">
                        <img
                          src={
                            el.from_id === user.id
                              ? avatars[userAvatarIds[el.to_id] - 1]
                              : avatars[userAvatarIds[el.from_id] - 1]
                          }
                        />
                        <div>
                          <h6>${el.amount}</h6>
                          <p>{el.date}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardSmall>
          </motion.div>
        </TRANSACTIONSSUMMARY>
        <hr />
        <REMAINDERS>
          <motion.div
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
              <div>
                <h4>Upcoming Recharges</h4>
                <div className="remainders-container">
                  {formattedUserSubs.length > 0 &&
                    formattedUserSubs.map((el, i) => {
                      return (
                        <div key={i} className="remainder-card">
                          <img src={el.logo} />
                          <div>
                            <h6>Expires On : {el.subscription_end_date}</h6>
                            <ButtonOutline>Recharge Now</ButtonOutline>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardSmall>
          </motion.div>
        </REMAINDERS>
        <ARTICLES>
          <motion.div
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
              <h4>Articles To Improve Your Portfolio</h4>
            </CardSmall>
          </motion.div>
        </ARTICLES>
      </PAYMENTS>
      {modalContent && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </>
  );
};

const PAYMENTS = styled.main`
  color: var(--primary-white);
  display: grid;
  grid-template-columns: repeat(3, 1fr) max-content;
  gap: 2rem;
  width: 100%;
  grid-template-areas:
    "payment-tabs payment-tabs payment-tabs  transaction-summary"
    "detailscards detailscards detailscards transaction-summary"
    "hr hr hr hr"
    "remainders articles articles articles";
  > hr {
    grid-area: hr;
    align-self: end;
    margin-block: 1rem;
    background-color: var(--primary-grey);
    border-bottom: none;
    opacity: 0.5;
  }
`;

const PAYMENTTABS = styled.div`
  grid-area: payment-tabs;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  .payment-tabs {
    background-color: var(--background-light);
    padding: 1rem 2rem;
    border-radius: 1rem;
    transition: all 0.2s ease-in;
    cursor: pointer;
    span {
      margin-left: 0.5rem;
    }
    &:hover {
      color: var(--text-heading);
      background: var(--primary-light);
    }
  }
`;

const DETAILSCARDS = styled.div`
  grid-area: detailscards;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  > h3 {
    text-align: left;
    margin-bottom: 1rem;
    transition: color 0.1s ease-in;
    &:hover {
      color: var(--primary-light);
    }
  }
  > div {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    > * {
      flex-grow: 1;
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
  }
  .card-content p span {
    color: var(--primary-light);
  }
`;

const TRANSACTIONSSUMMARY = styled.div`
  grid-area: transaction-summary;
  h3 {
    line-height: 1.1;
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
`;

const REMAINDERS = styled.div`
  grid-area: remainders;

  h4 {
    line-height: 1.1;
    margin-bottom: 2rem;
  }

  .remainders-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .remainder-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--primary-white);
    }
    > div {
      border-left: 1px solid var(--primary-grey);
      padding-left: 0.5rem;
      h6 {
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        font-weight: 300;
        letter-spacing: 1px;
      }
    }
  }
`;
const ARTICLES = styled.div`
  grid-area: articles;
`;
