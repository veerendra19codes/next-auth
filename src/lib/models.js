import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Must provide a username"],
        unique: [true, "Username must be unique"],
    },
    email: {
        type: String,
        required: [true, "Must provide an email"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: [true, "Must provide a password"],
    },
}, {timestamps: true});

let User;

try {
  // Try to get the existing model
  User = mongoose.model("User");
} catch (error) {
  // If the model does not exist, create a new one
  User = mongoose.model("User", userSchema);
}

const models = {User}
export default models;

