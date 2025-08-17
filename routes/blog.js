const { Router, request } = require("express");
const multer = require('multer')
const path = require('path')
const router = Router();
const Blog = require("../models/blog");
const { blob } = require("stream/consumers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
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

  const {title,body} = await req.body;
   const blogs = await Blog.create({
      title,
      body,
      createBy: req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`,
    })
    return res.redirect(`/blog/${blogs._id}`)
})

module.exports = router;