// ...existing code...
import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import userRoute from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middlewares/authentication.js";
import user from "./models/user.js";
import Blog from "./models/blog.js";
import Comment from "./models/comment.js";

dotenv.config();
const __dirname = path.resolve();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongoose Connected");
});

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));
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
// ...existing code...

