import Seats from "../Seats/Seats"

import "./Description.css"

const Description =()=>{
    return(
        <div className="main-description">
            <div className="timing-bar"></div>
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