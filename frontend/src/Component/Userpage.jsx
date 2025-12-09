import React from 'react'
import { useNavigate } from 'react-router-dom'

function Userpage() {

  // Hook for programmatic navigation between routes
  const navigate = useNavigate()
  return (
    // Full-screen container with blue background and centered content
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Report a Problem
        </h1>

        <p className="text-white text-lg mb-8 max-w-md mx-auto opacity-90">
          Facing an issue or need assistance? Click the button below to raise a
          support ticket. Our team will review your problem and get back to you
          as soon as possible.
        </p>

        <button

          className="bg-white text-indigo-800 font-semibold text-lg px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:bg-indigo-600 hover:text-white"
          onClick={() => navigate("/form")}>
          📝 Place Ticket
        </button>
      </div>
    </div>
  )
}

export default Userpage
