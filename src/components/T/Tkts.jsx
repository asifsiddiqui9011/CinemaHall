import './Tkts.css'
import Ticket from '../Tickets/Ticket'
import { useContext } from 'react'
import { CinemaContext } from '../../Contex/CinemaContext'


import React, { useEffect, useState } from 'react';

const Tkts = () => {
  
  const {allTicket} = useContext(CinemaContext)
  


  allTicket.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; 
  });


  if (!allTicket.length) {
    return (
      <div className='tkt-container' style={{height:"400px",color:"white"}}>
        <h1>No tickets found</h1>
      </div>
    );
  }


  console.log(allTicket)


  return (
    <>
    <h1 style={{padding:"50px",color:"white"}}>Valid Tickets</h1>
    <div className='tkt-container'>
       
       
      {allTicket.map((ticket, index) =>{ 
        if (!ticket.cancellation && new Date(ticket.date) >= new Date()) {
          return(
            <Ticket key={index} ticket={ticket}  />
            
          )
        }else if (!ticket.cancellation && new Date(ticket.date) < new Date()){
          return(

            <Ticket key={index} ticket={ticket} expired={true}  />
          )
        }
      }
      )}
      
    </div>
    </>
  );
};

export default Tkts;

