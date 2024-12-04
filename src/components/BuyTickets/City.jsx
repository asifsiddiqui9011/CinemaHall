import { useContext, useState } from "react"
import "./City.css"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"


const City = ({style,cityHandler}) => {

    const {ticket} = useContext(CinemaContext)
    let cities = ["mumbai","delhi","lucknow","banglore","manglore","delhi","goa","pune","kolkata","surat","chennai"]
    cities.sort();

    

  
  return (
    
          <div className="choose-city" style={style}>
       <select name="city" id="city" value={ticket.city} onChange={cityHandler}>
        {cities.map((city,index)=>{
          return(
            <option key={index} value={`${city}`}>{city}</option>
          )
        })}
       </select>
  </div>
       
  )
}

export default City
