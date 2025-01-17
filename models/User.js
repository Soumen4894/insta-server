const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        followers:
            [
                { type: mongoose.Schema.Types.ObjectId, ref: "User" }
            ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId, ref: "User"
            }
        ]
    })
module.exports = mongoose.model("User", UserSchema);