
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer'
import Description from './components/Description/Description'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home/Home';
import MovieDesc from './components/MovieDesc/MovieDesc';
import TheaterSlot from './components/BuyTickets/TheaterSlot';
import City from './components/BuyTickets/City';
import Loader from './components/Loader/Loader';
import Tkts from './components/T/Tkts';
function App() 
{
  
  return (
    <>
     <Navbar />
     {/* <Loader></Loader> */}
     <Routes> 
     <Route
        path='/'
        element={<Home/>}
      />
      <Route
        path='/:movieId'
        element={<Home/>}
      />
      <Route
        path='/description/:movieId/:theaterId/seatbooking/:slotId'
        element={<Description/>}
      />
      <Route
        path='/:movieId/:theaterId/seatbooking/:slotId'
        element={<Description/>}
      />
      <Route
        path='/description/:movieId'
        element={<MovieDesc/>}
      />
      <Route
        path='/tickets'
        element={<Tkts/>}
      />
     </Routes>
     <Footer/>
    </>
  )
}

export default App
