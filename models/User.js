import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    userName: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true , default : () => crypto.randomUUID()},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
