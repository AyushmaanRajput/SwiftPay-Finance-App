import React, { useState } from "react";
import styled from "styled-components";

const BuySwiftCoinsFormContainer = styled.div`
  padding: 0 1rem;
  min-height: 20rem; /* Add minimum height */
  display: flex;
  flex-direction: column;
  /* align-items:center;
   */
  justify-content: center;
  h3 {
    color: var(--primary-white);
    text-align: left;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  min-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--primary-grey);
  border-radius: 0.25rem;
  background-color: transparent;
  color: var(--primary-white);
  &:focus {
    outline-color: var(--primary-light);
    border-color: transparent;
  }
`;

const TotalAmount = styled.div`
  color: var(--primary-white);
  text-align: left;
  span{
    font-weight: bold;
    color:var(--primary-light);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const BuyButton = styled.button`
  cursor: pointer;
  background-color: var(--primary) !important;
  color: var(--background-light) !important;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: var(--link);
  letter-spacing: 0.2px;
`;

const CancelButton = styled.button`
  cursor: pointer;
  background-color: transparent !important;
  border: 1px solid var(--primary-light);
  color: var(--primary-light);
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: var(--link);
  letter-spacing: 0.2px;
`;

export const BuySwiftCoinsForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    swiftCoins: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalAmount = () => {
    const swiftCoins = parseFloat(formData.swiftCoins) || 0;
    const swiftCoinPrice = 2; // $2 per Swift Coin
    const totalAmount = swiftCoins * swiftCoinPrice;
    return `$${totalAmount.toFixed(2)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary actions when buying Swift Coins
    console.log("Buying Swift Coins:", formData);
    onClose();
  };

  const handleClose = () => {
    // Clear form data when modal is closed
    setFormData({
      swiftCoins: "",
    });

    onClose();
  };

  return (
    <BuySwiftCoinsFormContainer>
      <h3>Buy Swift Coins</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="number"
          name="swiftCoins"
          value={formData.swiftCoins}
          onChange={handleInputChange}
          placeholder="Number of Coins"
          required
        />
        <TotalAmount>
          Total Amount : <span>{calculateTotalAmount()}</span>
        </TotalAmount>
        <ButtonsWrapper>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
          <BuyButton type="submit">Buy Swift Coins</BuyButton>
        </ButtonsWrapper>
      </Form>
    </BuySwiftCoinsFormContainer>
  );
};
