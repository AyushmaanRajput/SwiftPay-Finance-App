
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from './Buttons'
import { QueryForm } from './forms/QueryForm'
import { getAllTransactions } from '../redux/admin/transactionsReducer/action'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";


export const Transactions = () => {
  const [limit] = useState(6)
  const [currentPage, setCurrentPage] = useState(1);
  const [presentData , setPresentData] = useState(false)
  const [queryForm,setQueryForm] = useState("")
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch()
  const {allTransactions, loggedInUser} = useSelector((store)=>{
    return {
      allTransactions : store.transactionsReducer.allTransactions,
      loggedInUser: store.authReducer.loggedInUser
    }
  },shallowEqual)

  const filteredTransactions = allTransactions.filter((el)=>{
    if(loggedInUser.transactions.includes(el.id))
    return el;
  })

  const sortTransactions = (transactions) => {
    return transactions.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === 'asc') {
        return dateB - dateA;
      } else if (sortOrder === 'desc') {
        return dateA - dateB;
      } else {
        return 0;
      }
    });
  };
  const sortedTransactions = sortTransactions(filteredTransactions);

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };
  const avatars = [
    "/avatars/Asian Man.png",
    "/avatars/Black Lady.png",
    "/avatars/Black Man.png",
    "/avatars/College Student.png",
    "/avatars/Indian Man.png",
    "/avatars/Middle Eastern Lady.png",
    "/avatars/Old Man.png",
    "/avatars/Western Man.png",
    "/avatars/White Lady.png",
    "/avatars/Young Lady.png",
  ];
  const userAvatarIds = {
    1: 8,
    2: 7,
    3: 10,
    4: 3,
    5: 4,
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      borderRadius: "1rem",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(()=>{
    dispatch(getAllTransactions())
  },[])

  const handleSortInAsc = () => {
    setSortOrder('asc');
  }
  const handleSortInDesc = () => {
    setSortOrder('desc');
  }

  const totalPages = Math.ceil(sortedTransactions.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  let currentTransactions = sortedTransactions.slice(startIndex, endIndex);

   const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const timestamp = Date.now(); 
  const currentDate = new Date(timestamp);
  
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  
const formatDate = (input) => {
  var options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
var date = new Date(input).toLocaleString("en-US", options);
return date
}

  const handleRaiseQuery = (id) => {
    let userPrefilledObj = {
      user : {
        id: loggedInUser.id,
        name: loggedInUser.name,
        email : loggedInUser.email
      },
      createdDate: formattedDate,
      status : "open",
      transactionId : id,
      message : "",
      subject : "",
      priority : ""
    }
    setQueryForm(userPrefilledObj)
    setPresentData(prev => !prev)
  }

  return (
    presentData ? <QueryForm userTransactionData={queryForm} isPresentFunc={setPresentData}/> : 
    <TRANSACTIONS>
    <h2 className='heading'>Users Transactions</h2>
    <ButtonContainer>
      <motion.div
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    whileHover="hover">
    <Button onClick={handleSortInAsc}>{"Latest"}</Button>
    </motion.div>
    <motion.div
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    whileHover="hover">
    <Button onClick={handleSortInDesc}>{"Oldest"}</Button>
    </motion.div>
      
    </ButtonContainer>
    {
      currentTransactions?.map((item)=>{
        return <motion.div
        className="transaction-card"
        key={item.id}
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    whileHover="hover"
        >
          <CardContent>
          <div>
            <div>
              <img
              src={avatars[userAvatarIds[item.from_id] - 1]}
              alt={item.from}/>
              <span>{item.from}</span>
            </div>
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  className="icon"
                ></FontAwesomeIcon>
              <div>
                  <img
                    src={avatars[userAvatarIds[item.to_id] - 1]}
                    alt={item.to}
                  />
                  <span>{item.to}</span>
               </div>
          </div>
          <h4>$ {Math.abs(+item.amount)}</h4>
          <p>From: {item.from}</p>
          <p>To: {item.to}</p>
          <p>{item.message} on {formatDate(item.date)}</p>
          {
            presentData || <ButtonContainer>
              <motion.div key={item.id}
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    whileHover="hover"><Button onClick={()=>handleRaiseQuery(item.id)}>{"Raise query"}</Button></motion.div>
            </ButtonContainer>
          }
        </CardContent>
        </motion.div>
      })
    }
    {totalPages > 1 && (
<ButtonContainer>
  {Array.from({ length: totalPages }).map((_, index) => (
    <motion.div 
    key={index}
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    whileHover="hover"
    >
      <Button
      key={index}
      onClick={() => handlePageClick(index + 1)}
      className={currentPage === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </Button>
    </motion.div>
  ))}
</ButtonContainer>
)}
  </TRANSACTIONS>
  )
}

const TRANSACTIONS = styled.main`
  color:var(--primary-white);
  .user-transactions-data{
    color: white;
    border: 2px solid white;
    text-align: left;
    margin-bottom: .8rem;
  }
`
const CardContent = styled.div`
  background-image: var(--secondary-gradient);
  text-align: start;
  border: 2px solid var(--primary-grey);
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  height: 100%;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  > div > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  div > div > img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  .icon {
    color: var(--primary-light);
    font-size: 2rem;
    margin-inline: 0.5rem;
  }
  > div > div span {
    color: var(--primary-white);
    line-height: 1.2;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  h4 {
    color: var(--primary);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

