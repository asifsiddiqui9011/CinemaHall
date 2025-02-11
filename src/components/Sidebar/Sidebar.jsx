import { useContext } from "react"
import "./Sidebar.css"
import { Link } from "react-router-dom"
import { AdminContext } from "../../Context/AdminContext"

const Sidebar = () => {

    const {userData} = useContext(AdminContext)

     // Links configuration based on roles
  const navLinks = [
    { to: '/addmovies', label: 'Add Movies', roles: ['admin','superadmin'] },
    { to: 'addtheater', label: 'Add Theater', roles: ['theater_owner'] },
    { to: 'movieslist', label: 'Movies List', roles: ['theater_owner','admin','superadmin'] },
    { to: '/alltheaterlist', label: 'All Theater List', roles: ['admin','superadmin'] },
    { to: 'theaterlist', label: 'Theater List', roles: ['theater_owner'] },
    { to: '/thaterowners', label: 'Theater Owners List', roles: ['admin','superadmin'] },
    {to:'/admins', label:' Admins List ',roles:['superadmin']}
  ];

  return (
    <div className="sidebar-container">
     
      {userData && (
            navLinks
              .filter((link) => link.roles.includes(userData.role)) // Filter links based on user's role
              .map((link) => (
                <Link key={link.to} to={link.to}>
                 <div className="icons">
                    <h3>{link.label}</h3>
                </div>
                </Link>
              ))
          )}
        
    </div>
  )
}

export default Sidebar


  {/* {Authorization ?
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
        
        */}