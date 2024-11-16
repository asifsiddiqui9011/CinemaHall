import { lazy,Suspense, useContext, useEffect,useState } from "react"

//import ComingSoon from "../../components/ComingSoon/ComingSoon"
//import Recent from "../../components/Recent/Recent"
import "./Home.css"
import { CinemaContext } from "../../Contex/CinemaContext"

import Ticket from "../../components/Tickets/Ticket"
import Tkts from "../../components/T/Tkts"
import Loader from "../../components/Loader/Loader"


// const Recent = lazy(()=>import("../../components/Recent/Recent"))
// const Banner = lazy(()=>import("../../components/Banner/Banner"))
const Recent = lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('../../components/Recent/Recent')), 2000);
}));
const Banner = lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('../../components/Banner/Banner')), 2000);
}));
const ComingSoon = lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('../../components/ComingSoon/ComingSoon')), 2000);
}));




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
        <Suspense fallback={<Loader/>}>
          <Banner/>
        </Suspense>
        <Tkts/>
        <Suspense fallback={<Loader/>}>
        <Recent/>
        <ComingSoon/>
        </Suspense>
        
    </div>
  )
}

export default Home
