import { useContext, useState } from "react"
import "./City.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import { RxCross2 } from "react-icons/rx";

const City = () => {

    const {ticket,TicketHandler,cityToggleHandler} = useContext(CinemaContext)
   
  return (
    <div className="city-toggle-container">
             <RxCross2 onClick={cityToggleHandler} id="icon"/>
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
          </div>
       
  )
}

export default City
