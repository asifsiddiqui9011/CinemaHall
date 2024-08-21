import "./Seats.css"
import { useState } from "react"

const Seats = () => {

    const[seats,setseats] = useState({
        N:[0,1,2,11,12,13,14,15,17,4,18,19],
        P:[0,1,2,3,4,5,6,11,12,13,40,41,42,43,44,45,48,49,50,52,53,54],
        D:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,22,23,25]
    })

    const N = seats.N.sort((a, b) => a - b);
    const P = seats.P.sort((a, b) => a - b);
    const D = seats.D.sort((a, b) => a - b);
    
function generateSeats(N, range) {
    const out = [];
    let current = 0;
  
    for (let i = 0; i <= range; i++) {
      if (!N.includes(range + 1)) {
        N.push(range + 1);
      }
      if (N[current] === i) {
        out.push(i);
        current++;
      } else {
        out.push(-1);
      }
    }
  
    return out;
  }
  
  const Normal = generateSeats(N, 20);
  const Premium = generateSeats(P, 55);
  const Delux = generateSeats(D, 32)
   
      
  return (
    <div className="seats-container">
       <div className="screen">
            <h1>______________</h1>
       </div>
       <div className="normal">
           {Normal.map((e,i)=>{

            if(`${e}`===`${i}`){
                return(
                    <div key={i} className="seat">
                       <p>{i}</p>  
                    </div>
    
                )}
             else{
                return(
                    <div key={i} className="vacant">
                       <p>{i}</p>   
                    </div>
                
                )
                 }
           })} 

        
       </div>
       <div className="premium">
       {Premium.map((e,i)=>{

        if(`${e}`===`${i}`){
            return(
                <div key={i} className="seat">
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

        if(`${e}`===`${i}`){
            return(
                <div key={i} className="seat">
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
    </div>
  )
}

export default Seats
