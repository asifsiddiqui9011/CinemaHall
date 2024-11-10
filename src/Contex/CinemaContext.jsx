import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";


export const CinemaContext = createContext(null);




 
const CinemaContextProvider = (props) => {
    
const [allTheater,setAllTheater] = useState([]) 
const [allMovies,setAllMovies] = useState([])
// const [allTicket,setAllTicket]= useState([])
// console.log(allTicket,"tickets")

// console.log(allTheater,"alltehater",allMovies)

const [fetchedUserData, setFetchedUserData] = useState(null); // Correctly initialized state
console.log(fetchedUserData,"fetchuser data")


//   const fetchUser = async ()=>{
  
//     const response =  await   fetch('http://localhost:4000/api/getuser',{
//         method:"GET",
//         headers:{
//             Accept:'applocation/form-data',
//             'auth-token':`${localStorage.getItem('auth-token')}`,
//             'Content-Type':'application/json',
//         },
//         body:JSON.stringify(),
//     })
//     .then((response)=>response.json())
//     .then((data)=>setUserData(data));
       
//     console.log(response,"ress")
//  }

//  useEffect(() => {
 
 
//     fetchUser();
  
// }, []); 
const fetchUser = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/getuser', {
      method: "GET", // Changed to GET request
      headers: {
        'Accept': 'application/json', // Correct content type
        'auth-token': `${localStorage.getItem('auth-token')}`, // Add token from localStorage
      },
    });

    const data = await response.json();
    setFetchedUserData(data); // Set the user data
    console.log(data, "fetched user data");
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
};

// Fetch user data when component mounts
useEffect(() => {
  fetchUser();
}, []);



const [allTicket, setAllTicket] = useState([]);


const getAllTicket = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/getUserTickets', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'auth-token': `${localStorage.getItem('auth-token')}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch tickets");

    const data = await response.json();
    setAllTicket(data); // Update state with ticket data
  } catch (error) {
    console.log('Error fetching user Tickets:', error);
  }
};

useEffect(() => {
  getAllTicket(); // Fetch tickets on mount
}, []);


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

    //getAllTicket();
      
    
},[])

const[selectedScreen,setSelectedScreen] = useState({})
const[selectedSlot,setSelectedSlot] = useState({})


// const[cityToggle,setCityToggle]= useState(false)  


// const[slotToggle,setSlotToggle]= useState(false)  
// const slotToggleHandler = ()=>{
//     setSlotToggle(!slotToggle)
// }
    
const[ticket,setTicket] = useState({
   date:new Date().toISOString().slice(0, 10),
   total_seats_booked:'',
   seats:''
})

const TicketHandler = (e)=>{
    setTicket((prev)=>({...prev,[e.target.name]:e.target.value}))
    // console.log(ticket,"ticket")
}


// const cityToggleHandler = (e)=>{
//   setCityToggle(!cityToggle)
// if(e){
//   setTicket((prev)=>({...prev,movieId:e}))
// }
// }

// const movie = slot.slot1.movie;

  
  const [nSeat, setNSeats] = useState(selectedSlot.n);
  const [pSeat, setPSeats] = useState(selectedSlot.p); 
  const [dSeat, setDSeats] = useState(selectedSlot.d);  
  // console.log(nSeat,"ppppp") 
  const [bookedseat, setBookedSeat] = useState({ n: {}, p: {}, d: {} });
  // console.log(bookedseat,"bookedseat")

 
  function checkBooking(seat, targetDate) {
    const indices = [];
    let newArray = {}

    Object.keys(seat).forEach(key => {
      const seats = seat[key]; 
      const dateArray = seats.map(seat => seat.date); 

      if (dateArray.includes(targetDate)) { 
        indices.push(parseInt(key));
        newArray[key]= true 
      }
    });

    return newArray; 
  }

  useEffect(() => {
   
    if(nSeat){
      const nSeatResult = checkBooking(nSeat, ticket.date);
      setBookedSeat(prev => ({...prev,n:{...nSeatResult}}));
      // console.log(nSeatResult, "Indices with target date");

    }
    if(pSeat){
      const pSeatResult = checkBooking(pSeat, ticket.date);
      setBookedSeat(prev => ({...prev,p:{...pSeatResult}}));
      // console.log(pSeatResult, "presult");

    }
    if(dSeat){
      const dSeatResult = checkBooking(dSeat, ticket.date);
      setBookedSeat(prev => ({...prev,d:{...dSeatResult}}));
      // console.log(dSeatResult, "d result");
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
    seatNumber:selectSeat,
    ticket:ticket
    
  }) 

  

  const handlebooking =  ()=>{
    setbooking((prev)=>({...prev,seatNumber:selectSeat}))
    setbooking((prev)=>({...prev,ticket:ticket}))
  }


  const [login,setLogin] = useState(true)
  const[loginToggle,setLoginToggle]= useState(false)
  const handleToggle = ()=>{
    setLoginToggle(!loginToggle)
  }

  const handleSwitch = ()=>{
    setLogin(!login)

  }
  



   const contextValue = {login,loginToggle,handleSwitch,handleToggle,allTicket,getAllTicket,fetchedUserData,fetchUser,handlebooking,booking,selectSeat,handleDSelect,handleNSelect,handlePSelect,setTicket,ticket,TicketHandler,allTheater,selectedScreen,setSelectedScreen,setSelectedSlot,selectedSlot,bookedseat,allMovies,checkBooking};
    
    return (
        <CinemaContext.Provider value={contextValue}>
            {props.children}
        </CinemaContext.Provider>
    )
}

export default CinemaContextProvider;