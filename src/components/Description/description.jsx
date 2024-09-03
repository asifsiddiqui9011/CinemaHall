import { useContext } from "react"
import Seats from "../Seats/Seats"

import "./Description.css"
import { CinemaContext } from "../../Contex/CinemaContext"

const Description =()=>{

    const {ticket,TicketHandler} = useContext(CinemaContext)
    return(
        <div className="main-description">
            <div className="timing-bar">
                <div>
                    Dates: 
                    <select name="date" id="date" onChange={TicketHandler}>
                    <option value="1/09/2024"> 1 </option>
                    <option value="2/09/2024"> 2 </option>
                    <option value="3/09/2024">3</option>
                    <option value="4/09/2024">4</option>
                    <option value="5/09/2024">5</option>
                    <option value="6/09/2024">6</option>
                    <option value="7/09/2024">7</option>
                    <option value="8/09/2024">8</option>
                    <option value="9/09/2024">9</option>
                   </select>
                </div>
                <div>
                    <div>
                        <p>Slot1 9:00-12:00</p>  
                    </div>
                    <div>
                       <p>Slot1 9:00-12:00</p> 
                    </div>
                </div>
               
            </div>
            <div className="discription-container">
                <div className="billing">
                    <div>
                       <h2>Movie description</h2>
                       
                    </div>
                    <div className="ticket-desc">
                        <div>
                            <h4>seats Numbers</h4>
                            N0, N1, P1, P2, D1, D2
                            <table >
                                <caption>seats</caption>
                                <thead>
                                    <tr>
                                        <th>srNo</th>
                                        <th>seats</th>
                                        <th>count</th>
                                        <th>price</th>
                                        <th>total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>N</td>
                                        <td>2</td>
                                        <td>200</td>
                                        <td>400</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>P</td>
                                        <td>2</td>
                                        <td>200</td>
                                        <td>400</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>D</td>
                                        <td>2</td>
                                        <td>200</td>
                                        <td>400</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>Total</td>
                                        <td colSpan={2}>600</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button>Confirm Boking </button>
                    </div>
                </div>
                <div className="seat-box">
                    <Seats/>
                </div>
            </div>
        </div>
    )
}
export default Description