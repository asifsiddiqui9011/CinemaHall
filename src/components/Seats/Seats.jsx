import "./Seats.css"
import { useState } from "react"

const Seats = () => {

    const[seats,setseats] = useState({
        N:{
          0:true,
          1:true,
          2:true,
          3:true,
          4:true,
          5:true,
          6:true,
          7:true,
          8:false,
          9:true,
        15:true
        },
        P:{
          0: true,
          1: false,
          2: true,
          3: true,
          4: false,
          5: true,
          6: true,
          7: false,
          8: true,
          9: false,
          10: true,
          11: false,
          12: true,
          13: false,
          14: true,
          15: true,
          16: false,
          17: true,
          18: false,
          19: true,
          20: false,
          21: true,
          22: true,
          23: false,
          24: true,
          25: false,
          26: true,
          27: true,
          39: true,
       },
        D:{
          0: true,
          1: false,
          2: true,
          3: true,
          4: false,
          5: true,
          6: true,
          7: false,
          8: true,
          9: false,
          10: true,
          11: false,
          12: true,
          13: false,
          14: true,
          15: true,
          16: false,
          17: true,
          18: false,
          19: true,
          20: false,
          21: true,
          22: true,
          23: false,
          24: true,
          25: false,
          26: true,
          27: true,
          28: false,
          29: true,
        }
    })
  

  const addMissingKeys = (obj, maxRange) => {
    for (let i = 1; i <= maxRange; i++) {
      if (!(i in obj)) {
        obj[i] = false;
      }
    }
    return obj;
  };


  const N = addMissingKeys(seats.N,20)
  const P = addMissingKeys(seats.P,40);
  const D = addMissingKeys(seats.D,30);

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
                return(
                    <div key={i} className="seat" onClick={()=>{handleNSelect(`${i}`)}} id={N[`${i}`]===true ?"selected" :""} >
                       <p></p>  
                    </div>
    
                )}
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
            return(
                <div key={i} className="seat" onClick={()=>{handlePSelect(`${i}`)}} id={P[`${i}`]===true ?"selected" :""}  >
                <p></p>  
                </div>

            )}
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
            return(
                <div key={i} className="seat" onClick={()=>{handleDSelect(`${i}`)}} id={D[`${i}`]===true ?"selected" :""} >
                <p></p>  
                </div>

            )}
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
