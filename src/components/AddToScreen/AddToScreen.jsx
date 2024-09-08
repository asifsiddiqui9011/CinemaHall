import { useContext, useState } from "react"
import "./AddToScreen.css"
import { AdminContext } from "../../Context/AdminContext"
import { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const AddToScreen = () => {

    const {allTheater,getAllScreen} = useContext(AdminContext)
    const[selectedTheater,setSlectedTheater] = useState({})
  
    const {mainId} = useParams();
    console.log(mainId,"moieid")
    const [slots,setSlots] = useState({})
    const slotsetter =()=>{
      setSlots(selectedTheater.slot)
    }

    const addToScreen = async(slotId)=>{
      const response = await axios.patch(`http://localhost:4000/api/updateMovieToSlot?movieId=${mainId}&slotId=${slotId}`);
      if(response.data.success){
        console.log("Movie successfully Added")
        getAllScreen()
        slotsetter()
      }
    }

    const deleteFromScreen = async(id)=>{
      const response = await axios.delete(`http://localhost:4000/api/deleteMovieFromSlot/${id}`);
      if(response.data.success){
        console.log("successfully deleted")
        getAllScreen()
        slotsetter()
      }

    }
   

    useEffect(()=>{
          if (selectedTheater.slot){
            slotsetter()
           
              }
    },[selectedTheater.slot])

    const handleSelectTheater = (e)=>{
        setSlectedTheater({...e})
        
      }

    

    
    
   
    
  return (
    <div className="center">
    <div className="select-container-ats">
    <h1>Chooose Theater</h1>
    {allTheater.map((theater,index)=>{
       return(
        <div className="select-card" key={index} onClick={()=>{handleSelectTheater(theater)}}>
        <h4>{theater.mainId}</h4>
        <h4>{theater.name}</h4>
        <h4>{theater.location}</h4>
    </div>
       ) 
    })} 
    </div>
    <div className="addToScreen-container">
       <div className="Choose-theater">
          <h4>TheaterID: {selectedTheater._id}</h4>
          <h4>Name:{selectedTheater.name}</h4>
          <h4>Location: {selectedTheater.location}</h4>
          <h4>Capacity: {selectedTheater.capacity}</h4>
          <h4>No of slots:4</h4>
       </div>
      <h2>Choose slots</h2>
      <div className="slots-container">

        {slots[0] &&(
            slots.map((slot,index)=>{
              console.log(slot,"slot")
                return(
                    <div className="slots-desc" key={index}>     
                    <h5>Slot1 {slot.start} {slot.end}{slot.time}</h5>
                    <p>{slot.movieId}</p>
                    {!slot.movieId?<button onClick={()=>{addToScreen(slot._id)}}>Addmovie</button>:<button onClick={()=>{deleteFromScreen(slot._id)}}>Remove movie</button>}
                     </div>
                )
            })
        )}
      </div>
    </div>
    </div>
  )
}

export default AddToScreen
