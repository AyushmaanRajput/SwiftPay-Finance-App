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
  /* background-color: var(--primary-white); */
  background-color: ${(props) =>
    props.backgroundColor || "var(--background-light)"};
  z-index: 1001;
  padding: 2rem;
  min-width:20rem;
  border-radius: 2rem;
  border:none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color:var(--primary-grey);
  transition: color 0.1s ease-in;
  &:hover{
    color:var(--primary-white);
  }
`;

export function Modal({ isOpen, onClose, backgroundColor, children }) {
  const openModal = () => {
    onClose(true);
  };

  const closeModal = () => {
    onClose(false);
  };

  return (
    <Backdrop isOpen={isOpen}>
      <ModalContainer open={isOpen} backgroundColor={backgroundColor}>
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
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // // Function to close the modal
  // const closeModal = (isOpen) => {
  //   setIsModalOpen(isOpen);
  // };
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
