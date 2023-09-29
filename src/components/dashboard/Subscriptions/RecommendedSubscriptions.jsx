import React from 'react'
import styled from 'styled-components'
import { SubscriptionsCard } from './SubscriptionsCard';
import { ButtonSmall } from '../../Buttons';
import axios from 'axios';
import { baseURL } from '../../../redux/store';

export const RecommendedSubscriptions = ({recommendedSubscriptions}) => {

  const handleBuySubscription = (ele) => {
    console.log(ele);
  }
  return (
    <DIV>
      {recommendedSubscriptions && recommendedSubscriptions.map((ele) => {
        return (
          <CARDDIV key={ele.id}>
            <div className='recommendedSubscriptions-card-img-div'>
              <img src={ele.logo} className='recommendedSubscriptions-card-img' alt="" />
            </div>
            <div className='recommendedSubscriptions-card-details-div'>
              <p>{ele.name}</p>
              <p>$ {ele.amount}</p>
              <div className='recommendedSubscriptions-card-buttons-div'>
                <ButtonSmall children={"Buy"} onClick={() => {
                  handleBuySubscription(ele)
                }}/>
                <ButtonSmall children={"View Details"} />
              </div>
            </div>
          </CARDDIV>
        )
      })}
    </DIV>
    
  )
}

const DIV = styled.div `
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 100vh;
  padding: 10px;
`

const CARDDIV = styled.div `

  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  height: 150px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid #555555;

  .recommendedSubscriptions-card-img-div {
    padding: 10px;
  }
  .recommendedSubscriptions-card-img {
    border-radius: 5px;
    width: 150px;
    height: 100%;
    object-fit: cover;
  }
  .recommendedSubscriptions-card-details-div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center
  }
  .recommendedSubscriptions-card-buttons-div > button {
    margin-bottom: 5px;
  }
  p {
    color: var(--primary-white);
  }
`