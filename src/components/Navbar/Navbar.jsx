import "./Navbar.css";
import Login from '../Login/Login'
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          CinemaHall
        </a>
      </div>
      <div className="navbar-center">
       
      </div>
      <div className="navbar-right">
        <div className="lgn_btn"><button className="btn" >Login</button>
{/* onClick={()=>document.getElementById} */}

        {/* <Login/> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
