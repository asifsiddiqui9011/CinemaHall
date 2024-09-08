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
{/*            
              <div className="theater-card">
                <h3>TH001</h3> 
                <p>Pheonix</p> 
                <p>Pune 400041</p> 
             </div>
           
             
             <div className="theater-card">
                <h3>TH001</h3> 
                <p>Pheonix</p> 
                <p>Pune 400041</p>
             </div> */}
        </div>
        {/* <div className="theater-desc-container">
          <div className="add-slot-container">
               <div className="theater-details-container">
                   <span><h3>Theater Id: </h3><p>TH001 {selectedTheater.mainId}</p></span> 
                    <span><h3>Name: </h3><p></p>Pheonix {selectedTheater.name}</span>
                    <span><h3>Capacity: </h3>100</span>
                    <span><h3>Location: </h3>Pune 400041 {selectedTheater.location}</span>
                    <span><h3>No of slots: </h3><p>4</p></span> 
                    <div><button>Edit</button> <button>Delete</button></div>
                </div>
                <div className="add-slot-div">
                  <h2>Add New Slot</h2>
                  <form onSubmit={add}>
                  <h3>Time </h3>
                    <span>Start:<input type="time" name="start"  onChange={newSlotHandler}/></span>
                    <span>End:<input type="time" name="end"  onChange={newSlotHandler}/></span>
                  <button type="submit">Add Slot</button>
                  </form>
                </div>
          </div>
             
              <div className="slots-desc-container">

               {slots[0] &&(
                       slots.map((slot,index)=>{
                        console.log(slot,"sllllll")
                              return(
                                <div className="slots-desc" key={index}>
                                <h3>Slot{index+1}{slot.start}{slot.end}</h3>
                                <h3>2D</h3>
                                <h3>Deadpool (Hin){slot.movieId}</h3>
                               
                                <button>Remove Movie</button>
                                <button>edit</button>
                                <button onClick={()=>{deleteSlot(slot._id)}}>Delete slot</button>
                            </div>
                              )
                            })
               )}
                  
                 <div className="slots-desc">
                    <h3>Slot1 9:00-12:00</h3>
                    <h3>Stree (Hin)</h3>
                    <h3>2D</h3>
                    <button>Remove Movie</button>
                    <button>edit</button>
                    <button>Delete slot</button>
                </div>
                <div className="slots-desc">
                    <h3>Slot1 9:00-12:00</h3>
                    <h3>2D</h3>
                    <h3>____Available_____</h3>                 
                    <button>Add Movie</button>
                    <button>edit</button>
                    <button>Delete slot</button>
                </div> 
              </div>
        </div> */}
        {selectedTheater._id &&(
              <TheaterDesc/>
        )}
       
      
    </div>
  )
}

export default TheaterList
