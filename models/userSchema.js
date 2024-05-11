import mongoose from "mongoose";

export const User = mongoose.model("User", mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter the Username"]
    },
    email: {
        type: String,
        required: [true, "Please add an email address"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Please enter the Password"]
    },
}, {
    timestamps: true,
})
)