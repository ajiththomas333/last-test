import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'


function Admin() {

  const [complaints, setComplaints] = useState([])

  // Initialize Socket.io client connection
  const socket = io("https://last-web-hqhaekgufshuh5as.southindia-01.azurewebsites.net");

  // Function to fetch all complaints from the server (API call)
  const fetchComplaints = async () => {
    const res = await axios.get("https://last-web-hqhaekgufshuh5as.southindia-01.azurewebsites.net/api/admins");
    setComplaints(res.data);
  };


  useEffect(() => {
    fetchComplaints();
    // Listen for new complaint events from the server via Socket.io
    socket.on("newComplaint", (data) => {
      alert("New Complaint Registered: " + data.title);
    });

  }, []);

  // Function to update complaint status (e.g., Start or Resolve)
  const updateStatus = async (id, status) => {
    await axios.put(`https://last-web-hqhaekgufshuh5as.southindia-01.azurewebsites.net/api/update/${id}`, { status });
  }



  // JSX (UI Rendering)

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h2 className='text-2xl font-serif '>Admin Dashboard</h2>
      <table className='w-full  mt-10'>
        <thead>
          <tr className=' h-9 bg-blue-500 text-white'>
            <th>Title</th>
            <th>User</th>
            <th>Status</th>
            <th>SLA</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {

            complaints.map((obj) => (
              <tr key={obj._id} className='border h-11 border-gray-400 border-r-0 border-l-0 '>
                <td className='text-center text-[13px] w-[20%] '>{obj.title}</td>
                <td className='text-center text-[13px] w-[20%]'>{obj.user.email}</td>
                {obj.status == "resolved" ? <td className='text-center text-green-500 text-[13px] w-[20%]'>{obj.status}</td> : <td className='text-center text-red-500 text-[13px] w-[20%]'>{obj.status}</td>}

                <td
                  className={`px-4 py-2 text-[10px] ${obj.isOverdue ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {obj.isOverdue ? "Overdue" : "Within SLA"}
                </td>

                <td className='text-center w-[40%]'>
                  {obj.status == "In Progress" ? "" : <button onClick={() => updateStatus(obj._id, "In Progress")} className="bg-green-300 w-16 rounded-xl font-bold" >Start</button>}
                  {obj.status == "resolved" ? "" : <button onClick={() => updateStatus(obj._id, "resolved")} className='bg-blue-300 w-16 rounded-xl font-bold ml-2'>Resolve</button>}
                  <button className='bg-green-300 w-16 rounded-xl font-bold ml-2'>view</button>

                </td>
              </tr>
            ))}


        </tbody>
      </table>
    </div>
  )
}

export default Admin
