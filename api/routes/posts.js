const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
// Import the upload middleware
const upload = require("../utils/upload");

// CREATE POST (now with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Build the new Post object including the Cloudinary URL
    const newPost = new Post({
      ...req.body,
      image: req.file.path, // public URL returned by Cloudinary
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST (optionally update the image too)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username !== req.body.username) {
      return res.status(401).json("You can update only your post!");
    }

    // Prepare the update payload
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path; // update URL if a new image is provided
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username !== req.body.username) {
      return res.status(401).json("You can delete only your post!");
    }
    await post.delete();
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS (with optional filters)
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: { $in: [catName] },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;