import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a title"],
        },
        profile: {
            type: String,
            required: [true, "Please provide a profile picture"],
        },
        message: {
            type: String,
            required: [true, "Please provide a description"],
        },
        page_id: {
            type: String,
            required: [true, "Please provide a page id"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Discussion ||
    mongoose.model("Discussion", DiscussionSchema);
