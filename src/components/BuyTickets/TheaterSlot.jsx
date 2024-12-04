import { useContext, useEffect } from "react"
import "./TheaterSlot.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";

const TheaterSlot = (props) => {

    const {ticket,TicketHandler,allTheater,selectedScreen,setSelectedScreen,setSelectedSlot,selectedSlot,slotToggleHandler} = useContext(CinemaContext)

    let { movieId } = useParams();
    const SelectScreenHandler =(e)=>{
        setSelectedScreen(e)
        console.log(selectedScreen,"selectedSCreen")
    }

    // const SelectSlotHandler =(e)=>{
    //     setSelectedSlot(e)
    // }
    const thtr = allTheater.filter((theater) => theater.location.toLowerCase() === ticket.city.toLowerCase() && theater.slot.some((data) => data.movieId === movieId) );
    
    
    if (thtr.length === 0) {
        return (
            <div className="Not-found-container">
                <h3>No theater found for your choosen city or movie</h3>
            </div>
        );
    } 
    
    useEffect(()=>{
        if(selectedSlot.n){
            console.log(selectedSlot,"selected Slot")
        }
    },[selectedSlot])

 
    return (

    
        <div className="choose-theater-slot" style={props.style}>
             {allTheater
                .filter((theater) => theater.location === ticket.city.toLowerCase())
                .map((theater, index) =>{ 
                   if(theater.slot.some((data) => data.movieId === movieId)){
                    
                    return (
                   
                    <div className="theater-slot" onClick={() => SelectScreenHandler(theater)} key={index}>
                        <div className="theater-desc">
                        <span>{theater.name}</span>
                        <p>{theater.location}</p>
                        </div>
                        <div className="slots-container">
                        {theater.slot && theater.slot.map((slot, i) => (
                            <Link to={`${theater._id}/seatbooking/${slot._id}` }  key={slot._id}> 
                                <div className="slot" key={i} onClick={() => setSelectedSlot(slot)}>
                                        Slot {index + 1}
                                        <span>{slot.time} {slot.start} - {slot.end}</span>
                                        <span>{theater.screenType}</span>
                                </div>   
                            </Link>
                        )
                        )}
                        </div>
                    </div>
                    
                )
                
                }})}

           
        </div>
      
  )
}

export default TheaterSlot





 {/* {allTheater 
            .filter((theater) => 
                    
                    theater.location == ticket.city.toLowerCase())
                    
            .map((theater,index)=>{
                console.log(typeof(theater.location),typeof(ticket.city.toLowerCase()),"cityyyy")
                const slots = {...theater.slot}
                console.log(slots,"slot")
                return (
                    <Link to={'/seatbooking'} key={index}>   
                    <div className="theater-slot" onClick={SelectScreenHandler(theater)}>
                        <div className="theater-desc">
                           <span>{theater.name}</span>
                           <p>{theater.location}</p> 
                        </div>
                        <div className="slots-container">
                        {slots.map((e,i)=>{
                            return(
                               <p key={i}>{e.time} {i}</p>
                            )
                        })}
                        
                            
                       
                                
                                   
                            
                                 
                        {/* </div>
                    </div>
                   </Link> 
                )
            })} */} 
         {/* <Link to={'/seatbooking'}>    */}
             {/* <div className="theater-slot">
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
             </div> */}
            {/* </Link> */}