import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String },
});

export default models.User || mongoose.model("User", UserSchema);
