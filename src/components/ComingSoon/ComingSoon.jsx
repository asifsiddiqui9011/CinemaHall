import Card from "../Cards/Card"
import "./ComingSoon.css"

const ComingSoon = () => {
  return (
    <div className="comingsoon-container">
      <h1>Coming Soon</h1><div className="next_btn"><a href="#" class="previous round">&#8249;</a>
      <a href="#" class="next round">&#8250;</a></div>
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
