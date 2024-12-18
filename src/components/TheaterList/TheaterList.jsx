import { useContext, useEffect, useState } from "react"
import "./TheaterList.css"
import { AdminContext } from "../../Context/AdminContext"
import axios from "axios"
import TheaterDesc from "../ThaterDesc/TheaterDesc"
import { Link } from "react-router-dom"

const TheaterList = () => {

  const {allTheater,selectedTheater,handleSelectTheater,ownerTheater} = useContext(AdminContext)

  
  return (
    <div className="theaterlist-container">
        <div className="select-container">
            <h2 className="select-tag">Selects To see</h2>
            {ownerTheater.map((theater,index)=>{
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
