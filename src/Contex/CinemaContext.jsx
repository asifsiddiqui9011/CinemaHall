import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import slot from '../../data/theaterData'
export const CinemaContext = createContext(null);




 
const CinemaContextProvider = (props) => {
    
const [allTheater,setAllTheater] = useState([]) 
console.log(allTheater,"alltehater")


useEffect(()=>{

    axios.get("http://localhost:4000/api/screens")
    .then((response) => {
        setAllTheater(response.data);
    })
    .catch((error) => {
        console.error("There was an error fetching the Thater", error);
    });   
},[])

const[selectedScreen,setSelectedScreen] = useState({})


const[cityToggle,setCityToggle]= useState(false)  
const cityToggleHandler = ()=>{
    setCityToggle(!cityToggle)
}

const[slotToggle,setSlotToggle]= useState(false)  
const slotToggleHandler = ()=>{
    setSlotToggle(!slotToggle)
}
    
const[ticket,setTicket] = useState({

})

const TicketHandler = (e)=>{
    setTicket((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(ticket,"ticket")
}

const movie = slot.slot1.movie;
  const [nSeat, setNSeats] = useState(slot.slot4.n);
  const [pSeat, setPSeats] = useState(slot.slot4.p); 
  const [dSeat, setDSeats] = useState(slot.slot4.d);  
  console.log(nSeat,"ppppp") 
  const [bookedseat, setBookedSeat] = useState({ n: {}, p: {}, d: {} });
  console.log(bookedseat,"bookedseat")

  // Function to check booking
  function checkBooking(seat, targetDate) {
    const indices = []; // Array to store indices where the date is found
    let newArray = {}

    Object.keys(seat).forEach(key => {
      const seats = seat[key]; // Get the array of seats for the current key
      const dateArray = seats.map(seat => seat.date); // Collect dates

      if (dateArray.includes(targetDate)) { // Check if the targetDate is in dateArray
        indices.push(parseInt(key));
        newArray[key]= true // Add the key to the result array
      }
    });

    return newArray; // Return the array of indices where the date was found
  }

  useEffect(() => {
    // Example usage of checkBooking
    if(nSeat){
      const nSeatResult = checkBooking(nSeat, ticket.date);
      setBookedSeat(prev => ({...prev,n:{...nSeatResult}}));
      console.log(nSeatResult, "Indices with target date");

    }
    if(pSeat){
      const pSeatResult = checkBooking(pSeat, ticket.date);
      setBookedSeat(prev => ({...prev,p:{...pSeatResult}}));
      console.log(pSeatResult, "presult");

    }
    if(dSeat){
      const dSeatResult = checkBooking(dSeat, ticket.date);
      setBookedSeat(prev => ({...prev,d:{...dSeatResult}}));
      console.log(dSeatResult, "d result");
    }
    
  }, [nSeat,pSeat,dSeat,ticket]);





   const contextValue = {cityToggle,cityToggleHandler,ticket,TicketHandler,slotToggle,slotToggleHandler,allTheater,selectedScreen,setSelectedScreen,bookedseat};
    
    return (
        <CinemaContext.Provider value={contextValue}>
            {props.children}
        </CinemaContext.Provider>
    )
}

export default CinemaContextProvider;