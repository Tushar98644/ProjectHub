import mongoose, { models, Schema } from "mongoose";

const MemberSchema = new Schema({
    email: { type: String, required: true },
    role: { type: String, required: true },
    joinedAt: { type: Date, required: true },
    avatar: { type: String, required: true },
});

const ThreadSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        likes: { type: Number, default: 0, min: 0 },
        popular: { type: Boolean, default: false },
        tags: { type: [String], default: [] },
        members: { type: [MemberSchema], default: [] },
    },
    { timestamps: true }
);

ThreadSchema.index({ title: 1 });

export default models.Thread || mongoose.model("Thread", ThreadSchema);
