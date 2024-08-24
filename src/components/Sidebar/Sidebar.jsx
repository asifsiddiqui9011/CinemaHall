import "./Sidebar.css"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar-container">
       
       <Link to={"/addmovies"}> 
            <div className="icons">
                <h2>Add Movies</h2>
            </div>
        </Link>
       
        <Link to={"addtheater"}>
            <div className="icons">
            <h2>Add Theater</h2>
            </div>
        </Link>
        
        <Link to={"movieslist"}>
            <div className="icons">
            <h2>Movies List</h2>
            </div >
        </Link>
        
        <Link to={"theaterlist"}>
            <div className="icons">
            <h2>Theater List</h2>
            </div>
        </Link>
        
       

      
    </div>
  )
}

export default Sidebar
