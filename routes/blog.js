const { Router } = require("express");
const router = Router();
const Blog = require("../models/blog");
const Comment = require('../models/comment')
const upload = require('../middlewares/multer')
const cloudinary = require("../utils/cloudinary.js")


router.get('/add-new' , (req,res) => {
    return res.render('addBlog',{
        user: req.user,
    })
})


router.post('/',upload.single("coverImageUrl"),async(req,res) => {
  try {
    if (!req.file) {
      console.warn("No file uploaded with the field 'coverImageUrl'");
    }
    // upload file to Cloudinary and get the secure URL
    let coverPath = null;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        coverPath = result && (result.secure_url || result.url || result.path || null);
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        return res.status(500).send('Image upload failed');
      }
    }
    console.log("coverPath saved:", coverPath);
    const {title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        createBy: req.user._id,
        coverImageUrl: coverPath,
      })
      return res.redirect(`/blog/${blog._id}`)
  } catch (error) {
    console.error("Blog creation error:", error);
    const errorMessage = typeof error.message === 'string' ? error.message : JSON.stringify(error);
    return res.status(400).send("Blog creation failed: " + errorMessage);
  }
})

router.post("/comment/:blogId",async(req,res)=> {
  try {
    await Comment.create({
      content: req.body.content,
      blog: req.params.blogId,
      createdBy: req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error("Comment creation error:", error);
    const errorMessage = typeof error.message === 'string' ? error.message : JSON.stringify(error);
    return res.status(400).send("Comment creation failed: " + errorMessage);
  }
})

router.get("/:id",async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createBy");
    const comments = await Comment.find({blog:req.params.id}).populate("createdBy");
    if (!blog){
      return res.redirect("/");
    } 
    return res.render('blog',{
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error("Blog retrieval error:", error);
    const errorMessage = typeof error.message === 'string' ? error.message : JSON.stringify(error);
    return res.status(400).send("Blog retrieval failed: " + errorMessage);
  }
})

module.exports = router;