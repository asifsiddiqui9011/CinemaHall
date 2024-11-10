import "./Card3.css"

const Card3 = (props) => {
  return (
    <div className="card3" style={{backgroundImage:`url(${props.image})`}}>
       <h3>{props.movieName}</h3>
       <p>{props.genre} {props.language}</p>  
    </div>
  )
}

export default Card3;