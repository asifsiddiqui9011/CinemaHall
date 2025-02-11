// import { useContext } from "react"
// import "./AllThaterList.css"
// import { AdminContext } from "../../Context/AdminContext"

// const AllThaterList = () => {

//     const {allTheater} = useContext(AdminContext)
//   return (
//     <div className="alltheater-container">
//       <h1>All Thaters</h1>
//         {allTheater.map((theater,index)=>{
//           return(
//             <div className="theaters-list-container" key={index}>
//               <div className="theater-desc">
//                 <p>{theater._id}</p>
//                 <p>{theater.name}</p>
//                 <p>{theater.location}</p>

//               </div> 
//               <div className="slot-desc">
//                 {theater.slot.map((slot,index)=>{
//                     return(
//                         <div className="slot" key={index}>
//                             <p>{slot.start}{slot.time}{slot.end}</p>
//                             <p>{slot._id}</p>
                    
//                     <p> {slot.movieId}</p>
//                 </div>
//                     )
//                 })}
                
//               </div>  
//            </div>
     
//           )
//         })}  
//     </div>
//   )
// }

// export default AllThaterList


import { useContext, useState } from "react";
import "./AllThaterList.css";
import { AdminContext } from "../../Context/AdminContext";

const AllThaterList = () => {
    const { allTheater } = useContext(AdminContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const filteredTheaters = allTheater
        .filter(theater =>
            theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            theater._id.includes(searchTerm) || theater.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => sortOrder === "asc" ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location));

    return (
        <div className="alltheater-container">
            <h1>All Theaters</h1>
            <input 
                type="text" 
                placeholder="Search by theater name or ID" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                Sort by City ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            {filteredTheaters.map((theater, index) => {
                return (
                    <div className="theaters-list-container" key={index}>
                        <div className="theater-desc">
                            <p>{theater._id}</p>
                            <p>{theater.name}</p>
                            <p>{theater.location}</p>
                        </div> 
                        <div className="slot-desc">
                            {theater.slot.map((slot, index) => {
                                return (
                                    <div className="slot" key={index}>
                                        <p>{slot.start}{slot.time}{slot.end}</p>
                                        <p>{slot._id}</p>
                                        <p>{slot.movieId}</p>
                                    </div>
                                );
                            })}
                        </div>  
                    </div>
                );
            })}  
        </div>
    );
};

export default AllThaterList;

