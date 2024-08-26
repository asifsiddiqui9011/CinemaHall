import { useContext, useState } from "react"
import "./City.css"
import { CinemaContext } from "../../Contex/CinemaContext"

const City = () => {

    const {ticket,TicketHandler} = useContext(CinemaContext)
   
  return (
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
  )
}

export default City
