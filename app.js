// ...existing code...
const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const { fileURLToPath } = require("url");   // Remove if not needed
const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const user = require("./models/user");
const Blog = require("./models/blog");
const Comment = require("./models/comment");


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongoose Connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.resolve('./public/uploads')));
app.use("/user", userRoute);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  try {
    const Blogs = await Blog.find({});
    return res.render("home", {
      user: req.user || null,
      blogs: Blogs,
    });
  } catch (error) {
    console.error("Home page error:", error);
    const errorMessage = typeof error.message === "string" ? error.message : JSON.stringify(error);
    return res.status(500).send("Failed to load home page: " + errorMessage);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server is connected at port: ${PORT}`));

