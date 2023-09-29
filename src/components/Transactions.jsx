
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { adminTransactionsData, userTransactionsData } from '../redux/userTransactions/action'
import { Button } from './Buttons'

export const Transactions = () => {
  const [limit] = useState(6)
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const dispatch = useDispatch()
  const {usersTransactions,adminTransactions} = useSelector((store)=>{
    return {
      usersTransactions : store.userTransactionsReducer.usersTransactions,
      adminTransactions : store.userTransactionsReducer.adminTransactions,
    }
  },shallowEqual)

  const filteredTransactions = adminTransactions.filter((el)=>{
    if(usersTransactions.includes(el.id))
    return el;
  } )
  
  useEffect(()=>{
    dispatch(adminTransactionsData)
    dispatch(userTransactionsData)
  },[])

  const totalPages = Math.ceil(filteredTransactions.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  let currentTransactions = filteredTransactions.slice(startIndex, endIndex);

   const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <TRANSACTIONS>
      <h2>Users Transactions</h2>
      <Button>{"Sort in Asc"}</Button>
      <Button>{"Sort in Desc"}</Button>
      {
        currentTransactions?.map((item)=>{
          return <div className='user-transactions-data' key={item.id}>
            <p>Id: {item.id}</p>
            <p>From: {item.from}</p>
            <p>Payment: {`${Math.abs(+item.amount)}`}</p>
            <p>To: {item.to}</p>
            <p>Message: {item.message}</p>
            <p>
              Date: {item.date.split("T")[0]} at {item.date.split("T")[1]}
            </p>
          </div>
        })
      }
      {totalPages > 1 && (
  <div className="pagination">
    {Array.from({ length: totalPages }).map((_, index) => (
      <Button
        key={index}
        onClick={() => handlePageClick(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
      >
        {index + 1}
      </Button>
    ))}
  </div>
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