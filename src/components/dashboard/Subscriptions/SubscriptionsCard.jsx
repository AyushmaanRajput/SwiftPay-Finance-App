import React from 'react'
import styled from 'styled-components'
import { ButtonSmall } from '../../Buttons'

export const SubscriptionsCard = ({id, logo, name, type, description, amount, billing_cycle}) => {
  
  const handleCancel = () => {
    console.log("Subscription Canceled");
  }

  const handleChangePlan = () => {
    console.log("Subscription Changed Plan");
  }

  return (
    <DIV className='my-subscriptions-card'>
      <img src={logo} className="subscriptions-card-img" alt="" />
        <div className="subscriptions-card-details-div">
            <h5>{name}</h5>
            {/* <h5>{type}</h5> */}
            {/* <p>{description}</p> */}
            <p>$ {amount}</p>
        </div>
        <div className='subscriptions-card-buttons-div'>
          <ButtonSmall children={"Cancel"} onClick={handleCancel} />
          <ButtonSmall children={"Change Plan"} onClick={handleChangePlan} />
        </div>
    </DIV>
  )
}

const DIV = styled.div `
  
  /* height: 300px; */
  /* border: 1px solid white; */
  margin: 10px;
  width: 200px;
  text-align: left;
  background-color: var(--background-light);
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  .subscriptions-card:hover {
    transform: scale(1.03);
  }

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
  }

  .subscriptions-card-buttons-div {
    padding: 5px;
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    align-items: center;
  }

  .subscriptions-card-buttons-div > button {
    margin-bottom: 5px;
  }
`