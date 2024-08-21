import "./Seatscopy.css"
import { useState } from "react"

const Seats = () => {

    const[seats,setseats] = useState({
        N:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
        P:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],
        D:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,]
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
   
  const[booking,setbooking] = useState({
    
  }) 

  const handlebooking =()=>{
    setbooking((prev)=>({...prev,N:select.N}))
    console.log(booking,"booking")
  }

  const [select,setSelect]=useState({
    N:{
        0:false,
        1:false,
        2:false,
        3:false,
        4:false,
        5:false,
        6:false,
        7:false,
        8:false,
        9:false,
        10:false,
    }, 
  })

  const handleSelect =(number)=>{
    setSelect((prev)=>({...prev,N:{...prev.N,[number]:!prev.N[number]}}))
    // console.log(select,"select")
  }
  return (
    <div className="seats-container">
       <div className="screen">
            <h1>______________</h1>
       </div>
       <div className="normal">
           {Normal.map((e,i)=>{

            if(`${e}`===`${i}`){
                return(
                    <div key={i} className="seatc">
                       <p>{i}</p>  
                    </div>
    
                )}
             else{
                return(
                    <div key={i} className="vacantc">
                       <p>{i}</p>   
                    </div>
                
                )
                 }
           })} 

        
       </div>
       <div className="premium">
       {Premium.map((e,i)=>{

        if(`${e}`===`${i}`){
            let Nr = select.N
            return(
                <div key={i} className="seatc" onClick={()=>{handleSelect(`${e}`)}} id={Nr[`${e}`] &&(("selected"))} >
                <p></p>  
                </div>

            )}
        else{
            return(
                <div key={i} className="vacantc">
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
                <div key={i} className="seatc">
                <p></p>  
                </div>

            )}
        else{
            return(
                <div key={i} className="vacantc">
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
