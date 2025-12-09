import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: "New" },
    user: {
        name: String,
        email: String,
    },
    createdAt: { type: Date, default: Date.now },

    slaDeadline: {
        type: Date,
    },

    isOverdue: {
        type: Boolean,
        default: false,
    }

})


// Pre-save middleware — runs before saving a new complaint
ComplaintSchema.pre("save", function (next) {
    if (!this.slaDeadline) {
        const slaHours = 24; // adjust this value
        this.slaDeadline = new Date(Date.now() + slaHours * 60 * 60 * 1000);
    }
    next();// Continue saving
});

export default mongoose.model("Complaint", ComplaintSchema);