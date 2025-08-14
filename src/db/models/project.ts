import mongoose, { models } from "mongoose";

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    githubUrl: { type: String, required: true },
    approved: { type: Boolean, default: false },
    author: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    liveUrl: { type: String },
    tags: { type: [String] },
    techStack: { type: [String], required: true },
    authorAvatar: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    stars: { type: Number, default: 0 },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
});

export default models.Project || mongoose.model("Project", projectSchema);
