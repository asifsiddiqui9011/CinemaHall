import "./AddToScreen.css"

const AddToScreen = () => {
  return (
    <div className="center">
    <div className="select-container">
    <h1>Chooose Theater</h1> 
        <div className="select-card">
            <h4>TH001</h4>
            <h4>Pheonix</h4>
            <h4>Pheonix Pune 440144</h4>
        </div>
        <div className="select-card">
            <h4>TH002</h4>
            <h4>Pheonix</h4>
            <h4>Pheonix  CST Mumbai 400144</h4>
        </div>
        <div className="select-card">
            <h4>TH003</h4>
            <h4>Pheonix</h4>
            <h4>Pheonix Grand Road 410144</h4>
        </div>
    </div>
    <div className="addToScreen-container">
       <div className="Choose-theater">
          <h4>TheaterID: TH001</h4>
          <h4>Name:Pheonix</h4>
          <h4>Location: Pune Pheonix mall 414041</h4>
          <h4>Capacity:100</h4>
          <h4>No of slots:4</h4>
       </div>
      <h2>Choose slots</h2>
      <div className="slots-container">
        <div className="slots-div">     
            <h5>Slot1 :9:00-12:00 am Screen:2D</h5>
        </div>
        <div className="slots-div">     
            <h5>Slot2 :1:00-4:00 am Screen:2D</h5>
        </div>
        <div className="slots-div">      
            <h5>Slot3 :5:00-8:00 pm Screen:3D</h5>
        </div>
        <div className="slots-div">
            <h5>Slot4 :9:00-12:00 pm Screen:2D</h5>
        </div>
      </div>
      <button>Confirm selection</button>
    </div>
    </div>
  )
}

export default AddToScreen
