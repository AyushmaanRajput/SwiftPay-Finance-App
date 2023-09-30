import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.dialog`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: var(--primary-white);
  z-index: 1001;
  padding: 20px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export function Modal({ isOpen, onClose, children }) {
  const openModal = () => {
    onClose(true);
  };

  const closeModal = () => {
    onClose(false);
  };

  return (
    <Backdrop isOpen={isOpen}>
      <ModalContainer open={isOpen}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        {children}
      </ModalContainer>
    </Backdrop>
  );
}

//For reference
// import Modal
//   // State variable to manage the modal's open/close state
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Function to open the modal
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = (isOpen) => {
//     setIsModalOpen(isOpen);
//   };
// return (
//   <div>
//     <button onClick={openModal}>Open Modal</button>
//     {/* Render the Modal component */}
//     <Modal isOpen={isModalOpen} onClose={closeModal}>
//       {/* Add your content here */}
//      <Component />
//     </Modal>
//   </div>
// );
