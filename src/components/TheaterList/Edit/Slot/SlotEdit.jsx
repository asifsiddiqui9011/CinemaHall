import { useState } from "react"
import { RxCross2 } from "react-icons/rx";

const SlotEdit = () => {

  const[editSlot,setEditSlot] = useState({props.time})

  const changeHandler =(e)=>{
    setEditSlot((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const updateSlot = ()=>{
    
  }

  return (
    <div className="editSlot-Model">
       <RxCross2 onClick={handleToggle} id="icon"/>
      <div className="Edit-slot-div">
          <h3>Add New Slot</h3>
          <span>Time:<input type="time"  name="time" id="time" value={editSlot.time} onChange={changeHandler}/></span>
          <button onClick={()=>{updateSlot}} >Add Slot</button>
      </div>
    </div>
  )
}

export default SlotEdit
