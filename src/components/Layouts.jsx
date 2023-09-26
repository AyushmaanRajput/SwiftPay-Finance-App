import styled from "styled-components";

export const Container = ({ children, className="" }) => {
  return <CONTAINER className={className}>{children}</CONTAINER>;
};

const CONTAINER = styled.div`
  width: min(65rem, 100%);
  padding-inline: 1rem;
  margin-inline: auto;
`;

