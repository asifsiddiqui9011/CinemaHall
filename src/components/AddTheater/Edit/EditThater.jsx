

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../../Context/AdminContext";
import { useParams } from "react-router-dom";

const EditTheater = () => {
  const { selectedTheater } = useContext(AdminContext);
  const { id } = useParams(); 


  const [editTheater, setEditTheater] = useState({
    capacity: selectedTheater.capacity,
    location: selectedTheater.location,
    name: selectedTheater.name,
    screenType: selectedTheater.screenType,
    booleanArrays: { ...selectedTheater.booleanArrays },
  });


  const handleNseats = (number) => {
    setEditTheater((prev) => ({
      ...prev,
      booleanArrays: {
        ...prev.booleanArrays,
        n: prev.booleanArrays.n.map((val, idx) => (idx === number ? !val : val)),
      },
    }));
  };

  // Function to toggle premium seats
  const handlePseats = (number) => {
    setEditTheater((prev) => ({
      ...prev,
      booleanArrays: {
        ...prev.booleanArrays,
        p: prev.booleanArrays.p.map((val, idx) => (idx === number ? !val : val)),
      },
    }));
  };


  const handleDseats = (number) => {
    setEditTheater((prev) => ({
      ...prev,
      booleanArrays: {
        ...prev.booleanArrays,
        d: prev.booleanArrays.d.map((val, idx) => (idx === number ? !val : val)),
      },
    }));
  };


  const changeHandler = (e) => {
    setEditTheater((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateTheater = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/screens/${id}`, editTheater,
        {headers:{'auth-token':`${localStorage.getItem('auth-token')}`}}
      );
      console.log("Theater updated successfully", response.data)
      alert("Update successsfully");
    } catch (error) {
      console.error("Error updating theater", error.response?.data || error.message);
    }
  };

  return (
    <div className="theater-container">
      <div>
        <h1>Update Theater</h1>
        <form onSubmit={updateTheater}>
          <span>
            Name Of Theater: 
            <input
              type="text"
              placeholder="Enter name of your theater"
              name="name"
              value={editTheater.name}
              onChange={changeHandler}
              required
            />
          </span>
          <span>
            Location: 
            <input
              type="text"
              placeholder="Enter location of your theater"
              name="location"
              value={editTheater.location}
              onChange={changeHandler}
              required
            />
          </span>
          <span>
            Capacity: 
            <input
              type="text"
              placeholder="Enter capacity of your theater"
              name="capacity"
              value={editTheater.capacity}
              onChange={changeHandler}
              required
            />
          </span>
          <span>
            Screen Type:
            <select
              name="screenType"
              value={editTheater.screenType}
              onChange={changeHandler}
            >
              <option value="2D">2D</option>
              <option value="3D">3D</option>
            </select>
          </span>
          <button type="submit">Update Theater</button>
        </form>
      </div>

  
      <div className="slots-seats-container">
        <div className="seating-container">
          <div>____________Screen____________</div>
          <div>
          
            <div className="normal">
              {Array.from({ length: 40 }, (_, i) => i).map((index) => (
                <input
                  type="checkbox"
                  key={index}
                  onClick={() => handleNseats(index)}
                  defaultChecked={editTheater.booleanArrays.n[index]}
                />
              ))}
            </div>

            
            <div className="premium">
              {Array.from({ length: 80 }, (_, i) => i).map((index) => (
                <input
                  type="checkbox"
                  key={index}
                  onClick={() => handlePseats(index)}
                  defaultChecked={editTheater.booleanArrays.p[index]}
                />
              ))}
            </div>

           
            <div className="delux">
              {Array.from({ length: 40 }, (_, i) => i).map((index) => (
                <input
                  type="checkbox"
                  key={index}
                  onClick={() => handleDseats(index)}
                  defaultChecked={editTheater.booleanArrays.d[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTheater;

