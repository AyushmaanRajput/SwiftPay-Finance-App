
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { adminTransactionsData, userTransactionsData } from '../redux/user/userTransactions/action'
import { Button } from './Buttons'
import { QueryForm } from './forms/QueryForm'



export const Transactions = () => {
  const [limit] = useState(6)
  const [currentPage, setCurrentPage] = useState(1);
  const [queryForm,setQueryForm] = useState(false)
  let userData = JSON.parse(localStorage.getItem("loggedInUser"))
  console.log(userData)
  const dispatch = useDispatch()
  const {user,adminTransactions} = useSelector((store)=>{
    return {
      user : store.userTransactionsReducer.user,
      adminTransactions : store.userTransactionsReducer.adminTransactions,
    }
  },shallowEqual)

  const filteredTransactions = adminTransactions.filter((el)=>{
    if(user.transactions.includes(el.id))
    return el;
  } )
  
  console.log(user,filteredTransactions);
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
  
  const handleRaiseQuery = () => {
    
    setQueryForm(prev => !prev)
  }
  return (
    queryForm ? <QueryForm /> : 
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
          {
            queryForm || <Button onClick={handleRaiseQuery}>{"Raise query"}</Button>
          }
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