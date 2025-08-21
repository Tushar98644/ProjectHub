import mongoose, { models, Schema } from "mongoose";

const ThreadSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        likes: { type: Number, default: 0, min: 0 },
        popular: { type: Boolean, default: false },
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
);

ThreadSchema.index({ title: 1 });

export default models.Thread || mongoose.model("Thread", ThreadSchema);
