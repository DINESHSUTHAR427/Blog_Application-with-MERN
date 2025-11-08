const { Router } = require("express");
const multer = require('multer')
const path = require('path')
const router = Router();
const Blog = require("../models/blog");
const Comment = require('../models/comment')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`
    cb(null ,fileName)
  },
})

const upload = multer({ storage: storage });

router.get('/add-new' , (req,res) => {
    return res.render('addBlog',{
        user: req.user,
    })
})


router.post('/',upload.single("coverImageUrl"),async(req,res) => {
  try {
    const {title,body} = req.body;
    const blog = await Blog.create({
       title,
       body,
       createBy: req.user._id,
       coverImageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
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