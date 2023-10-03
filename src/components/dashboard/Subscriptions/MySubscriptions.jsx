import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SubscriptionsCard } from './SubscriptionsCard';
import { baseURL } from '../../../redux/store';
import styled from 'styled-components';


export const MySubscriptions = ({userSubscriptions}) => {

  return (
    <DIV className='my-subscriptions-container'>
      {userSubscriptions && userSubscriptions.map((ele) => {
        return (
          <SubscriptionsCard key={ele.id} {...ele} />
        )
      })}
    </DIV>
  )
}

const DIV = styled.div`

  color: var(--text-paragraph);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  /* flex-wrap: wrap; */

  .subscriptions-card:hover {
    transform: scale(1.02);
    transition: 1sec;
    border: 1px solid var(--primary-grey);
  }
`;
