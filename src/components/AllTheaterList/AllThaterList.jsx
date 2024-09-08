import { useContext } from "react"
import "./AllThaterList.css"
import { AdminContext } from "../../Context/AdminContext"

const AllThaterList = () => {

    const {allTheater} = useContext(AdminContext)
  return (
    <div className="alltheater-container">
        {allTheater.map((theater,index)=>{
          return(
            <div className="theaters-list-container" key={index}>
          <div className="theater-desc">
            <p>{theater._id}</p>
            <p>{theater.name}</p>
            <p>{theater.location}</p>

          </div> 
          <div className="slot-desc">
            {theater.slot.map((slot,index)=>{
                 return(
                    <div className="slot" key={index}>
                        <p>{slot.start}{slot.time}{slot.end}</p>
                        <p>{slot._id}</p>
                
                <p> {slot.movieId}</p>
            </div>
                 )
            })}
            
          </div>  
        </div>
     
          )
        })}
        
    </div>
  )
}

export default AllThaterList
