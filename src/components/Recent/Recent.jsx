import './Recent.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import Card2 from '../Cards/Card2'
import Card3 from '../Cards/Card3'
import { Link } from 'react-router-dom';
const Recent=()=>{
    return(
        <div className="main_container">
          
            <h2>Recently Watched</h2><div className="next_btn"><a href="#" class="previous round"><GrPrevious />
            </a>
<a href="#" class="next round"><GrNext /></a></div>
            <hr></hr>
          <Link to="/description">  <div className="left_div"><Card2/></div></Link>

            <div className="right_div">
                <div className='right_div1'><Card3/></div>
                <div className='right_div1'><Card3/></div>
                <div className='right_div1'><Card3/></div>
                <div className='right_div1'><Card3/></div>
            </div>
        </div>
    )
}
export default Recent