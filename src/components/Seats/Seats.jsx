import { useContext } from "react"
import "./Seats.css"
import { useState } from "react"
import { CinemaContext } from "../../Contex/CinemaContext"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { RiSofaFill } from "react-icons/ri";
import Loader from "../Loader/Loader"


const Seats = () => {
    
    const {handlebooking,booking,ticket,allTheater,selectSeat,handleDSelect,handleNSelect,handlePSelect,checkBooking}= useContext(CinemaContext)
    
     const {theaterId} = useParams();
     const {slotId} = useParams();
      
     const theater = allTheater.find((e)=> e._id === theaterId);
    //  console.log(theater,"Thater")
     if (!theater) {
         return <div style={{color:"white"}}>Loading Theater....................</div>;
     }
     
     
     const [bookedseat, setBookedSeat] = useState({ n: {}, p: {}, d: {} });
     console.log(bookedseat, "booked seat");
     
     // Function to find booked seats for a given date
     const findBookedSeats = (seats, checkDate) => {
       const newBookedSeats = { n: {}, p: {}, d: {} };
     
       // Iterate over all categories (n, p, d)
       for (const category in seats) {
        //  console.log(category, "category");
         // Iterate over each seat number in the category
         for (const seatNumber in seats[category]) {
          //  console.log(seatNumber, "seat number");
           // Check if any tickets for the seat are booked for the given date
           for (const ticket of seats[category][seatNumber]) {
             const date = ticket.date.slice(0, 10);
            //  console.log(date, "ticket date",checkDate);
             if (date === checkDate) {
               // Mark the seat as booked (true)
              //  console.log(category,":",seatNumber)
               newBookedSeats[category][seatNumber] = true;
               // No need to check further tickets for this seat
               break;
             }
           }
         }
       }
     
       // Update the state with booked seats
       setBookedSeat(newBookedSeats);
     };
     
     // Assuming selectedSlot depends on the theater and slotId
     let selectedSlot = theater.slot.find((e) => e._id === slotId);
     console.log(selectedSlot, "selectedSlot");
     
     // Make sure selectedSlot is valid before accessing its properties
     if (selectedSlot) {
       const seat = {
         n: { ...selectedSlot.n },
         p: { ...selectedSlot.p },
         d: { ...selectedSlot.d }
       };
       console.log(seat, "seatttt");
     
       // Run the effect when ticket.date, selectedSlot, or seat changes
       useEffect(() => {
         if (ticket.date && selectedSlot) {
           findBookedSeats(seat, ticket.date);
         }
       }, [ticket.date, selectedSlot]); // Add dependencies here
     }
     
  
    const[seats,setseats] = useState(theater.booleanArrays)
    
    
  const addMissingKeys = (obj, maxRange) => {
    for (let i = 0; i <= maxRange; i++) {
      if (!(i in obj)) {
        obj[i] = false;
      }
    }
    return obj;
  };

  let N;
  let P;
  let D;

  if(!seats){
    return(<Loader/>)
  }else if (seats){
   N = addMissingKeys(seats.n,39)
   P = addMissingKeys(seats.p,79);
   D = addMissingKeys(seats.d,39);
  }
  const Normal = Object.values(N);
  const Premium = Object.values(P);
  const Delux =  Object.values(D);


      
  return (
    <div className="seats-container">
       <div className="screen">
            <h1>_________________</h1>
       </div>
       <div className="normal">
           {Normal.map((value,i)=>{
      
            let N = selectSeat.N
            if(value){
                  if(!bookedseat.n[i]){
                    return(
                    <div key={i} className="seat" onClick={()=>{handleNSelect(`${i}`)}} id={N[`${i}`]===true ?"selected" :""} >
                    </div>)
                  }else{
                    return(
                      <div key={i} className="booked">  
                      </div>)
                  }
                }
             else{
                return(
                    <div key={i} className="vacant">
                       <p></p>   
                    </div>
                
                )
                 }
           })} 
    

        
       </div>
       <div className="premium">
       {Premium.map((e,i)=>{
          let P = selectSeat.P
        if(e){
          if(!bookedseat.p[i]){
            return(
            <div key={i} className="seat" onClick={()=>{handlePSelect(`${i}`)}} id={P[`${i}`]===true ?"selected" :""} >
            </div>)
          }else{
            return(
              <div key={i} className="booked">  
              </div>)
          }}
        else{
            return(
                <div key={i} className="vacant">
                {/* <RiSofaFill key={i}  fontSize={"25px"} style={{transform:'rotateX(10deg)'}}/>    */}
                </div>
            )
            }
        })} 


       </div>
       <div className="delux">
       {Delux.map((e,i)=>{
              let D = selectSeat.D
        if(e){
          if(!bookedseat.d[i]){
            return(
            <div key={i} className="seat" onClick={()=>{handleDSelect(`${i}`)}} id={D[`${i}`]===true ?"selected" :""} >
            </div>)
          }else{
            return(
              <div key={i} className="booked">  
              </div>)
          }}
        else{
            return(
                <div key={i} className="vacant">
                <p></p>   
                </div>

            )
            }
        })} 

       </div>
    </div>
  )
}

export default Seats
