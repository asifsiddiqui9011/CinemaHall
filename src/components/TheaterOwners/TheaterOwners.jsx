
import { useContext, useState } from 'react';
import './TheaterOwners.css';
import { AdminContext } from '../../Context/AdminContext';
import Signup from '../Login/Signup';

const TheaterOwners = () => {
    const { allTheaterOwners, updateTheaterOwner, deleteTheaterOwner } = useContext(AdminContext);
    const [editingOwner, setEditingOwner] = useState(null);
    const [editData, setEditData] = useState({ username: "", email: "", phoneNumber: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const handleEdit = (owner) => {
        setEditingOwner(owner._id);
        setEditData({ username: owner.username, email: owner.email, phoneNumber: owner.phoneNumber });
    };

    const handleSave = (id) => {
        updateTheaterOwner(id, editData);
        setEditingOwner(null);
    };

    const handleDelete = (id) => {
        deleteTheaterOwner(id);
    };

    const filteredOwners = allTheaterOwners.filter(owner =>
        owner.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner._id.includes(searchTerm)
    );

    return (
        <>
        <div style={{position:'fixed',right:'0',width:'30%',height:'100%'}}>
        <Signup/>
        </div>
         
        <div className="theaterowners-container">
           
            <h1>Theater Owners</h1>

            <input
                type="text"
                placeholder="Search by owner name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredOwners.map((owner, index) => (
                <div className="theater-owner-card" key={index}>
                    {editingOwner === owner._id ? (
                        <div className="owner-edit">
                            <input
                                type="text"
                                value={editData.username}
                                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editData.phoneNumber}
                                onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                            />
                            <button onClick={() => handleSave(owner._id)}>Save</button>
                            <button onClick={() => setEditingOwner(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div className="owner-desc">
                            <p>{owner._id}</p>
                            <p>{owner.username}</p>
                            <p>{owner.email}</p>
                            <p>{owner.phoneNumber}</p>
                            <button onClick={() => handleEdit(owner)}>Edit</button>
                            <button onClick={() => handleDelete(owner._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
       
        </>
    );
};

export default TheaterOwners;
