import { useContext } from "react"
import "./Seats.css"
import { useState } from "react"
import { CinemaContext } from "../../Contex/CinemaContext"
import { useEffect } from "react"


const Seats = () => {
    
    const {selectedScreen,setSelectedScreen,bookedseat}= useContext(CinemaContext)
    
   
    const[seats,setseats] = useState(selectedScreen.booleanArrays)



  const addMissingKeys = (obj, maxRange) => {
    for (let i = 1; i <= maxRange; i++) {
      if (!(i in obj)) {
        obj[i] = false;
      }
    }
    return obj;
  };


  const N = addMissingKeys(seats.n,20)
  const P = addMissingKeys(seats.p,40);
  const D = addMissingKeys(seats.d,30);

  const Normal = Object.values(N);
  const Premium = Object.values(P);
  const Delux =  Object.values(D);
   

  const [select,setSelect]=useState({
    N:{},
    P:{},
    D:{}
  })

  const handleNSelect =(number)=>{
    setSelect((prev)=>({...prev,N:{...prev.N,[number]:!prev.N[number]}}))
  }
  const handlePSelect =(number)=>{
    setSelect((prev)=>({...prev,P:{...prev.P,[number]:!prev.P[number]}}))
  }
  const handleDSelect =(number)=>{
    setSelect((prev)=>({...prev,D:{...prev.D,[number]:!prev.D[number]}}))
  }

  const[booking,setbooking] = useState({
    movieMainId:"",
    seatNumber:select
    
  }) 

  const handlebooking =()=>{
    setbooking((prev)=>({...prev,seatNumber:select}))
    console.log(booking,"booking")
  }
      
  return (
    <div className="seats-container">
       <div className="screen">
            <h1>______________</h1>
       </div>
       <div className="normal">
           {Normal.map((value,i)=>{
      
            let N = select.N
            if(value){
                  console.log(bookedseat.n[i],"nononono",i)
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
          let P = select.P
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
                <p></p>   
                </div>
    
            )
            }
        })} 


       </div>
       <div className="delux">
       {Delux.map((e,i)=>{
              let D = select.D
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
       <button onClick={handlebooking}>Book</button>
    </div>
  )
}

export default Seats
