import { useState } from "react"
import "./Card.css"

const Card = (props) => {


  return (
    <div className="card">
      <div className="card-desc">
        <h3>{props.name}</h3>
        <p>Action * (U/A) * Eng</p>
        <polyline>Ratings *  * * *</polyline>
      </div>  
    </div>
  )
}

export default Card
