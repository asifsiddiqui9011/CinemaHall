import { createContext, useEffect } from "react";
import { useState } from "react";


export const CinemaContext = createContext(null);




 
const CinemaContextProvider = (props) => {
    
   
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





   const contextValue = {cityToggle,cityToggleHandler,ticket,TicketHandler,slotToggle,slotToggleHandler};
    
    return (
        <CinemaContext.Provider value={contextValue}>
            {props.children}
        </CinemaContext.Provider>
    )
}

export default CinemaContextProvider;