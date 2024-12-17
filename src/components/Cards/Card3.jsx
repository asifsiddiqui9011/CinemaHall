import LazyImage from "../LazyImage/LazyImage";
import "./Card3.css"

const Card3 = (props) => {
  return (
    <div className="card3" >

      <img src={props.image} alt="bg-image" className="bg-img" />
    
       <h3>{props.movieName}</h3>
       <p>{props.genre} {props.language}</p>  
    </div>
  )
}

export default Card3;