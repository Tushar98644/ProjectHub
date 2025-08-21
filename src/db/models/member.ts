import mongoose, { Schema, models } from "mongoose";

const MemberSchema = new Schema(
    {
        threadId: { type: String, required: true, index: true },
        threadTitle: { type: String, default: "" },
        email: { type: String, required: true },
        name: { type: String, default: "" },
        avatar: { type: String, default: "" },
        authorEmail: { type: String, required: true, index: true },
        role: { type: String, enum: ["admin", "member"], required: true },
    },
    { timestamps: true }
);

MemberSchema.index({ threadId: 1, email: 1 }, { unique: true });

export default models.Member || mongoose.model("Member", MemberSchema);
