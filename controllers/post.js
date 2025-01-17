const { connect } = require("mongoose");
const Post = require("../models/Post")
// const {uploadImageToCloudinary} = require("../utils/imageUploader")
const cloudinary = require("cloudinary").v2

exports.createPost = async (req, res) => {
    const { userId, description } = req.body;
    // const image = req.file ? req.file.path : null;
    const image = req.files?.image
    // console.log(image)
    if (!image) {
        return res.status(404).json({ message: "Image not found" });
    }
    try {

        if (!image.mimetype.startsWith('image/')) {
            return res.status(400).json({ message: "Invalid file type. Only images are allowed." });
        }

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: process.env.FOLDER_NAME,
            width: 1000,
            height: 1000,
            crop: "limit" // Ensures the dimensions don't exceed the specified size
        });
        console.log(uploadResult)

        // Create a new post with the uploaded image URL
        const newPost = new Post({
            userId,
            description,
            image: uploadResult.secure_url
        });
        await newPost.save();

        return res.status(201).json({ post: newPost });


        // console.log(process.env.FOLDER_NAME)
        // const uploadImage = await uploadImageToCloudinary(
        //     image, 
        //     process.env.FOLDER_NAME,
        //     1000,
        //     1000
        // )
        // console.log("mar gereche")
        // // console.log(uploadImage)
        // // const newPost = new Post({ userId, description, image:result.secure_url});
        // // await newPost.save();
        // console.log(newPost)
        // res.status(201).json({ newPost })
    } catch (err) {
        // res.status(500).json({ error: err.message })
        console.error("Error creating post:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


exports.getPost = async (req, res) => {
    try {
        // console.log("hello")
        const posts = await Post.find().populate("userId", "name userName profilePicture");
        // console.log(posts)
        // console.log("hello")
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.likePost = async (req, res) => {
    // res.send("Testing likePost route");
    const { id } = req.params;
    const userId = req.user.id;
    
    // try {
    //     const post = await Post.findById(id);
    //     if (!post) return res.status(404).json({ message: "Post not found" });
    //     post.likes = post.likes || [];
    //     if (post.likes.includes(userId)) {
    //         // post.likes = post.likes.filter((like) => like !== userId);
    //         // post.likes.pop(userId);
    //         let a = post.likes.indexOf(userId)
    //         post.likes.splice(a,1);
    //     } else {
    //         post.likes.push(userId);
    //     }
    //     console.log("Route reached"); 
    //     await post.save();
    //     res.status(200).json(post);
    // } catch (err) {
    //     res.status(500).json({ error: err.message });
    // }
    try {
        const result = await Post.findByIdAndUpdate(
            id,
            { $push: { likes: userId } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}

exports.unLikePost = async (req, res)=>{
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const result = await Post.findByIdAndUpdate(
            id,
            { $pull: { likes: userId } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
}


exports.addComment = async (req, res)=>{
    try{
        const {id} = req.params;
        const {comment} = req.body;
        const userId = req.user.id;
        const userName = req.body;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        console.log(post)
        const newComment = {
            userId,
            userName,
            text:comment
        }
        console.log(newComment)
        post.comments.push(newComment)
        await post.save();
        res.status(201).json({ message: "Comment added successfully", post });
    }catch(err){
        res.status(500).json({message:"Surver error", err})
    }
}
