import mongoose from "mongoose";

export const Location = mongoose.model("Location", mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    location: {
        name: String,
        coordinates: {
            lat: Number,
            lng: Number
        },
    }
}, {
    timestamps: true
})
)