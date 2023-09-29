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

export const Home = () => {
  const { showToast, ToastContainer } = useCustomToast();
  const dispatch = useDispatch();

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
    </HOME>
  );
};

const HOME = styled.main`
  background-color: var(--primary-grey);
`;
