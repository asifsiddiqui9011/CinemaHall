import { useState } from "react"
import "./Card.css"

const Card = (props) => {


  return (
    <div className="card" style={{backgroundImage: `url(${props.img})`}}>
      <div className="card-desc" >
        <h3>{props.name}</h3>
        <p>{props.genre} </p>
        <p>{props.certification}</p>
        <polyline>{props.language} {props.videoDimension}</polyline>
      </div>  
    </div>
  )
}

export default Card
