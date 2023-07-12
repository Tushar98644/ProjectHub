import mongoose, { Schema, models } from "mongoose";

const MessageSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
    },
    message: {
        type: String,
        required: [true, "Please provide your message"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        timestamps: true,
    }
);

export default models.Message || mongoose.model("Message", MessageSchema) ;
