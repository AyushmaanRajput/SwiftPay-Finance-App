import React from "react";
import { HomeNav } from "./sections/HomeNav";
import { Hero } from "./sections/Hero";
import { Instructions } from "./sections/Instructions";
import { Features } from "./sections/Features";
import { Services } from "./sections/Services";
import { CTA } from "./sections/CTA";
import { HomeFooter } from "./sections/HomeFooter";
import styled from "styled-components";
import { useCustomToast } from "../components/utils/useCustomToast";
import { getUsers } from "../redux/user/usersReducer/action";
import { useDispatch } from "react-redux";
import { Modal } from "../components/modals/Modal";

export const Home = () => {
  const { showToast, ToastContainer } = useCustomToast();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  React.useEffect(() => {
    dispatch(getUsers(showToast));
  }, []);

  return (
    <HOME>
      <HomeNav></HomeNav>
      <Hero></Hero>
      <Instructions></Instructions>
      <Features></Features>
      <Services></Services>
      <CTA></CTA>
      <HomeFooter></HomeFooter>
      <ToastContainer></ToastContainer>
      <button onClick={openModal}>Open Modal</button>
      {/* Render the Modal component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Add your content here */}
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </HOME>
  );
};

const HOME = styled.main`
  background-color: var(--primary-grey);
`;
