import mongoose, { models, Schema } from "mongoose";

const ThreadSchema = new Schema(
    {
        title: String,
        author: String,
        description: String,
        likes: { type: Number, default: 0 },
        popular: { type: Boolean, default: false },
        tags: [String],
    },
    { timestamps: true }
);

export default models.Thread || mongoose.model("Thread", ThreadSchema);
