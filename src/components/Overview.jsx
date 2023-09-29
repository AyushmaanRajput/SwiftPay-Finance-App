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
import { getSubscriptions } from "../redux/user/subscriptionsReducer/action";
import { OverviewCharts } from "./overview/OverviewCharts";

export const Overview = () => {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  let userids = user.subscriptions.map((sub) => sub.subscription_id);
  let subs = useSelector((store) => store.subscriptionsReducer.subscriptions);
  let filteredSubs = subs.filter((sub) => userids.includes(sub.id));
  let leftSubs = subs.filter((sub) => !userids.includes(sub.id));

  React.useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  return (
    <OVERVIEW>
      <DETAILSCARDS>
        <h3>Stats</h3>
        <div>
          <CardSmall
            color="var(--background-light)"
            bg="var(--primary-grey)"
            accent="var(--primary-light)"
          >
            <div className="card-heading">
              <FontAwesomeIcon icon={faLandmark} />
              <span>Account Balance</span>
            </div>
            <div>
              <h4>${user.balance}</h4>
              <p>
                Highest For Last Month:{" "}
                <span>${user.monthlyIncomeExpenses[0].income}</span>
              </p>
            </div>
          </CardSmall>
          <CardSmall
            bg="var(--background-light)"
            color="var(--primary-white)"
            accent="var(--primary-light)"
          >
            <div className="card-heading">
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
              <span>SwiftCoin</span>
            </div>
            <div>
              <h4>${user.swiftCoin}</h4>
              <p>
                Per Purchase
                <span> 10% off</span>
              </p>
            </div>
          </CardSmall>
          <CardSmall
            bg="var(--background-light)"
            color="var(--primary-white)"
            accent="var(--primary-light)"
          >
            <div className="card-heading">
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Transactions</span>
            </div>
            <div>
              <p>
                <h4>{user.transactions.length} transactions completed</h4>
              </p>
              <p>
                Saved Over
                <span> $400</span> on transactions
              </p>
            </div>
          </CardSmall>
        </div>
      </DETAILSCARDS>
      <SUBSCRIPTIONSOVERVIEW>
        <CardSmall
          bg="var(--primary-light)"
          color="var(--background-light)"
          accent="var(--background-light)"
        >
          <h4>Purchases</h4>
          <div>
            {filteredSubs.length > 0 &&
              filteredSubs.map((sub) => {
                return (
                  <div className="subrow">
                    <img src={sub.logo} />
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
                leftSubs.splice(0, 3).map((sub) => {
                  return (
                    <div className="recommendedsub">
                      <div>
                        <img src={sub.logo} />
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
    "detailscards detailscards detailscards subsoverview"
    "charts charts charts subsoverview";
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
`;

const SUBSCRIPTIONSOVERVIEW = styled.div`
  grid-area: subsoverview;
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
`;
