import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CardContent from './CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { supportData } from '../../redux/admin/SupportReducer/action';

export const Support = () => {
  const dispatch = useDispatch()
  const {support, isLoading} = useSelector((store)=>{
    return {
      support: store.supportReducer.support,
      isLoading: store.supportReducer.isLoading
    }
  });
  console.log(support);
  const revStore = support.reverse();
  
  useEffect(() => {
    dispatch(supportData())
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      borderRadius: '1rem',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
      transition: {
        duration: 0.2,
      },
    },
  };

  if(isLoading) {
    <h2>Loading...</h2>
  }
//console.log(data)
  return (
    <StyledSupport>
      <h1 className="h1">Support Tickets</h1>
      <SupportCards>
        {revStore.map((ticket) => (
          <motion.div
            className="support-card"
            key={ticket.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
          >
            <CardContent
              avatarSrc={avatars[userAvatarIds[ticket.user.id] - 1]}
              name={ticket.user.name}
              email={ticket.user.email}
              transactionId={ticket.transactionId}
              subject={ticket.subject}
              message={ticket.message}
              status={ticket.status}
              priority={ticket.priority}
              createdDate={formatDateTime(ticket.createdDate)}
            />
          </motion.div>
        ))}
      </SupportCards>
    </StyledSupport>
  );
};

const StyledSupport = styled.div`
   color: var(--primary-white);
  text-align: left;
  padding-block: 0 5rem;

  h1 {
    color: var(--primary-white);
    line-height: 1.1;
    margin-top: 1rem;
  }
`;

const SupportCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; 
  margin-block: 3rem;

`;

const avatars = [
  '/avatars/Asian Man.png',
  '/avatars/Black Lady.png',
  '/avatars/Black Man.png',
  '/avatars/College Student.png',
  '/avatars/Indian Man.png',
  '/avatars/Middle Eastern Lady.png',
  '/avatars/Old Man.png',
  '/avatars/Western Man.png',
  '/avatars/White Lady.png',
  '/avatars/Young Lady.png',
];

const userAvatarIds = {
  1: 8,
  2: 7,
  3: 10,
  4: 3,
  5: 4,
};

const formatDateTime = (isoDateString) => {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  var date = new Date(isoDateString).toLocaleString("en-US", options);
  return date
};
