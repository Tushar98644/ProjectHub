import monogoose, { models } from "mongoose";

const projectSchema = new monogoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
    },
    author: {
        type: String,
    },
    tags: {
        type: Array,
    },
    authorAvatar: {
        type: String,
    },
    likes: {
        type: Number,
    },
    comments: {
        type: Number,
    },
    views: {
        type: Number,
    },
    stars: {
        type: Number,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: String,
    },
});

export default models.Project || monogoose.model("Project", projectSchema);
