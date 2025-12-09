import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'

function Tickesstatus() {
  const navigate = useNavigate()
  const [user, setUser] = useState([]);

  // Initialize socket.io connection to the backend
  const socket = io("http://localhost:5000");


  // Function to fetch all complaints from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user");
      console.log("API response:", response.data.complaint);
      setUser(response.data.complaint)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Listen for real-time updates via socket.io
    socket.on("statusUpdated", (data) => {
      alert("update:" + data.user.email + "to " + data.status);
    });
  }, []);

  // Function to delete a specific complaint by ID

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/delete/${id}`);
    // Remove deleted ticket from the current state (UI updates instantly without reload)
    setUser((prev) => prev.filter((u) => u._id !== id))
  };





  return (
    <div className='container m-auto mt-15  '>
      <div className='flex justify-between'>
        <div className=''>
          <input className='accent-blue-500' type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label className='ml-2 mr-10 font-extralight '>All</label>
          <input className='accent-blue-500' type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label className='ml-2 mr-10 font-extralight'>Progress</label>
          <input className='accent-blue-500' type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label className='ml-2 mr-10 font-extralight'>Completed</label>
        </div>
        <div>
          <button onClick={() => navigate("/form")} className='bg-blue-500 w-40 h-7 text-white font-bold rounded-md text-[10px]'>Add New Ticket</button>
        </div>
      </div>

      <div className='mt-10'>


        <table className='w-full'>
          <thead>
            <tr className='h-12 border-b border-gray-200  '>
              <th className='w-[15%]'>Ticket Id</th>
              <th className='w-[40%]'>Email</th>
              <th className='w-[15%]'>status</th>
              <th className='w-[15%]'>date and time</th>
              <th className='w-[15%]'>delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((obj) => (
              <tr key={obj._id} className="border-b border-gray-200 h-12">
                <td className="text-center text-[13px] px-2">{obj._id}</td>
                <td className="text-center text-[13px] px-2">{obj.user?.email}</td>
                <td className="text-center text-[13px] text-green-500 px-2">{obj.status}</td>
                <td className="text-center text-[13px] px-2">30/07/2006</td>
                <td className="text-center text-[13px] px-2">
                  <button className="bg-red-500 px-2 py-1 text-white font-semibold rounded-md cursor-pointer hover:bg-red-600 transition" onClick={() => handleDelete(obj._id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>






    </div>
  )
}

export default Tickesstatus
