import { useContext, useEffect } from "react"
import Banner from "../../components/Banner/Banner"
import City from "../../components/BuyTickets/City"
import ComingSoon from "../../components/ComingSoon/ComingSoon"
import Interesting from "../../components/Interesting/Intresting"
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
  },[ticket])
  
  return (
    <div>
        <Banner/>
        <Recent/>
        <ComingSoon/>
        {/* <Interesting/> */}
        {/* <TheaterSlot/> */}
        {cityToggle &&(
          <div className="city-toggle-container">
             <RxCross2 onClick={cityToggleHandler} id="icon"/>
              <City/>    
          </div>
        )}
        {slotToggle &&(
          <div className="theater-toggle-container">
             <RxCross2 onClick={slotToggleHandler} id="icon"/>
             <TheaterSlot/>
          </div>
                
         )}
        
    </div>
  )
}

export default Home
