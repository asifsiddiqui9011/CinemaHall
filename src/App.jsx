
import './App.css'
import Banner from './components/Banner/Banner';
import ComingSoon from './components/ComingSoon/ComingSoon';
import Navbar from "./components/Navbar/Navbar";
import NowShowing from './components/Showing/NowShowing';
function App() {
 

  return (
    <>
    <Navbar />
     <Banner/>
     <NowShowing/>
     <ComingSoon/>
    </>
  )
}

export default App
