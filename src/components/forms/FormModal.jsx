import React, { useState } from "react";
import { Modal } from "../modals/Modal";
import { Formuser } from "./Formuser";
import styled from "styled-components";

export const FormModal = ({ isModalOpen, closeModal, edit, setEdit ,}) => {
  //   const [isModal, setModal] = useState(false);
  const customBackgroundColor= " var(--gradient1)";
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal} backgroundColor={customBackgroundColor}>
        <Formuser edit={edit} setEdit={setEdit} />
      </Modal>
    </>
  );
};

