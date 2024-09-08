import "./Navbar.css";
import { useState } from "react";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import Profile from "../Profile/Profile";

const Navbar = () => {

  const [login,setLogin] = useState(true)
  
  const[loginToggle,setLoginToggle]= useState(false)
  const [profileToggle,setProfileToggle] = useState(false)

  const ProfileToggle = ()=>{
    setProfileToggle(!profileToggle)
  }

  const handleToggle = ()=>{
    setLoginToggle(!loginToggle)
  }

  const handleSwitch = ()=>{
    setLogin(!login)

  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          CinemaHall Admin Panel
        </a>
      </div>
      <div className="navbar-center">

      </div>
      <div className="navbar-right">
        <div className="pop-container">
          {localStorage.getItem('auth-token')?<CgProfile onClick={ProfileToggle} id="icon"/>:<button onClick={handleToggle}>Login</button>}
          {loginToggle &&(
          <div className="model-container">
         
              <div className="model">
                <RxCross2 onClick={handleToggle} id="icon"/>
                {login == true?<Login signup={handleSwitch} toggle={handleToggle} />:<Signup login={handleSwitch} toggle={handleToggle}/>}
              </div>
          </div>
        )}
        {profileToggle 
        &&(
          <div className="model-container" style={{backgroundColor:"transparent"}}>
            <div className="model">
              <RxCross2 onClick={ProfileToggle} id="icon"/>
                <Profile toggle={ProfileToggle}/>
            </div>
          </div>
      
          )}
      </div>
      
      </div>
    </nav>
  );
};

export default Navbar;
