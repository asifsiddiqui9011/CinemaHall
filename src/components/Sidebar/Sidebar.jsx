import { useContext } from "react"
import "./Sidebar.css"
import { Link } from "react-router-dom"
import { AdminContext } from "../../Context/AdminContext"

const Sidebar = () => {

    const {Authorization} = useContext(AdminContext)

  return (
    <div className="sidebar-container">
     
      {Authorization ?
       <Link to={"/addmovies"}> 
            <div className="icons">
                <h2>Add Movies</h2>
            </div>
        </Link>
       :''} 
       {Authorization ? 
        <Link to={"addtheater"}>
            <div className="icons">
            <h2>Add Theater</h2>
            </div>
        </Link>
        :''}
        <Link to={"movieslist"}>
            <div className="icons">
            <h2>Movies List</h2>
            </div >
        </Link>
        
       {!Authorization ? <Link to={"alltheaterlist"}>
            <div className="icons">
            <h3> All Theater List</h3>
            </div>
        </Link>:<Link to={"theaterlist"}>
            <div className="icons">
            <h2>Theater List</h2>
            </div>
        </Link>}
        
       
        
       

      
    </div>
  )
}

export default Sidebar
