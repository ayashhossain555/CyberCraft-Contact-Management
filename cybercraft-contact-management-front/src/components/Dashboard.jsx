import { useEffect, useState, useContext } from "react";
import logo from '/logo2.png';
import { FaPencilAlt, FaTrash, FaSearch, FaList, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch('http://localhost:5000/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Failed to load contacts:', error));
    };

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/logout');
            })
            .catch(console.error);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/contacts/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => {
                fetchContacts(); // Refresh the list after deleting
            })
            .catch(console.error);
    };

    const handleDownload = () => {
        window.location.href = 'http://localhost:5000/api/contacts/download';
    };

    const handleUpdate = (id) => {
        // Placeholder data for updating
        const updatedData = { name: "Updated Name", email: "update@example.com", phone: "1234567890", message: "Updated message" };
        fetch(`http://localhost:5000/api/contacts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(() => {
                fetchContacts(); // Refresh the list after updating
            })
            .catch(console.error);
    };

    return (
        <div>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-60 bg-base-300 text-white">
                    <div className="p-5 bg-base-100">
                        <img src={logo} alt="CyberCraft Bangladesh" className="h-12 mb-6" />
                    </div>
                    <ul>
                        <li className="flex items-center px-5 py-3 bg-[#3366CC]">
                            <FaEnvelope className="mr-2" /> Contact Management
                        </li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 p-8">
                    <div className="container mx-auto">
                        <header className="flex justify-between items-center mb-8">
                            <div className='flex items-center justify-center'>
                                <FaList className="mr-4 mt-1 text-xl" />
                                <h1 className="text-3xl text-[#3366CC] font-semibold">Contact Management</h1>
                            </div>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input type="text" placeholder="Search blogs" className="input input-bordered pl-10 pr-4 py-2" />
                                <a onClick={handleSignOut} className="btn bg-[#3366CC] ml-2 text-white font-bold">Sign Out</a>
                            </div>
                        </header>
                        <div className="overflow-x-auto">
                            <table className="table w-full text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="bg-[#3366CC] text-white">Name</th>
                                        <th className="bg-[#3366CC] text-white">Phone Number</th>
                                        <th className="bg-[#3366CC] text-white">Email Address</th>
                                        <th className="bg-[#3366CC] text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact, index) => (
                                        <tr key={index} className="text-gray-800 border-b">
                                            <td className="pl-4">{contact.name}</td>
                                            <td>{contact.phone}</td>
                                            <td>{contact.email}</td>
                                            <td>
                                                <button className="btn btn-sm btn-circle btn-success mr-2" onClick={() => handleUpdate(contact._id)}>
                                                    <FaPencilAlt className="text-white" />
                                                </button>
                                                <button className="btn btn-sm btn-circle btn-error" onClick={() => handleDelete(contact._id)}>
                                                    <FaTrash className="text-white" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                            <button onClick={handleDownload} className="btn text-white bg-[#3366CC]">Download All Contacts</button>
                            <div className="flex gap-1">
                                {Array.from({ length: 10 }, (_, i) => (
                                    <button key={i} className={`btn ${i === 0 ? 'btn-active' : ''}`}>{i + 1}</button>
                                ))}
                            </div>
                            </div>
                            <span className="text-sm text-gray-700">1 - 10 of 100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
