import React from "react";
import { Modal } from "./Modal";
import { BuySubscriptionForm } from "../forms/BuySubscriptionForm";

export const BuySubscriptionModal = ({ isModalOpen, closeModal, viewSubscriptionData, getSubscriptions }) => {
  
    const customBackgroundColor = " var(--background-light)";

    return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      backgroundColor={customBackgroundColor}
    >
      <BuySubscriptionForm
        closeModal={closeModal}
        viewSubscriptionData={viewSubscriptionData}
        getSubscriptions={getSubscriptions}
      />
    </Modal>
  );
};