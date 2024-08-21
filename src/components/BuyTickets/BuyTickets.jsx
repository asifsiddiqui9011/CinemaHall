import { useState } from "react"
import "./BuyTickets.css"

const BuyTickets = () => {

    const[ticket,setTicket] = useState({

    })

    const TicketHandler = (e)=>{
        setTicket((prev)=>({...prev,[e.target.name]:e.target.value}))
        console.log(ticket,"ticket")
    }
  return (
    <div className="Buy-conatiner">
        <div className="choose-city">
            <select name="city" id="city" value={ticket.city} onChange={TicketHandler}>
                <option value="">Slect City</option>
                <option value="lucknow">lucknow</option>
                <option value="mumbai">mumbai</option>
                <option value="delhi">delhi</option>
                <option value="kolkata">kolkata</option>
                <option value="chennai">chennai</option>
                <option value="banglore">banglore</option>
                <option value="manglore">manglore</option>
                <option value="goa">goa</option>
                <option value="pune">pune</option>
                <option value="hyderabad">hyderabad</option>
            </select>
        </div>
        {ticket.city &&(
        <div className="choose-theater-slot">
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
            

        </div>
        )}
    </div>
  )
}

export default BuyTickets
