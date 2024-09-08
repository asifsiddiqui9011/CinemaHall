import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import slot from '../../data/theaterData'


export const CinemaContext = createContext(null);




 
const CinemaContextProvider = (props) => {
    
const [allTheater,setAllTheater] = useState([]) 
const [allMovies,setAllMovies] = useState([])
console.log(allTheater,"alltehater",allMovies)


useEffect(()=>{

    axios.get("http://localhost:4000/api/screens")
    .then((response) => {
        setAllTheater(response.data);
    })
    .catch((error) => {
        console.error("There was an error fetching the Thater", error);
    });  
    
    axios.get("http://localhost:4000/api/movies")
    .then((response) => {
        setAllMovies(response.data);
    })
    .catch((error) => {
        console.error("There was an error fetching the Thater", error);
    });  
},[])

const[selectedScreen,setSelectedScreen] = useState({})
const[selectedSlot,setSelectedSlot] = useState({})


const[cityToggle,setCityToggle]= useState(false)  


const[slotToggle,setSlotToggle]= useState(false)  
const slotToggleHandler = ()=>{
    setSlotToggle(!slotToggle)
}
    
const[ticket,setTicket] = useState({
   date:new Date().toISOString().slice(0, 10)
})

const TicketHandler = (e)=>{
    setTicket((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(ticket,"ticket")
}
const cityToggleHandler = (e)=>{
  setCityToggle(!cityToggle)
if(e){
  setTicket((prev)=>({...prev,movieId:e}))
}
}

const movie = slot.slot1.movie;

  
  const [nSeat, setNSeats] = useState(selectedSlot.n);
  const [pSeat, setPSeats] = useState(selectedSlot.p); 
  const [dSeat, setDSeats] = useState(selectedSlot.d);  
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



  const [selectSeat,setSelectSeat]=useState({
    N:{},
    P:{},
    D:{}
  })

  const handleNSelect =(number)=>{
    setSelectSeat((prev)=>({...prev,N:{...prev.N,[number]:!prev.N[number]}}))
  }
  const handlePSelect =(number)=>{
    setSelectSeat((prev)=>({...prev,P:{...prev.P,[number]:!prev.P[number]}}))
  }
  const handleDSelect =(number)=>{
    setSelectSeat((prev)=>({...prev,D:{...prev.D,[number]:!prev.D[number]}}))
  }


  const[booking,setbooking] = useState({
    movieMainId:"",
    seatNumber:selectSeat,
    ticket:ticket
    
  }) 

  const handlebooking =()=>{
    setbooking((prev)=>({...prev,seatNumber:selectSeat}))
    setbooking((prev)=>({...prev,ticket:ticket}))

    console.log(booking,"booking")
  }



   const contextValue = {handlebooking,booking,selectSeat,handleDSelect,handleNSelect,handlePSelect,setTicket,cityToggle,cityToggleHandler,ticket,TicketHandler,slotToggle,slotToggleHandler,allTheater,selectedScreen,setSelectedScreen,setSelectedSlot,selectedSlot,bookedseat,allMovies};
    
    return (
        <CinemaContext.Provider value={contextValue}>
            {props.children}
        </CinemaContext.Provider>
    )
}

export default CinemaContextProvider;