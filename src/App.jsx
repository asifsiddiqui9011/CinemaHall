
import './App.css'
import Banner from './components/Banner/Banner';
import ComingSoon from './components/ComingSoon/ComingSoon';
import Navbar from "./components/Navbar/Navbar";
import Seats from './components/Seats/Seats';
import NowShowing from './components/Showing/NowShowing';
import Seatscopy from './components/Seats/Seatscopy'
function App() {
 

  return (
    <>
     <Navbar />
     <Banner/>
     <Seats/>
     <Seatscopy/>
     <NowShowing/>
     <ComingSoon/>
    </>
  )
}

export default App
