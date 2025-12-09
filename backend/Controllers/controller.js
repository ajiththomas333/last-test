import Complaint from '../Model/Complaint.js';

export const userDetail = async (req, res) => { 
  // Create a new complaint document in MongoDB using data from the client (req.body)

    const complaint = await Complaint.create(req.body);
    
     // Get the socket.io instance stored in the Express app
    const io=req.app.get("socketio");

      // Emit a real-time event so all connected clients know a new complaint was added
    io.emit("newComplaint",complaint)
    
    res.status(201).json({
      message: "Complaint registered successfully",
      complaint,
    });
  
};



export const complients=async(req,res)=>{
try {
  // Fetch all complaints from the database
    const complaints = await Complaint.find();

    // Check if complaint is overdue
    const updatedComplaints = complaints.map(c => {
      const now = new Date();
      c.isOverdue = now > c.slaDeadline && c.status !== "Success";
      return c;
    });
    // Return the updated complaint list to the frontend

    res.json(updatedComplaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

// Update complaint status (e.g., from 'Pending' to 'Resolved')

export const update=async(req,res)=>{
    const complaint=await Complaint.findByIdAndUpdate(
        req.params.id,
        {status:req.body.status},
        {new:true}

        
    )
     // Emit a real-time update to all connected clients
       const io = req.app.get("socketio");
        io.emit("statusUpdated", complaint);
}
//  Fetch all user complaints (general data fetch)
export const users=async(req,res)=>{
  try{

    const complaint=await Complaint.find()
    res.status(201).json({message:"details",complaint})

  }catch(err){
    res.status(500).json({message:"fetching details",err})
  }
  
}

//  Delete a specific complaint by ID

export const delet=async(req,res)=>{
  const { id } = req.params;
const complaint = await Complaint.findByIdAndDelete(id);
if (!complaint) {
  return res.status(404).json({ message: "Complaint not found" });
}

res.status(200).json({ message: "Complaint deleted successfully" });

}




