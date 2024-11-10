import { useContext, useState } from "react"
import Seats from "../Seats/Seats"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

import "./Description.css"
import { CinemaContext } from "../../Contex/CinemaContext"

const Description =()=>{

    const {ticket,getAllTicket,TicketHandler,selectSeat,handlebooking,setTicket,allMovies,allTheater,booking,checkBooking,} = useContext(CinemaContext)
   
    const {movieId} = useParams();
    const {theaterId} = useParams();
    const {slotId} = useParams();
    
    

    const movie = allMovies.find((e)=> e._id === movieId);
        // console.log(movie,"movie")
        if (!movie) {
            return <div style={{color:"white"}}>Loading ovie....................</div>;
        }
    const theater = allTheater.find((e)=> e._id === theaterId);
    // console.log(theater,"Thater")
    if (!theater) {
        return <div style={{color:"white"}}>Loading Theater....................</div>;
    }

    let slots = theater.slot

    // let set = {slot}
    
    // if (slotId){
    //     console.log(checkBooking(seats,ticket.date))
    // }
    // console.log(checkBooking)
  
         
       
    
    


    let date = new Date().toISOString().slice(0, 10)
    let maxDate = new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    // console.log(date,"adaa")
    let N = selectSeat.N
    let P = selectSeat.P
    let D = selectSeat.D

    let nCount = Object.values(N).filter(value => value === true).length;
    let pCount = Object.values(P).filter(value => value === true).length
    let dCount = Object.values(D).filter(value => value === true).length

    let totalPrice = nCount*200+pCount*200+dCount*200
    const seats = [];
    
    console.log(seats, "seats");

    useEffect(()=>{
        if(totalPrice){
            setTicket((prev)=>({...prev,totalPrice:totalPrice}))
        }
        if(seats){
            setTicket((prev)=>({...prev,seats:seats}))
            setTicket((prev)=>({...prev,total_seats_booked:seats.length}))
        }
       
       
    },[totalPrice])
    


    // console.log(selectSeat,"selectseatdesc")
    const bookTicket = async ()=>{
        try {
          const response = await axios.post(`http://localhost:4000/api/bookTicket/${movieId}/${theaterId}/${slotId}`,booking
            ,{ headers: { 'auth-token': `${localStorage.getItem('auth-token')}` }}
          );
          console.log(" Ticket Booked successfully", response.data);
          alert("Ticket Booked Successfully")
          getAllTicket();
          window.location.replace("/");

        } catch (error) {
          console.error("Error booking Ticket", error.response?.data || error.message);
          alert("booking failed")
        }
      }
//issueuss
      useEffect(()=>{
        if(booking.ticket){
          console.log(booking,"book")
          bookTicket()
        }
      },[booking.ticket])
    return(
        <div className="main-description">
            <div className="timing-bar">
                <div className="timebar-dates-container">
                    Dates: 
                   <span>
                     <label for="date">Select a date:</label>
                    <input type="date" id="date" name="date" defaultValue={date}  min={date} max={maxDate} onChange={TicketHandler}/>
                   </span>
                  
                </div>
                <div className="timebar-slots-container">
                {slots.map((slot,index)=>{
                    if(slot.movieId == movieId){
                        return(
                         <Link key={index} to={`/description/${movieId}/${theaterId}/seatbooking/${slot._id}`}>   <div className="slot"   id={slot._id === slotId?"selectedslot":''} >
                                 Slot {index+1}
                                 <span>{slot.time} {slot.start}- {slot.end}</span>
                                 <span>{screen.screenType}</span>
                            </div>
                        </Link>
                         )
                    }
                                
                })}
                </div>
               
            </div>
            <div className="discription-container">
                <div className="billing" style={{backgroundImage:`url(${movie.imageMainUrl})`,WebkitBackgroundSize:"cover"}}>
                    <div>
                       <h2>{movie.movieName}</h2>
                       
                    </div>
                    <div className="ticket-desc">
                    <h4>seats Numbers</h4>
                        <div className="seatnumbers">
                       
                            { N && (
                                Object.keys(N).map((key, i) => {
                                    if (N[key]) {
                                        seats.push(`N${key}`)
                                        return (
                                            <p key={i}> N{key} &nbsp; </p>
                                        );
                                    }
                                })
                                ) }
                                { P && (
                                Object.keys(P).map((key, i) => {
                                    if (P[key]) {
                                        seats.push(`P${key}`)
                                        return (
                                            <p key={i}> P{key}&nbsp; </p>
                                        );
                                    }
                                })
                                ) }
                                { D && (
                                Object.keys(D).map((key, i) => {
                                    if (D[key]) {
                                        seats.push(`D${key}`)
                                        return (
                                            <p key={i}> D{key}&nbsp; </p>
                                        );
                                    }
                                })
                                ) }
                                </div>
                            <div className="table-container">
                            <table >
                                <caption>seats</caption>
                                <thead>
                                    <tr>
                                        <th>srNo</th>
                                        <th>seats</th>
                                        <th>count</th>
                                        <th>price</th>
                                        <th>total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>N</td>
                                        <td>{nCount}</td>
                                        <td>200</td>
                                        <td>{nCount*200}</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>P</td>
                                        <td>{pCount}</td>
                                        <td>200</td>
                                        <td>{pCount*200}</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>D</td>
                                        <td>{dCount}</td>
                                        <td>200</td>
                                        <td>{dCount*200}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>Total</td>
                                        <td colSpan={2}>{totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        
                        <button onClick={handlebooking} className="buyticketbtn" style={{marginLeft:"130px", marginTop:"20px"}} >Confirm Boking </button>
                    </div>
                </div>
                <div className="seat-box">
                    <Seats/>
                </div>
            </div>
        </div>
    )
}
export default Description