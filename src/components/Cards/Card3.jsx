import "./Card3.css"

const Card3 = (props) => {
  return (
    <div className="card3" style={{backgroundImage:`url(${props.image})`}}>
       <h3>Title of the movie{props.movieName}</h3>
       <p>Action * (U/A) * Eng{props.genre} {props.language}</p>
        <polyline>Ratings *  * * *</polyline>
        
    </div>
  )
}

export default Card3;