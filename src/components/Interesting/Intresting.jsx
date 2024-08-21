
import "./Intresting.css"
import Card4 from '../Cards/Card4'
const Interesting = () => {
  return (
    <div>
      <h1>Interest For Comming Movies</h1> <div className="next_btn"><a href="#" class="previous round">&#8249;</a>
      <a href="#" class="next round">&#8250;</a></div>
      <hr></hr>
      <div className="card4-container">
      <Card4/>
        {/* <div className="card_div"><Card4/></div>
        <div className="card_div"><Card4/></div>
        <div className="card_div"><Card4/></div>
        <div className="card_div"><Card4/></div>
        <div className="card_div"><Card4/></div>
        <div className="card_div"><Card4/></div> */}
      </div>
    </div>
  )
}

export default Interesting