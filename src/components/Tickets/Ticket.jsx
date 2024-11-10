import { useContext } from "react"
import "./Ticket.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import axios from "axios"

const Ticket = ({ticket,style}) => {

  const{fetchedUserData,url} = useContext(CinemaContext)

  console.log(ticket,"tt")

  const cancelTicket = async (ticketId) => {
    try {
      const response = await axios.delete(`${url}/tickets/cancel/${ticketId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`, // Optional: for authenticated requests
        },
      });
      
      if (response.status === 200) {
        console.log(response.data.message); // Log success message
        return response.data; // Return response data if needed
      }
    } catch (error) {
      console.error("Error cancelling ticket:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "An error occurred during ticket cancellation");
    }
  };


  
  
  
  
  return (
  
     <div className="ticket-card" style={style}>
            <p>UserNAme: {fetchedUserData.name} {ticket.cancellation}</p>
            <p>MovieNAme: {ticket.movieId.movieName}</p>
            <p>Theater name: {ticket.screenId.name}</p>
            <p>Location: {ticket.screenId.location}</p>
            <p>Slot: {ticket.slotId.time} {ticket.slotId.start} {ticket.slotId.end}</p>
            <p>Date: {ticket.date}</p>
            <p><b>Total_seats_booked:</b> {ticket.total_seats_booked}</p>
            <p>Seats: {ticket.seats.join('  ')}</p>
            <p>Total:{ticket.totalPrice}</p>
            <button onClick={()=>{cancelTicket(ticket._id)}} className="cancel-tkt-btn">Cancel Ticket</button>
      </div>
 
  )
}

export default Ticket
