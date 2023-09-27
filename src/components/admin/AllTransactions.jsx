import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Button } from '../Buttons'

export const AllTransactions = () => {
  const [pages,setPages] = useState(1)
  const [totalPages,setTotalPages] = useState(0)
  const [limit]= useState(10)
  const [data,setData] = useState([])
  useEffect(()=>{
    fetchData(limit,pages)
  },[limit,pages])
  const fetchData = async (limit,pages) => {
    try {
      let res = await axios.get(`https://warlike-current.onrender.com/transactions?_page=${pages}&_limit=${limit}`)
      const total = res.headers.get("X-Total-Count");
      setTotalPages(Math.ceil(total/limit));
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleClick = (page) => {
    setPages(page)
  }

  // console.log(data)
  return (
    <MAINSECTION>
      <h3 className='heading'>AllTransactions</h3>
      <br /><br />
      
      {
        data?.map((item)=>{
           return <div className='transaction-card' key={item.id}>
            <p>Id: {item.id}</p>
           <p>From: {item.from}</p>
           <p>Payment: {`${Math.abs(+item.amount)}`}</p>
           <p>To: {item.to}</p>
           <p>Message: {item.message}</p>
           <p>Date: {item.date.split("T")[0]} at {item.date.split("T")[1]}</p>
         </div>
        })
      }
      {
        totalPages>1 && new Array(totalPages).fill(0).map((el,i)=>{
          return <Button key={i} onClick={()=>handleClick(i+1)}>{i+1}</Button>
        })
      }
    </MAINSECTION>
  )
}

const MAINSECTION = styled.main`
  font-family: 'Courier New', Courier, monospace;
  color: white;
  text-align: left;

  .heading{
    text-align: center;
    color :white;
  }
  p{
    font-size: medium;
  }
  .transaction-card{
    border: 2px  solid white;
    padding:10px;
    margin-bottom: .8rem;
  }
` 
