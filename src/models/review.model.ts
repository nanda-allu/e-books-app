import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    reviwer: {
        type: String,
        required: [true, "Reviwer is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
})

export const Reviews = mongoose.model("Reviews", ReviewSchema);
