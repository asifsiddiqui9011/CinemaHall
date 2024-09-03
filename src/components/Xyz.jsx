// // import slot from "../../data/theaterData"
// // import { useState } from "react"
// // const xyz = () => {
  
// //   const movie = slot.slot1.movie
// //   const[slots,setSlots] = useState(slot.slot1.n[0])  
// //   console.log(slots,"slots",movie)
// //   const[bseat,setBSeats] = useState(slot.slot1.n)  
// //   const [bookedseat,setBookedSeat] = useState({
// //     n:{},
// //     p:{},
// //     s:{}
// //   })

// //   console.log(bookedseat,"bookkkkk")
// //   function checkBooking(bseat, targetDate) {
// //     let indices = []; // Array to store indices where the date is found

// //     // Iterate over the keys of the bseat object
// //     Object.keys(bseat).forEach(key => {
// //       const seats = bseat[key]; // Get the array of seats for the current key
// //       let dateArray = []; // Initialize an array to collect dates

// //       seats.forEach(seatnumber => {
// //         dateArray.push(seatnumber.date); // Add each date to the dateArray
// //         console.log(seatnumber.date, key); // Log date and current key
// //       });

// //       if (dateArray.includes(targetDate)) { // Check if the targetDate is in dateArray
// //         indices.push(parseInt(key)); // Add the key to the result array
// //       }
// //     });

// //     // Update the state with the indices where the date was found
// //     setBookedSeat(prev => ({
// //       ...prev,
// //       n: {
// //         ...prev.n,
// //         ...indices.reduce((acc, key) => ({ ...acc, [key]: true }), {})
// //       }
// //     }));

// //     return indices; // Return the array of indices where the date was found
// //   }

// // console.log(checkBooking(bseat,"1/09/2024"),"naaray")
    
  
  
  

// //   return (
// //     <>
// //     {/* {slots.map((data,index)=>{
// //         return(
// //         //  <div style={{height:"100vh",width:"100vw",backgroundColor:"white",color:"black"}} key={index}>
// //         //        <h1>{data.ticket}</h1>
// //         //        <h2>{movie}</h2>
// //         //   </div>
// //         )
// //     })} */}
// //     </>
// //   )
// // }

// // export default xyz
// import slot from "../../data/theaterData";
// import { useState, useEffect } from "react";

// const Xyz = () => {
//   const movie = slot.slot1.movie;
//   const [nSeat, setNSeats] = useState(slot.slot4.n);
//   const [pSeat, setPSeats] = useState(slot.slot4.p); 
//   const [dSeat, setDSeats] = useState(slot.slot4.d);  
//   console.log(nSeat,"ppppp") 
//   const [bookedseat, setBookedSeat] = useState({ n: {}, p: {}, d: {} });
//   console.log(bookedseat,"bookedseat")

//   // Function to check booking
//   function checkBooking(seat, targetDate) {
//     const indices = []; // Array to store indices where the date is found
//     let newArray = {}

//     Object.keys(seat).forEach(key => {
//       const seats = seat[key]; // Get the array of seats for the current key
//       const dateArray = seats.map(seat => seat.date); // Collect dates

//       if (dateArray.includes(targetDate)) { // Check if the targetDate is in dateArray
//         indices.push(parseInt(key));
//         newArray[key]= true // Add the key to the result array
//       }
//     });

//     return newArray; // Return the array of indices where the date was found
//   }

//   useEffect(() => {
//     // Example usage of checkBooking
//     if(nSeat){
//       const nSeatResult = checkBooking(nSeat, "8/09/2024");
//       setBookedSeat(prev => ({...prev,n:{...nSeatResult}}));
//       console.log(nSeatResult, "Indices with target date");

//     }
//     if(pSeat){
//       const pSeatResult = checkBooking(pSeat, "8/09/2024");
//       setBookedSeat(prev => ({...prev,p:{...pSeatResult}}));
//       console.log(pSeatResult, "presult");

//     }
//     if(dSeat){
//       const dSeatResult = checkBooking(dSeat, "8/09/2024");
//       setBookedSeat(prev => ({...prev,d:{...dSeatResult}}));
//       console.log(dSeatResult, "d result");
//     }
    
//   }, [nSeat,pSeat,dSeat]);

//   return (
//     <>
//       {/* Uncomment and use this part if you want to display slot details */}
//       {/* {bseat[0]?.map((data, index) => (
//         <div style={{ height: "100vh", width: "100vw", backgroundColor: "white", color: "black" }} key={index}>
//           <h1>{data.ticket}</h1>
//           <h2>{movie}</h2>
//         </div>
//       ))} */}
//     </>
//   );
// };

// export default Xyz;
