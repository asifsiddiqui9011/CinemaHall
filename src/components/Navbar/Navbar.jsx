import "./Navbar.css";
import Login from "../Login/Login"
import Signup from "../Login/Signup"
import { CgProfile } from "react-icons/cg";
import { useState,useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import {Link as ScrollLink} from 'react-scroll'
import { CinemaContext } from "../../Contex/CinemaContext";

const Navbar = () => {


  const {handleToggle,handleSwitch,login,loginToggle,} = useContext(CinemaContext)
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Adding scroll event listener using useEffect hook
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 


  // const [login,setLogin] = useState(true)
  
  // const[loginToggle,setLoginToggle]= useState(false)
  const [profileToggle,setProfileToggle] = useState(false)

  const ProfileToggle = ()=>{
    setProfileToggle(!profileToggle)
  }

  // const handleToggle = ()=>{
  //   setLoginToggle(!loginToggle)
  // }

  // const handleSwitch = ()=>{
  //   setLogin(!login)

  // }
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo">
         <h2>CinemaHall</h2>
      </div>
      <div className="nav-btns-container">
     
         <Link to={'/'}><p>Home</p></Link> 
         <ScrollLink to={'newRelease'} smooth={true} duration={300} offset={-70}><p>NewRelease</p></ScrollLink>
         <ScrollLink  to={'comingsoon'} smooth={true} duration={300} offset={350}> <p>ComingSoon</p></ScrollLink>
         <ScrollLink to={`contact`} smooth={true} duration={300} offset={-70}><p>Contact</p></ScrollLink>
     
      </div>
      <div>
         {localStorage.getItem('auth-token')?<CgProfile onClick={ProfileToggle} id="icon"/>:<button onClick={handleToggle} className="buyticketbtn" style={{marginTop:"50px"}}>Login</button>}
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
      
    </nav>
  );
};

export default Navbar;
