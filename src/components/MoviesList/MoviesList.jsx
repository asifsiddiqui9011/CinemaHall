import Card from "../Cards/Card"
import "./MoviesList.css"
import { Link } from "react-router-dom"

const MoviesList = () => {
  return (
    <div className="movieList-container">
      <h1>Movies List</h1>
      <h1>Now</h1>
      <hr />
      <div className="cards-container">
       <Link to={"/movieslist/desc"}> <Card/></Link>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <h1>coming Soon</h1>
      <div className="cards-container">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default MoviesList
