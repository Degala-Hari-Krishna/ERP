import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    uid: { type: String, required: true },
    role:{type:String,required:true},
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
