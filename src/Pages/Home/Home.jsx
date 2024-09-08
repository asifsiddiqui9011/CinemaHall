import { useContext, useEffect } from "react"
import Banner from "../../components/Banner/Banner"
import City from "../../components/BuyTickets/City"
import ComingSoon from "../../components/ComingSoon/ComingSoon"
import Recent from "../../components/Recent/Recent"
import "./Home.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import { RxCross2 } from "react-icons/rx";
import TheaterSlot from "../../components/BuyTickets/TheaterSlot"
const Home = () => {

  const {cityToggle,cityToggleHandler,ticket,slotToggle,slotToggleHandler} = useContext(CinemaContext)

  useEffect(()=>{
    if(ticket.city){
      cityToggleHandler()
      slotToggleHandler()

    }
  },[ticket.city])
  
  return (
    <div>
        <Banner/>
        <Recent/>
        <ComingSoon/>
        {cityToggle &&(
          <div className="theater-toggle-containerr">
          <RxCross2 onClick={cityToggleHandler} id="icon"/>
              <City/> 
          </div>   
        )}
        {slotToggle &&(
          <div className="theater-toggle-containerr">
          <RxCross2 onClick={slotToggleHandler} id="icon" style={{marginRight:"-1120px"}}/>
         
             <TheaterSlot/>   
             </div>  
         )}
        
    </div>
  )
}

export default Home
