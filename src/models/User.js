import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    id:{
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    name: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [3, "fullname must be at least 3 characters"],
      maxLength: [25, "fullname must be at most 25 characters"],
    },
    phone: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  });

const User = models?.User || model("User", UserSchema);
export default User;