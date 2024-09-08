import { useContext, useEffect, useState } from "react"
import "./TheaterList.css"
import { AdminContext } from "../../Context/AdminContext"
import axios from "axios"
import TheaterDesc from "../ThaterDesc/TheaterDesc"
import { Link } from "react-router-dom"

const TheaterList = () => {

  const {allTheater,selectedTheater,handleSelectTheater} = useContext(AdminContext)

  // const[selectedTheater,setSlectedTheater] = useState({})

  
  // console.log(selectedTheater._id,"sleve")


//   const [slots,setSlots] = useState({})
// useEffect(()=>{
//   if (selectedTheater.slot){
//     setSlots(selectedTheater.slot)
//   }
//   console.log(slots,"slots")
// },[selectedTheater.slot])
  
// console.log(slots,"sloott")
  // const handleSelectTheater = (e)=>{
  //    setSlectedTheater({...e})
  // }
   
  // const[newSlot,setNewSlot] = useState({
  //   theater_id:''
  // })

  // const newSlotHandler =(e)=>{
  //   setNewSlot((prev)=>({...prev,[e.target.name]:e.target.value}))
  //   setNewSlot((prev)=>({...prev,theater_id:selectedTheater._id}))
  // }

  // const add = async (event)=>{
  //   event.preventDefault()
  //   console.log(newSlot,"newSlot")
  //   const response = await axios.post('http://localhost:4000/api/addslot', newSlot);
  //   console.log('Signup successful:', response.data.success);
  //   if(response.data.success){
  //     console.log("successfully added")
  //   }
  // }

  // const deleteSlot =async (slotId)=>{
  //   console.log(selectedTheater._id,slotId)
  //   const response = await axios.delete(`http://localhost:4000/api/deleteslot?theater_id=${selectedTheater._id}&slotId=${slotId}`);
  //   if(response.data.success){
  //     console.log("successfully deleted")
  //   }
  // }

  //{headers:{'auth-token':`${localStorage.getItem('auth-token')}`}}
  return (
    <div className="theaterlist-container">
        <div className="select-container">
            <h2 className="select-tag">Selects To see</h2>
            {allTheater.map((theater,index)=>{
                  return(
                  <Link to={`${theater._id}`} key={index}> <div className="theater-card" key={index} onClick={()=>{handleSelectTheater(theater)}}>
                    <h4>{theater.mainId}</h4>
                    <h4>{theater.name}</h4>
                    <h4>{theater.location}</h4>
                </div></Link>
                  ) 
                })} 

        </div>
        {selectedTheater._id &&(
              <TheaterDesc/>
        )}
       
      
    </div>
  )
}

export default TheaterList
