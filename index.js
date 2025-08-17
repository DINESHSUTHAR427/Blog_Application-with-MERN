const express = require("express");
const ejs = require("ejs");
const path = require("path");
const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const user = require("./models/user")
const Blog  = require("./models/blog");
 
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));


app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect("mongodb://localhost:27017/blogify").then((e) => {
    console.log("mongoose Connected");
})
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/user",userRoute);
app.use("/blog",blogRouter);

app.get("/",async(req,res)=> {
   const Blogs = await Blog.find({});
   return res.render("home",{
     user: req.user || null,
        blogs : Blogs
    })
})



const PORT = 8000;
app.listen(PORT,() => console.log(`sever is connected at port: ${PORT}`))

