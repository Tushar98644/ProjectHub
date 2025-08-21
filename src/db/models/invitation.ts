import mongoose, { Schema, models } from "mongoose";

const InvitationSchema = new Schema(
    {
        threadId: { type: String, required: true },
        threadTitle: { type: String, required: true },
        senderEmail: { type: String, required: true },
        receiverEmail: { type: String, required: true },
        role: { type: String, required: true },
        status: { type: String, enum: ["PENDING", "ACCEPTED", "DECLINED"], default: "PENDING" },
    },
    { timestamps: true }
);

InvitationSchema.index(
    { threadId: 1, receiverEmail: 1, role: 1, status: 1 },
    { unique: true, partialFilterExpression: { status: "PENDING" } }
);

export default models.Invitation || mongoose.model("Invitation", InvitationSchema);
