import React from "react";
import { Modal } from "./Modal";
import { SubscriptionDetails } from "../forms/SubscriptionDetails";

export const ViewSubscriptionModal = ({
  isModalOpen,
  closeModal,
  viewSubscriptionData,
}) => {
  const customBackgroundColor = " var(--background-light)";
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      backgroundColor={customBackgroundColor}
    >
      <SubscriptionDetails
        closeModal={closeModal}
        viewSubscriptionData={viewSubscriptionData}
      />
    </Modal>
  );
};
