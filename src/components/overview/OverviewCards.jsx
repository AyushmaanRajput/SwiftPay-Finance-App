import styled from "styled-components";

export const CardSmall = ({ bg, color, accent, children }) => {
  return (
    <CARDSMALL bg={bg} color={color} accent={accent}>
      {children}
    </CARDSMALL>
  );
};

const CARDSMALL = styled.div`
  min-width: 200px;
  background: ${(props) => (props.bg ? props.bg : "var(--background-light)")};
  color: ${(props) => (props.color ? props.color : "var(--primary-white)")};
  padding: 1.25em 2em;
  border-radius: 1.75em;
  transition: all 0.2s ease-in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.accent ? props.accent : "var(--background-dark)"};
    color: ${(props) => (props.bg ? props.bg : "var(--text-paragraph)")};
  }
 
`;

export const CardLarge = ({ bg, color, accent, children }) => {
  return (
    <CARDLARGE bg={bg} color={color} accent={accent}>
      {children}
    </CARDLARGE>
  );
};

const CARDLARGE = styled.div`
  min-width: 400px;
  background: ${(props) => (props.bg ? props.bg : "var(--background-light)")};
  color: ${(props) => (props.color ? props.color : "var(--primary-white)")};
  padding: 2em;
  border-radius: 2em;
  transition: all 0.2s ease-in;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  &:hover {
    filter: brightness(101%);
  }
`;
