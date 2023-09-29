import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MySubscriptions } from "./dashboard/Subscriptions/MySubscriptions";
import { RecommendedSubscriptions } from "./dashboard/Subscriptions/RecommendedSubscriptions";
import axios from 'axios';
import { baseURL } from "../redux/store";

export const Subscriptions = () => {

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userSubscriptonsids = user.subscriptions.map((ele) => ele.subscription_id);

  const [recommendedSubscriptions, setRecommendedSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const getSubscriptions = () => {
    axios.get(`${baseURL}/subscriptions`)
    .then((res) => {
      res.data.forEach((ele) => {
        if(userSubscriptonsids.includes(ele.id)) {
          setUserSubscriptions((prev) => {
            return [...prev, ele]
          })
        }
        else {
          setRecommendedSubscriptions((prev) => {
            return [...prev, ele]
          })
        }
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getSubscriptions();
  },[])

  return (
    <DIV>
      <div id="my-subscriptions-div">
        <H4>My Subscriptions</H4>
        <MySubscriptions userSubscriptions={userSubscriptions} />
      </div>
      <div id="recommended-subscriptions-div">
        <H4>Recommended Subscriptions</H4>
        <RecommendedSubscriptions recommendedSubscriptions={recommendedSubscriptions} />
      </div>
    </DIV>
  )
};

const DIV = styled.div `

  display: flex;
  justify-content: space-evenly;
`

const H4 = styled.h4 `
  color: var(--text-paragraph);
`