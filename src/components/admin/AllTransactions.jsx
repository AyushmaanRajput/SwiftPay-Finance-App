import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/admin/transactionsReducer/action";

export const AllTransactions = () => {
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  const {isLoading,isError,transactions} = useSelector((store)=>{
    return {
      transactions : store.transactionsReducer.transactions,
      isLoading : store.transactionsReducer.isLoading,
      isError : store.transactionsReducer.isError,
    }
  })
  const dispatch = useDispatch()
  useEffect(() => {
    let obj = {
      limit : limit,
      pages : pages,
      funcTotalPage : setTotalPages
    }
    dispatch(fetchData(obj))
  }, [limit, pages]);
  
  const handleClick = (page) => {
    setPages(page);
  };

  console.log(transactions)
  return (
    <MAINSECTION>
      <h3 className="heading">AllTransactions</h3>
      {isLoading ? <h1>Loading...</h1> : ""}
      {isError ? <h1>Something went wrong...</h1> : ""}

      <br />
      <br />
      {transactions?.map((item) => {
        return (
          <div className="transaction-card" key={item.id}>
            <p>Id: {item.id}</p>
            <p>From: {item.from}</p>
            <p>Payment: {`${Math.abs(+item.amount)}`}</p>
            <p>To: {item.to}</p>
            <p>Message: {item.message}</p>
            <p>
              Date: {item.date.split("T")[0]} at {item.date.split("T")[1]}
            </p>
          </div>
        );
      })}
      {totalPages > 1 &&
        new Array(totalPages).fill(0).map((el, i) => {
          return (
            <Button key={i} onClick={() => handleClick(i + 1)}>
              {i + 1}
            </Button>
          );
        })}
    </MAINSECTION>
  );
};

const MAINSECTION = styled.main`
  font-family: "Courier New", Courier, monospace;
  color: white;
  text-align: left;

  .heading {
    text-align: center;
    color: white;
  }
  p {
    font-size: medium;
  }
  .transaction-card {
    border: 2px solid white;
    padding: 10px;
    margin-bottom: 0.8rem;
  }
`;
