import React from "react";
import styled from "styled-components";

export const Subscriptions = () => {
  let user=JSON.parse(localStorage.getItem('loggedInUser'));
  return <SUBSCRIPTIONS>Subscriptions</SUBSCRIPTIONS>;
};
let user;
const SUBSCRIPTIONS = styled.main`
  color:var(--primary-white);
`
