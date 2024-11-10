import "./Card2.css"

const Card2 = (props) => {
  return (
    <div className="card" style={{backgroundImage:`url(${props.bgimg})`}}>
       <img src={props.image} alt="" className="card2-img" />
       
        <div className="card-dis"> 
          <h3>{props.movieName}</h3>
          <p>{props.genre}</p> 
          <p>{props.language}</p>
          <p>{props.industry}</p>
          <p>{props.mainCasts}</p>

        </div>
    </div>
  )
}

export default Card2
