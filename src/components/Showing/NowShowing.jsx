import BuyTickets from "../BuyTickets/BuyTickets"
import Card from "../Cards/Card"
// import "./NowShowing.css"

const NowShowing = () => {
  return (
    <div>
      <h1>Now Showing</h1>
      <hr />
      <div className="cards-container">
       <Card/>
        <Card/>
       
        <Card/>
        <Card/>
        {/* <BuyTickets/> */}
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default NowShowing
