
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer'
import Description from './components/Description/Description'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home/Home';
function App() 
{
  
  return (
    <>
     <Navbar />
     
     <Routes> 
     <Route
        path='/'
        element={<Home/>}
      />
      <Route
        path='/seatbooking'
        element={<Description/>}
      />
     </Routes>
     <Footer/>
    </>
  )
}

export default App
