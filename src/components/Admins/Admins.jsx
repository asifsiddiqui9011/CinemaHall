// import  { useState, useContext } from 'react';
// import { AdminContext } from '../../Context/AdminContext';
// import './Admins.css'

// const Admins = () => {
//     const{adminUser} = useContext(AdminContext);
//     const [searchTerm, setSearchTerm] = useState('');


//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const filteredAdmins = adminUser.filter(admin =>
//         admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         admin.id.toString().includes(searchTerm)
//     );

//     return (
//         <div className="admin-container">
//             <h1 className="admin-title">Admins List</h1>
//             <input
//                 type="text"
//                 className="admin-search"
//                 placeholder="Search by username or ID"
//                 value={searchTerm}
//                 onChange={handleSearch}
//             />
//             <ul className="admin-list">
//                 {filteredAdmins.map(admin => (
//                     <li key={admin.id} className="admin-item">
//                         {admin.username} (ID: {admin.id})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Admins;


import { useContext, useState } from 'react';
import './Admins.css';
import { AdminContext } from '../../Context/AdminContext';
import Signup from '../Login/Signup';

const Admins = () => {
    const { adminUser, updateAdmin, deleteAdmin } = useContext(AdminContext);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [editData, setEditData] = useState({ username: "", email: "", phoneNumber: "" });
    const [searchTerm, setSearchTerm] = useState("");

    const handleEdit = (admin) => {
        setEditingAdmin(admin._id);
        setEditData({ username: admin.username, email: admin.email, phoneNumber: admin.phoneNumber });
    };

    const handleSave = (id) => {
        updateAdmin(id, editData);
        setEditingAdmin(null);
    };

    const handleDelete = (id) => {
        deleteAdmin(id);
    };

    const filteredAdmins = adminUser.filter(admin =>
        admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin._id.includes(searchTerm)
    );

    return (
        <>
        <div style={{position:'fixed',right:'0',width:'30%',height:'100%'}}>
        <Signup/>
        </div>
         
        <div className="admins-container">
           
            <h1>Admins</h1>

            <input
                type="text"
                placeholder="Search by admin name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredAdmins.map((admin, index) => (
                <div className="admin-card" key={index}>
                    {editingAdmin === admin._id ? (
                        <div className="admin-edit">
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
                            <button onClick={() => handleSave(admin._id)}>Save</button>
                            <button onClick={() => setEditingAdmin(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div className="admin-desc">
                            <p>{admin._id}</p>
                            <p>{admin.username}</p>
                            <p>{admin.email}</p>
                            <p>{admin.phoneNumber}</p>
                            <button onClick={() => handleEdit(admin)}>Edit</button>
                            <button onClick={() => handleDelete(admin._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
       
        </>
    );
};

export default Admins;
