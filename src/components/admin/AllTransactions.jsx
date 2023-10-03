import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Buttons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../redux/admin/transactionsReducer/action";

export const AllTransactions = () => {
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(9);
  const dispatch = useDispatch();
  const {transactions, isLoading} = useSelector(
    (store) => {
      return {
        transactions: store.transactionsReducer.allTransactions,
        isLoading: store.transactionsReducer.isLoading,
      }
    }
  );
  // console.log(transactions)
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

  useEffect(() => {
    dispatch(getAllTransactions(pages, limit, setTotalPages));
  }, [limit, pages]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      borderRadius: "1rem",
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

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleClick = (page) => {
    setPages(page);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  };

  if(isLoading) {
    <h2>Loading....</h2>
  }

  return (
    <MAINSECTION>
      <h1 className="heading">All Transactions</h1>

      <CardGrid>
        {transactions?.map((item) => (
          <motion.div
            className="transaction-card"
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <CardContent price={Math.abs(item.amount)}>
              <div>
                <div>
                  <img
                    src={avatars[userAvatarIds[item.from_id] - 1]}
                    alt={item.from}
                  />
                  <span>{item.from}</span>
                </div>
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  className="icon"
                ></FontAwesomeIcon>
                <div>
                  <img
                    src={avatars[userAvatarIds[item.to_id] - 1]}
                    alt={item.to}
                  />
                  <span>{item.to}</span>
                </div>
              </div>
              <h4>$ {Math.abs(item.amount)}</h4>
              <h5>
                Transaction Id <span>{item.id}</span>
              </h5>
              <p>
                {item.message} on {formatDate(item.date)}
              </p>
            </CardContent>
          </motion.div>
        ))}
      </CardGrid>

      {totalPages > 1 && (
        <ButtonContainer>
          {new Array(totalPages).fill(0).map((el, i) => (
            <motion.div
              key={i}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
            >
              <Button onClick={() => handleClick(i + 1)}>{i + 1}</Button>
            </motion.div>
          ))}
        </ButtonContainer>
      )}
    </MAINSECTION>
  );
};

const MAINSECTION = styled.main`
  color: var(--primary-white);
  text-align: left;
  padding-block: 0 5rem;

  h1 {
    color: var(--primary-white);
    line-height: 1.1;
    margin-top: 1rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-block: 3rem;
`;

const CardContent = styled.div`
  background-image: var(--secondary-gradient);
  border: 2px solid var(--primary-grey);
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  > div > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  div > div > img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .icon {
    color: var(--primary-light);
    font-size: 2rem;
    margin-inline: 0.5rem;
  }
  > div > div span {
    color: var(--primary-white);
    line-height: 1.2;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  h4 {
    color: var(--primary);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
