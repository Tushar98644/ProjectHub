import mongoose, { models, Schema } from "mongoose";

const IntegrationSchema = new Schema(
    {
        provider: { type: String, enum: ["github", "slack"], required: true },
        githubId: { type: String, default: "" },
        githubOwner: { type: String, default: "" },
        githubRepo: { type: String, default: "" },
        githubUrl: { type: String, default: "" },
        slackTeamId: { type: String, default: "" },
        slackChannelId: { type: String, default: "" },
        slackChannelName: { type: String, default: "" },
    },
    { _id: false }
);

const ThreadSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        likes: { type: Number, default: 0, min: 0 },
        popular: { type: Boolean, default: false },
        tags: { type: [String], default: [] },
        integration: { type: IntegrationSchema, default: {} },
        isPublic: { type: Boolean, default: true },
    },
    { timestamps: true }
);

ThreadSchema.index({ title: 1 });

export default models.Thread || mongoose.model("Thread", ThreadSchema);
