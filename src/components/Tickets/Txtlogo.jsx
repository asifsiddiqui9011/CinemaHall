import React from 'react'
import { IoTicketSharp } from "react-icons/io5";
import './Tktlogo.css'
import { Link } from 'react-router-dom';

const Txtlogo = () => {
  return (
    <Link to={'/tickets'}><div className='tctlogo-container'>
      <div className='tctlogo'>
        <IoTicketSharp />
        </div>
        <h1>Tickets</h1>   
    </div></Link>
    
  )
}

export default Txtlogo;
