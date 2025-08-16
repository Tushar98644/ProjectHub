import mongoose, { models, Schema } from "mongoose";
import { CommentSchema } from "./comment";

const ThreadSchema = new Schema(
    {
        projectId: String,
        title: String,
        author: String,
        comments: [CommentSchema],
        pinned: { type: Boolean, default: false },
        tags: [String],
    },
    { timestamps: true }
);

export default models.ThreadModel || mongoose.model("Thread", ThreadSchema);
