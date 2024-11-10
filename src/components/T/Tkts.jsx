import './Tkts.css'
import Ticket from '../Tickets/Ticket'
import { useContext } from 'react'
import { CinemaContext } from '../../Contex/CinemaContext'
import axios from 'axios';

import React, { useEffect, useState } from 'react';

const Tkts = () => {
  
  const {allTicket} = useContext(CinemaContext)
  





  if (!allTicket.length) {
    return (
      <div className='tkt-container'>
        <h1>No tickets found</h1>
      </div>
    );
  }

  console.log(allTicket)


  return (
    <div className='tkt-container'>
       
      {allTicket.map((ticket, index) =>{ 
        if (!ticket.cancellation){
          return(
            <Ticket key={index} ticket={ticket}  />
          )
        }}
      )}
      
    </div>
  );
};

export default Tkts;

