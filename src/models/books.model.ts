import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"] },
        author: { type: Array, required: [true, "Author is required"] },
        price: { type: String, required: [true, "Price is required"] },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
        publisher: {
            publisher_id: {
                type: String,
                required: [true, "Publisher_id is required"]
            },
            name: {
                type: String,
                required: [true, "Publisher name is required"]
            },
            location: {
                type: String,
                required: [true, "Publisher location is required"]
            }
        }
    },
    { timestamps: true }
);

export const Books = mongoose.model("Books", BookSchema);