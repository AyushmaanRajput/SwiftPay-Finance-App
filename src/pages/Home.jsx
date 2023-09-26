import React from "react";
import { HomeNav } from "./sections/HomeNav";
import { Hero } from "./sections/Hero";
import { Instructions } from "./sections/Instructions";
import { Features } from "./sections/Features";
import { Services } from "./sections/Services";
import { CTA } from "./sections/CTA";
import { HomeFooter } from "./sections/HomeFooter";
import styled from "styled-components";

export const Home = () => {
  return (
    <HOME>
      <HomeNav></HomeNav>
      <Hero></Hero>
      <Instructions></Instructions>
      <Features></Features>
      <Services></Services>
      <CTA></CTA>
      <HomeFooter></HomeFooter>
    </HOME>
  );
};

const HOME = styled.main`
  background-color: var(--primary-grey);
`;
