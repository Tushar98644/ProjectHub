import mongoose, { models, Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        author: { type: String, required: true },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default models.Comment || mongoose.model("Comment", CommentSchema);
