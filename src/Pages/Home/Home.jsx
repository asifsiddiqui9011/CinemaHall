import { useContext, useEffect,useState } from "react"
import Banner from "../../components/Banner/Banner"

import ComingSoon from "../../components/ComingSoon/ComingSoon"
import Recent from "../../components/Recent/Recent"
import "./Home.css"
import { CinemaContext } from "../../Contex/CinemaContext"

import Ticket from "../../components/Tickets/Ticket"
import Tkts from "../../components/T/Tkts"
const Home = () => {

  const {ticket,allTicket,setTicket} = useContext(CinemaContext)


  
  // useEffect(()=>{
  //   if(ticket.city){
  //     cityToggleHandler()
  //     slotToggleHandler()

  //   }
  // },[ticket.city])

  
  
  return (
    <div>
        <Banner/>
        <Tkts/>
        <Recent/>
        <ComingSoon/>
    </div>
  )
}

export default Home
