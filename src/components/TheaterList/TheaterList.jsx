import "./TheaterList.css"

const TheaterList = () => {
  return (
    <div className="theaterlist-container">
        <div className="select-container">
            <h2>Selects To see</h2>
             <div className="theater-card">
                <h3>TH001</h3> 
                <p>Pheonix</p> 
                <p>Pune 400041</p>
             </div>
             <div className="theater-card">
                <h3>TH001</h3> 
                <p>Pheonix</p> 
                <p>Pune 400041</p> 
             </div>
             <div className="theater-card">
                <h3>TH001</h3> 
                <p>Pheonix</p> 
                <p>Pune 400041</p>
             </div>
        </div>
        <div className="theater-desc-container">
              <div className="theater-details-container">
                 <span><h3>Theater Id: </h3><p>TH001</p></span> 
                  <span><h3>Name: </h3><p></p>Pheonix</span>
                  <span><h3>Capacity: </h3>100</span>
                  <span><h3>Location: </h3>Pune 400041</span>
                  <span><h3>No of slots: </h3><p>4</p></span> 
                  <div><button>Edit</button> <button>Delete</button></div>
              </div>
              <div className="slots-desc-container">
                <div className="slots-desc">
                    <h3>Slot1 9:00-12:00</h3>
                    <h3>Avengers End Game (Eng)</h3>
                    <h3>3D</h3>
                    <button>edit</button>
                    <button>Remove Movie</button>
                </div>
                <div className="slots-desc">
                    <h3>Slot1 9:00-12:00</h3>
                    <h3>2D</h3>
                    <h3>Deadpool (Hin)</h3>
                    <button>edit</button>
                    <button>Remove Movie</button>
                </div>
                <div className="slots-desc">
                    <h3>Slot1 9:00-12:00</h3>
                    <h3>Stree (Hin)</h3>
                    <h3>2D</h3>
                    <button>edit</button>
                    <button>Remove Movie</button>
                </div>
                <div className="slots-desc">
                    <h3>Slot1 9:00-12:00</h3>
                    <h3>2D</h3>
                    <h3>____Available_____</h3>
                    <button>edit</button>
                    <button>Add Movie</button>
                </div>
                <div><button>Edit Slot</button> <button>Delete Slot</button></div>
              </div>
        </div>
      
    </div>
  )
}

export default TheaterList
