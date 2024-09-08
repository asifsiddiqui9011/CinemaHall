import { useState } from "react";
import Card from "../Cards/Card"
import "./ComingSoon.css"
import { Link } from "react-router-dom"



const ComingSoon = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (scrollAmount) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;
  
    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition);
  
    // Access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition;
  };
  
   
  return (
    <div className="comingsoon-container">
      <h1>Coming Soon</h1>
{/* <div className="next_prev_btn"><button onClick={() => handleScroll(-200)}></button><button onClick={() => handleScroll(200)}></button></div> */}

      <hr />
      <div className="cs_cards-container">
     
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
        <div className="cs_cards"><Card/></div>
       
      </div>
    </div>
  )
}

export default ComingSoon
