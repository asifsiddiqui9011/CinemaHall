import { useContext } from "react"
import "./TheaterSlot.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"

const TheaterSlot = () => {

    const {ticket,TicketHandler} = useContext(CinemaContext)
 
    return (
      
        <div className="choose-theater-slot">
         <Link to={'/seatbooking'}>   <div className="theater-slot">
                 <div className="theater-desc">
                    <span>Pheonix</span>
                    <p>pune 400041</p> 
                 </div>
                 <div className="slots-container">
                    <div className="slot">
                        slot
                        <span>9:00-12:00</span>
                        <span>2D</span>
                    </div>
                    <div className="slot">
                        slot
                        <span>1:00-4:00</span>
                        <span>2D</span>
                    </div>
                    <div className="slot">
                        slot
                        <span>5:00-8:00</span>
                        <span>2D</span>
                    </div>
                 </div>
             </div>
            </Link>
        </div>
  )
}

export default TheaterSlot
