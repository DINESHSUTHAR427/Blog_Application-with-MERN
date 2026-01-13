const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const Comment = require('../models/comment')
const upload = require('../middlewares/multer')
const cloudinary = require("../utils/cloudinary.js")
const { requireAuth } = require("../middlewares/authentication")

/* ================= ADD BLOG ================= */
router.get('/add-new' , (req,res) => {
    return res.render('addBlog',{
        user: req.user,
    })
})


router.post(
  "/",
  requireAuth,
  upload.single("coverImageUrl"),
  async (req, res) => {
    try {
      const { title, body } = req.body;

      if (!title || !body) {
        return res.status(400).send("Title and body are required");
      }

      let coverImageUrl;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        coverImageUrl = result.secure_url;
      }

      const blog = await Blog.create({
        title,
        body,
        coverImageUrl,
        createdBy: req.user._id,
      });

      return res.redirect(`/blog/${blog._id}`);
    } catch (err) {
      console.error("Blog creation error:", err);
      return res.status(500).send("Failed to create blog");
    }
  }
);

/* ================= ADD COMMENT ================= */

router.post("/comment/:blogId", requireAuth, async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(400).send("Comment content required");
    }

    await Comment.create({
      content: req.body.content,
      blog: req.params.blogId,
      createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    console.error("Comment error:", err);
    return res.status(500).send("Failed to add comment");
  }
});

/* ================= VIEW BLOG ================= */

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy", "username email userImageUrl");

    if (!blog) return res.redirect("/");

    const comments = await Comment.find({ blog: blog._id })
      .populate("createdBy", "username userImageUrl");

    console.log("Comments data:", JSON.stringify(comments, null, 2));

    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (err) {
    console.error("Fetch blog error:", err);
    return res.status(400).send("Invalid blog ID");
  }
});

module.exports = router;