import { useContext } from "react"
import "./TheaterSlot.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"

const TheaterSlot = () => {

    const {ticket,TicketHandler,allTheater,selectedScreen,setSelectedScreen} = useContext(CinemaContext)


    const SelectScreenHandler =(e)=>{
        setSelectedScreen(e)
        console.log(selectedScreen,"selectedSCreen")
    }

    
 
    return (
      
        <div className="choose-theater-slot">
            {allTheater 
            .filter((theater) => theater.location.toLowerCase() === ticket.city.toLowerCase())
            .map((theater,index)=>{
                return (
                    <Link to={'/seatbooking'} key={index}>   
                    <div className="theater-slot" onClick={SelectScreenHandler(theater)}>
                        <div className="theater-desc">
                           <span>{theater.name}</span>
                           <p>{theater.location}</p> 
                        </div>
                        <div className="slots-container">
                           <div className="slot">
                               {theater.slots[0]}
                               <span>9:00-12:00</span>
                               <span>{theater.screenType}</span>
                           </div>
                           <div className="slot">
                               slot{theater.slots[2]}
                               <span>1:00-4:00</span>
                               <span>2D</span>
                           </div>
                           <div className="slot">
                               slot{theater.slots[3]}
                               <span>5:00-8:00</span>
                               <span>2D</span>
                           </div>
                        </div>
                    </div>
                   </Link> 
                )
            })}
         <Link to={'/seatbooking'}>   
             <div className="theater-slot">
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
