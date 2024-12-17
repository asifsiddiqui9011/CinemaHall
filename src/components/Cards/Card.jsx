import "./Card.css"

const Card = (props) => {

  // style={{backgroundImage:`url(${props.image})`}}
  return (
    <div className="card_1" >
      <img src={props.image} alt="background image" className="background-image" />
      <div className="card-text">
          <h3>{props.movieName}</h3>
          <p>{props.genre}</p>
          <p>{props.language}</p>
      </div> 
    </div>
  )
}

export default Card
