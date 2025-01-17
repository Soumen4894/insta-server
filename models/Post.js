const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        text: { type: String, required: true }
    },
    { timestamps: true } // Adds createdAt and updatedAt
);

const PostSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    likes:{
        type:[mongoose.Schema.ObjectId],
        ref: "User"
    },
    comments:[CommentSchema]
}, {timestamps:true})

module.exports =  mongoose.model("Post", PostSchema);