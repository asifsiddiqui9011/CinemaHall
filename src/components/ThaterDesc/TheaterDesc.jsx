import './ThaterDesc.css'
import { useState,useEffect } from 'react';

import axios from 'axios'
import { useContext } from 'react';
import { AdminContext } from '../../Context/AdminContext';
import { Link } from 'react-router-dom';

const TheaterDesc = () => {
    
    const {selectedTheater} = useContext(AdminContext)
    const [slots,setSlots] = useState({})


    useEffect(()=>{
    if (selectedTheater.slot){
    setSlots(selectedTheater.slot)
    }
    console.log(slots,"slots")
    },[selectedTheater.slot])
  
    const[newSlot,setNewSlot] = useState({
        theater_id:''
      })
    
      const newSlotHandler =(e)=>{
        setNewSlot((prev)=>({...prev,[e.target.name]:e.target.value}))
        setNewSlot((prev)=>({...prev,theater_id:selectedTheater._id}))
      }
    
      const add = async (event)=>{
        event.preventDefault()
        console.log(newSlot,"newSlot")
        const response = await axios.post('http://localhost:4000/api/addslot', newSlot);
        console.log('Signup successful:', response.data.success);
        if(response.data.success){
          console.log("successfully added")
          alert("slot successfully added")
        }
      }
    const deleteSlot =async (slotId)=>{
        console.log(selectedTheater._id,slotId)
        const response = await axios.delete(`http://localhost:4000/api/deleteslot?theater_id=${selectedTheater._id}&slotId=${slotId}`);
        if(response.data.success){
          console.log("successfully deleted")
          alert("slot successfully deleted")
        }
      }

      const deleteFromScreen = async(id)=>{
        try {
          const response = await axios.delete(`http://localhost:4000/api/deleteMovieFromSlot/${id}`);
          if(response.data.success){
            console.log("successfully deleted")
            alert("successfully deleted")
          }
        } catch (error) {
         console.log(error,id)
        }
      }

      const deleteScreen = async(id)=>{
        try {
          const response = await axios.delete(`http://localhost:4000/api/screens/${id}`);
          if(response.data.success){
            console.log("successfully deleted")
            alert("successfully deleted")
          }
        } catch (error) {
         console.log(error)
        }
      }

  return (
    <div className="theater-desc-container">
    <div className="add-slot-container">
         <div className="theater-details-container">
             <span><h3>Theater Id: </h3><p>TH001 {selectedTheater.mainId}</p></span> 
              <span><h3>Name: </h3><p></p>Pheonix {selectedTheater.name}</span>
              <span><h3>Capacity: </h3>100</span>
              <span><h3>Location: </h3>Pune 400041 {selectedTheater.location}</span>
              <span><h3>No of slots: </h3><p>4</p></span> 
              <div>
              <Link to={`${selectedTheater._id}/edit`}><button>Edit</button> </Link>
                <button onClick={()=>{deleteScreen(selectedTheater._id)}}>Delete</button></div>
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
                          {slot.movieId &&(
                            <>
                          <h3>{slot.movieId.videoDimension}</h3>
                          <h3>{slot.movieId.movieName} ({slot.movieId.language}){slot.movieId._id}</h3>
                          </>
                          )}
                         
                          <button onClick={()=>{deleteFromScreen(slot._id)}}>Remove Movie</button>
                         <button>edit</button> 
                         <button onClick={()=>{deleteSlot(slot)}}>Delete slot</button>
                      </div>
                        )
                      })
         )}
            
          
        </div>
  </div>

  )
}

export default TheaterDesc;
