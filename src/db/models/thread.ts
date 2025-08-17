import mongoose, { models, Schema } from "mongoose";
import { CommentSchema } from "./comment";

const ThreadSchema = new Schema(
    {
        projectId: String,
        title: String,
        author: String,
        description: String,
        comments: [CommentSchema],
        likes: { type: Number, default: 0 },
        popular: { type: Boolean, default: false },
        tags: [String],
    },
    { timestamps: true }
);

export default models.Thread || mongoose.model("Thread", ThreadSchema);
