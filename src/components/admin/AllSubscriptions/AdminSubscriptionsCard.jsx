import axios from "axios";
import React from "react";
import { ButtonSmall } from "../../Buttons";
import { baseURL } from "../../../redux/store";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteSubscription } from "../../../redux/admin/subscriptionsReducer/action";
import { motion } from "framer-motion";
import { useToast } from "../../custom/ToastProvider";

export const AdminSubscriptionsCard = ({
  id,
  logo,
  name,
  type,
  description,
  amount,
  getSubscriptionsData,
  setEditState,
  setNewState,
}) => {
  const dispatch = useDispatch();
  const showToast=useToast();

  const handleDelete = (id) => {
    dispatch(deleteSubscription(id, showToast, getSubscriptionsData));
    // getSubscriptionsData();
  };

  const handleEdit = () => {
    // console.log("Edited");
    setEditState((prev) => !prev);
    setNewState((prev) => !prev);
  };

  return (
    <motion.div
      key={id}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      whileHover="hover"
    >
      <DIV className="subscription-card">
        <img src={logo} className="subscriptions-card-img" alt="" />
        <div className="admin-subscriptions-div">
          <div className="subscriptions-card-details-div">
            <h5 className="admin-description-primary-white">{name}</h5>
            <h5 className="admin-description-primary-white">{type}</h5>
            <p>{description}</p>
            <p className="admin-subscription-amount">$ {amount}</p>
          </div>
          <div className="subscriptions-card-buttons-div">
            {/* <ButtonSmall children="Edit" onClick={handleEdit} /> */}
            <ButtonSmall
              children="Delete"
              onClick={() => {
                handleDelete(id);
              }}
            />
          </div>
        </div>
        <ToastContainer />
      </DIV>
    </motion.div>
  );
};

const DIV = styled.div`

  text-align: left;
  background-image: var(--secondary-gradient);
  border: 2px solid var(--primary-grey);
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);

  .subscriptions-card:hover {
    transform: scale(1.03);
  }

  .subscriptions-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .admin-subscriptions-div {
    padding: 10px;
  }

  .subscriptions-card-details-div {
    /* height: 200px; */
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .subscriptions-card-buttons-div {
    padding: 5px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }

  .admin-subscription-amount {
    color: var(--primary-light);
  }

  .admin-description-primary-white {
    color: var(--primary-white);
  }
`;

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