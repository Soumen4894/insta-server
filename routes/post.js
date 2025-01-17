const express = require("express");
const router = express.Router();
const {createPost, getPost, likePost,unLikePost, addComment} = require("../controllers/post")
const {authentication}  = require("../middleware/auth")
// const {upload} = require("../middleware/upload")

// router.post("/", authentication, upload.single("image"), createPost);
router.post("/", authentication, createPost);
router.get("/", getPost)
router.put("/like/:id", authentication, likePost)
router.put("/unlike/:id", authentication, unLikePost)
router.post("/comment/:id", authentication, addComment)

module.exports = router;