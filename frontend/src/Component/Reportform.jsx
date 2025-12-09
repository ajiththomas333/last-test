import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Reportform() {
  // useState hooks to store form input values

  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [title, settile] = useState("")
  const [pro, setpro] = useState("")

  // Function to handle form submission

  const handlesubmit = (e) => {
    e.preventDefault();
    alert("Your ticket has been submitted successfully!");

    // Send POST request to backend API with complaint data
    axios.post("https://last-web-hqhaekgufshuh5as.southindia-01.azurewebsites.net/api/complaints", {

      user: {
        name: name,
        email: email,
      },
      title: title,
      description: pro

    })
    navigate("/ticket");
  };

  // JSX (UI Layout)
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
          Submit Your Problem details
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please fill out the form below to submit your problem details. Our support team will reach out to you soon.
        </p>
        <form onSubmit={handlesubmit} action="post" className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Title of problem</label>
            <input
              type="text"
              placeholder="Enter the title"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
              onChange={(e) => settile(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Problem</label>
            <textarea
              placeholder="Describe your problem..."
              className="w-full p-4 border rounded-lg h-40 focus:ring-2 focus:ring-indigo-400 resize-none"
              required
              onChange={(e) => setpro(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reportform
