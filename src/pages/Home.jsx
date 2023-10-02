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
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../components/modals/Modal";

export const Home = () => {
  const { showToast, ToastContainer } = useCustomToast();
  const dispatch = useDispatch();
  const users = useSelector((store) => store.usersReducer.users);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(getUsers(showToast))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <HOME>
      <HomeNav></HomeNav>
      <Hero></Hero>
      <Instructions></Instructions>
      <Features></Features>
      <Services></Services>
      <HomeFooter>
        <CTA></CTA>
      </HomeFooter>
      <ToastContainer></ToastContainer>
    </HOME>
  );
};

const HOME = styled.main`
  background-color: var(--primary-grey);
`;
