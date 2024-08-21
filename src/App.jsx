
import './App.css'
import Banner from './components/Banner/Banner';
import New_release from './components/New Release/New_release'
import ComingSoon from './components/ComingSoon/ComingSoon';
import Navbar from "./components/Navbar/Navbar";
import Interesting from './components/Interesting/Intresting';
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Recent from './components/Recent/Recent'
import Description from './components/Description/description'
import {Routes,Route} from "react-router-dom"
function App() 
{
 

  return (
    <>
     {/* <Navbar />
     <Banner/>
     <Recent/> */}
     {/* <New_release/> */}
     <Description/>

     
  
       
     {/* <ComingSoon/>
     <Interesting/>
     <Footer/>
     <Login/> */}
    </>
  )
}

export default App
