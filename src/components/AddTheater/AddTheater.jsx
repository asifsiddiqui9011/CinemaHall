// import { useState } from "react";
// import "./AddTheater.css"

// const AddTheater = () => {

//   // const [slots,setSlots] =useState([]) 

//   // const handleSlots = (e)=>{
//   //   setSlots((prev)=>({...prev,[e.target.name]:e.target.value}))
//   //   console.log(slots,"slots")
//   //   if(slots.view){
//   //     setTheater((prev)=>({...prev,slots:[...prev.slots,slots]}))
//   //   } 
    
//   // }
  


//   const [seats,setSeats] =useState({
//     N:{},
//     P:{},
//     D:{}
//   }) 

//   const handleNseats = (number)=>{
//     setSeats((prev)=>({...prev,N:{...prev.N,[number]:!prev.N[number]}}))
//     console.log(seats,"seatss")

//       // Callback function executed after the state update
//       setTheater({ ...theater, seat: seats });
//   }


//   const handlePseats =(number)=>{
//     setSeats((prev)=>({...prev,P:{...prev.P,[number]:!prev.P[number]}}))
//   }

//   const handleDseats =(number)=>{
//     setSeats((prev)=>({...prev,D:{...prev.D,[number]:!prev.D[number]}}))
//   }

//   const[theater,setTheater] = useState({

//     // slots:[],
//     seat:seats
//   })

//   const changeHandler = (e)=>{
//     setTheater((prev)=>({...prev,[e.target.name]:e.target.value}))
    
//   }

  
// // console.log(slots)

// const saveTheater =(event)=>{
//   event.preventDefault()
//   console.log(theater,"theaterdetails")
// }


//   return (
//     <div className="theater-container">
//       <div>
//           <h1>Theater Add</h1>
//           <form onSubmit={saveTheater}>
//             <span>Name Of Theater: <input type="text" placeholder="Enter name of your theater" name="name" id="name" onChange={changeHandler} required /></span>
//             <span>Location: <input type="text" placeholder="Enter name of your theater" name="location" id="location" onChange={changeHandler} required/></span>
//             <span>Capacity: <input type="text" placeholder="Enter name of your theater" onChange={changeHandler} name="capacity" id="capacity" required/></span>
//             <button type="submit">Add Theater</button>
//           </form>
//       </div>
//       <div className="slots-seats-container">

//           <div className="seating-container">
//                   <div>____________Screen____________</div>
//                   <div>
//                       <div className="normal">
//                       {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
                 
//                  <input type="checkbox" key={index}   onClick={()=>{handleNseats(`${index}`)}} />

//             ))}  

                        
//                       </div>
//                       <div className="premium">
//                       {Array.from({ length: 80 }, (_, i) => i + 1).map((index) => (
                 
//                           <input type="checkbox" key={index}   onClick={()=>{handlePseats(`${index}`)}} />
               
//              ))}
                      
//                       </div>
//                       <div className="delux">
//                       {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
                 
//                            <input type="checkbox" key={index}   onClick={()=>{handleDseats(`${index}`)}} />
      
//                       ))}  

//                       </div>
//                   </div>
                    
//           </div>
//       </div>   
//     </div>
//   )
// }

// export default AddTheater

// import { useState } from "react";
// import axios from "axios";
// import "./AddTheater.css"

// const AddTheater = () => {

//   const [seats, setSeats] = useState({
//     n: {},
//     p: {},
//     d: {}
//   });

//   const [theater, setTheater] = useState({
//     seat: seats,
//     booleanArrays: {
//       n: [],
//       p: [],
//       d: []
//     }
//   });

//   const handleNseats = (number) => {
//     setSeats((prev) => ({ ...prev, n: { ...prev.n, [number]: !prev.n[number] } }));
//     setTheater((prev) => ({ 
//       ...prev, 
//       seat: { ...prev.seat, n: { ...prev.seat.n, [number]: !prev.seat.n[number] } },
//       booleanArrays: { ...prev.booleanArrays, n: [...prev.booleanArrays, !prev.booleanArrays.n[number]] }
//     }));
//   }

//   const handlePseats = (number) => {
//     setSeats((prev) => ({ ...prev, p: { ...prev.p, [number]: !prev.p[number] } }));
//     setTheater((prev) => ({
//       ...prev,
//       seat: { ...prev.seat, p: { ...prev.seat.p, [number]: !prev.seat.p[number] } },
//       booleanArrays: { ...prev.booleanArrays, p: [...prev.booleanArrays.p, !prev.booleanArrays.p[number]] }
//     }));
//   }

//   const handleDseats = (number) => {
//     setSeats((prev) => ({ ...prev, d: { ...prev.d, [number]: !prev.d[number] } }));
//     setTheater((prev) => ({
//       ...prev,
//       seat: { ...prev.seat, d: { ...prev.seat.d, [number]: !prev.seat.d[number] } },
//       booleanArrays: { ...prev.booleanArrays, d: [...prev.booleanArrays.d, !prev.booleanArrays.d[number]] }
//     }));
//   }

//   const changeHandler = (e) => {
//     setTheater((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }

//   const saveTheater = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/screens',theater,
//         {headers:{'auth-token':`${localStorage.getItem('auth-token')}`}});
//       console.log("Theater created successfully", response.data);
//     } catch (error) {
//       console.error("Error creating theater", error.response?.data || error.message);
//     }
//   }

//   return (
//     <div className="theater-container">
//       <div>
//           <h1>Add Theater</h1>
//           <form onSubmit={saveTheater}>
//             <span>Name Of Theater: <input type="text" placeholder="Enter name of your theater" name="name" id="name" onChange={changeHandler} required /></span>
//             <span>Location: <input type="text" placeholder="Enter location of your theater" name="location" id="location" onChange={changeHandler} required/></span>
//             <span>Capacity: <input type="text" placeholder="Enter capacity of your theater" onChange={changeHandler} name="capacity" id="capacity" required/></span>
//             <span>screenType:
//               <select name="screenType" id="screenType" value={theater.screenType} onChange={changeHandler}>
//                 <option value="2D">2D</option>
//                 <option value="3D">3D</option>
//               </select>
//             </span>
//             <button type="submit">Add Theater</button>
//           </form>
//       </div>
//       <div className="slots-seats-container">
//           <div className="seating-container">
//             <div>____________Screen____________</div>
//             <div>
//                 <div className="normal">
//                   {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
//                     <input type="checkbox" key={index} onClick={() => { handleNseats(index) }} />
//                   ))}
//                 </div>
//                 <div className="premium">
//                   {Array.from({ length: 80 }, (_, i) => i + 1).map((index) => (
                    
//                     <input type="checkbox" key={index} onClick={() => { handlePseats(index) }} />
                   
//                   ))}
//                 </div>
//                 <div className="delux">
//                   {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
//                     <input type="checkbox" key={index} onClick={() => { handleDseats(index) }} />
//                   ))}
//                 </div>
//             </div>
//           </div>
//       </div>   
//     </div>
//   )
// }

// export default AddTheater;


import { useState } from "react";
import axios from "axios";
import "./AddTheater.css"

const AddTheater = () => {



  const [theater, setTheater] = useState({
    booleanArrays: {
      n: [],
      p: [],
      d: []
    }
  });

  const handleNseats = (number) => {

    setTheater((prev) => ({ 
      ...prev, 
      booleanArrays: { ...prev.booleanArrays, n: [...prev.booleanArrays, !prev.booleanArrays.n[number]] }
    }));
  }

  const handlePseats = (number) => {
    setTheater((prev) => ({
      ...prev,
      booleanArrays: { ...prev.booleanArrays, p: [...prev.booleanArrays.p, !prev.booleanArrays.p[number]] }
    }));
  }

  const handleDseats = (number) => {
    setTheater((prev) => ({
      ...prev,
      booleanArrays: { ...prev.booleanArrays, d: [...prev.booleanArrays.d, !prev.booleanArrays.d[number]] }
    }));
  }

  const changeHandler = (e) => {
    setTheater((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const saveTheater = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/screens',theater,
        {headers:{'auth-token':`${localStorage.getItem('auth-token')}`}});
      console.log("Theater created successfully", response.data);
    } catch (error) {
      console.error("Error creating theater", error.response?.data || error.message);
    }
  }

  return (
    <div className="theater-container">
      <div>
          <h1>Add Theater</h1>
          <form onSubmit={saveTheater}>
            <span>Name Of Theater: <input type="text" placeholder="Enter name of your theater" name="name" id="name" onChange={changeHandler} required /></span>
            <span>Location: <input type="text" placeholder="Enter location of your theater" name="location" id="location" onChange={changeHandler} required/></span>
            <span>Capacity: <input type="text" placeholder="Enter capacity of your theater" onChange={changeHandler} name="capacity" id="capacity" required/></span>
            <span>screenType:
              <select name="screenType" id="screenType" value={theater.screenType} onChange={changeHandler}>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
            </span>
            <button type="submit">Add Theater</button>
          </form>
      </div>
      <div className="slots-seats-container">
          <div className="seating-container">
            <div>____________Screen____________</div>
            <div>
                <div className="normal">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
                    <input type="checkbox" key={index-1} onClick={() => { handleNseats(index-1) }} />
                  ))}
                </div>
                <div className="premium">
                  {Array.from({ length: 80 }, (_, i) => i + 1).map((index) => (
                    <>
                    <input type="checkbox" key={index-1} onClick={() => { handlePseats(index-1) }} />
                    </>
                  ))}
                </div>
                <div className="delux">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
                    <input type="checkbox" key={index-1} onClick={() => { handleDseats(index-1) }} />
                  ))}
                </div>
            </div>
          </div>
      </div>   
    </div>
  )
}

export default AddTheater;


