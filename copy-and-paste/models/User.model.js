import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
  },
  email: {
    type: String,
    required: [true, "Must provide email address"],
    unique: true,
  },
  avatar: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
