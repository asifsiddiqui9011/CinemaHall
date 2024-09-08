
import { useState } from "react";
import axios from "axios";
import "./AddTheater.css"

const AddTheater = () => {



  const [theater, setTheater] = useState({
    booleanArrays: {
      n: [],
      p: [],
      d: []
    }
  });

  const handleNseats = (number) => {

    setTheater((prev) => ({ 
      ...prev, 
      booleanArrays: { ...prev.booleanArrays, n: [...prev.booleanArrays, !prev.booleanArrays.n[number]] }
    }));
  }

  const handlePseats = (number) => {
    setTheater((prev) => ({
      ...prev,
      booleanArrays: { ...prev.booleanArrays, p: [...prev.booleanArrays.p, !prev.booleanArrays.p[number]] }
    }));
  }

  const handleDseats = (number) => {
    setTheater((prev) => ({
      ...prev,
      booleanArrays: { ...prev.booleanArrays, d: [...prev.booleanArrays.d, !prev.booleanArrays.d[number]] }
    }));
  }

  const changeHandler = (e) => {
    setTheater((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const saveTheater = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/screens',theater,
        {headers:{'auth-token':`${localStorage.getItem('auth-token')}`}});
      console.log("Theater created successfully", response.data);
    } catch (error) {
      console.error("Error creating theater", error.response?.data || error.message);
    }
  }

  return (
    <div className="theater-container">
      <div>
          <h1>Add Theater</h1>
          <form onSubmit={saveTheater}>
            <span>Name Of Theater: <input type="text" placeholder="Enter name of your theater" name="name" id="name" onChange={changeHandler} required /></span>
            <span>Location: <input type="text" placeholder="Enter location of your theater" name="location" id="location" onChange={changeHandler} required/></span>
            <span>Capacity: <input type="text" placeholder="Enter capacity of your theater" onChange={changeHandler} name="capacity" id="capacity" required/></span>
            <span>screenType:
              <select name="screenType" id="screenType" value={theater.screenType} onChange={changeHandler}>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
            </span>
            <button type="submit">Add Theater</button>
          </form>
      </div>
      <div className="slots-seats-container">
          <div className="seating-container">
            <div>____________Screen____________</div>
            <div>
                <div className="normal">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
                    <input type="checkbox" key={index-1} onClick={() => { handleNseats(index-1) }} />
                  ))}
                </div>
                <div className="premium">
                  {Array.from({ length: 80 }, (_, i) => i + 1).map((index) => (
                    <>
                    <input type="checkbox" key={index-1} onClick={() => { handlePseats(index-1) }} />
                    </>
                  ))}
                </div>
                <div className="delux">
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((index) => (
                    <input type="checkbox" key={index-1} onClick={() => { handleDseats(index-1) }} />
                  ))}
                </div>
            </div>
          </div>
      </div>   
    </div>
  )
}

export default AddTheater;


