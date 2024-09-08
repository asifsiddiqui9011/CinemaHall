import { useContext } from "react"
import Seats from "../Seats/Seats"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import "./Description.css"
import { CinemaContext } from "../../Contex/CinemaContext"

const Description =()=>{

    const {TicketHandler,selectSeat,ticket,setTicket,setSelectedSlot,allMovies,allTheater} = useContext(CinemaContext)
   
    const {movieId} = useParams();
    const {theaterId} = useParams();
    const {slotId} = useParams();
    
    if(allMovies[0] && allTheater[0]){
        const movie = allMovies.filter((movie) => {
            return movie._id === movieId; 
          });
       
          const screen = allTheater.filter((screen) => {
            return screen._id === theaterId ; 
          });  
    
          const slots = screen.slot
          console.log(slots,"slots",screen)
        
          const selectedSlot = slots.filter((selectedSlot) => {
            return selectedSlot._id === slotId ; 
          });
    }
         
       
    
    


    let date = new Date().toISOString().slice(0, 10)
    let maxDate = new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
    console.log(date,"adaa")
    let N = selectSeat.N
    let P = selectSeat.P
    let D = selectSeat.D

    let nCount = Object.values(N).filter(value => value === true).length;
    let pCount = Object.values(P).filter(value => value === true).length
    let dCount = Object.values(D).filter(value => value === true).length

    let totalPrice = nCount*200+pCount*200+dCount*200

    useEffect(()=>{
        if(totalPrice){
            setTicket((prev)=>({...prev,totalPrice:totalPrice}))
        }
       
    },[totalPrice])
    
    
    console.log(N,"N")

    console.log(selectSeat,"selectseatdesc")
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
                            <div className="slot" key={index} onClick={()=>{setSelectedSlot(slot)}}>
                                 Slot {index+1}
                                 <span>{slot.time} {slot.start}- {slot.end}</span>
                                 <span>{screen.screenType}</span>
                            </div>
                         )
                    }
                                
                })}
                </div>
               
            </div>
            <div className="discription-container">
                <div className="billing">
                    <div>
                       <h2>{movie.movieName}</h2>
                       
                    </div>
                    <div className="ticket-desc">
                    <h4>seats Numbers</h4>
                        <div className="seatnumbers">
                       
                            { N && (
                                Object.keys(N).map((key, i) => {
                                    if (N[key]) {

                                        return (
                                            <p key={i}> N{key} &nbsp; </p>
                                        );
                                    }
                                })
                                ) }
                                { P && (
                                Object.keys(P).map((key, i) => {
                                    if (P[key]) {
                                        return (
                                            <p key={i}> P{key}&nbsp; </p>
                                        );
                                    }
                                })
                                ) }
                                { D && (
                                Object.keys(D).map((key, i) => {
                                    if (D[key]) {
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
                        
                        <button >Confirm Boking </button>
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