import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk provides string-based IDs
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      enum: ["student", "educator"],
      default: "student",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
