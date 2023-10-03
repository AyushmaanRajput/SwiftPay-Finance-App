import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ButtonSmallStyled = styled(motion.button)`
  background-color: var(--primary);
  padding: 0.35rem 1rem;
  color: var(--text-button);
  border-radius: 50px;
  font-weight: 500;
  letter-spacing: 0.25px;
`;

const buttonAnimation = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  whileHover: {
    scale: 1.05,
  },
  whileTap: {
    scale: 0.9,
  },
};

export const ButtonSmall = ({ children, onClick }) => {
  return (
    <ButtonSmallStyled
      onClick={onClick}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      whileTap="whileTap" // Make sure you include this line
      variants={buttonAnimation}
    >
      {children}
    </ButtonSmallStyled>
  );
};

export const Button = ({ children, onClick, bg }) => {
  return (
    <ButtonStyled
      onClick={onClick}
      bg={bg}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      whileTap="whileTap"
      variants={buttonAnimation}
    >
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled(motion.button)`
  padding: 0.75rem 2rem;
  color: ${(props) =>
    props.bg ? "var(--primary-white)" : "var(--text-button)"};
  background-color: ${(props) =>
    props.bg === "dark" ? "var(--background-dark)" : "var(--primary)"};
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.25px;
`;

export const ButtonOutline = ({ children, onClick }) => {
  return (
    <ButtonOutlineStyled
      onClick={onClick}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      whileTap="whileTap"
      variants={outlineButtonAnimation}
    >
      {children}
    </ButtonOutlineStyled>
  );
};

const outlineButtonAnimation = {
  initial: {},
  animate: {
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  whileHover: {
    backgroundColor: "var(--primary-light)",
    color: "var(--primary)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  whileTap: {
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const ButtonOutlineStyled = styled(motion.button)`
  background-color: transparent !important;
  border: 1px solid var(--primary-light);
  color: var(--primary-light);
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: var(--link);
  letter-spacing: 0.2px;
`;
