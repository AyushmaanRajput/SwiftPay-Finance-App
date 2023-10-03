import React from "react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const LoaderImage = styled.img`
  width: 100px;
  height: 100px;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderImage src="/loader.svg" alt="Loading..." />
    </LoaderContainer>
  );
};

export default Loader;
