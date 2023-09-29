import styled from "styled-components";

export const Container = ({ children, className = "" }) => {
  return <CONTAINER className={className}>{children}</CONTAINER>;
};

const CONTAINER = styled.div`
  width: min(65rem, 100%);
  padding-inline: 1rem;
  margin-inline: auto;
`;

export const ContainerLarge = ({ children, className = "" }) => {
  return <CONTAINERLARGE className={className}>{children}</CONTAINERLARGE>;
};

const CONTAINERLARGE = styled.div`
  width: min(95rem, 100%);
  padding-inline: 1rem;
  margin-inline: auto;
`;
