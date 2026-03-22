// ...existing code...
const express = require("express");
const compression = require("compression");
const dotenv = require("dotenv");
const path = require("path");   
const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkAuth , user_update_global } = require("./middlewares/authentication");
const Blog = require("./models/blog");

dotenv.config();
const app = express();

// ── Performance: gzip compress all responses ──────────────────────────
app.use(compression());

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(checkAuth("token"));
app.use(user_update_global);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Performance: cache compiled EJS templates in memory ───────────────
if (process.env.NODE_ENV === "production") {
  app.set("view cache", true);
}

mongoose.connect(process.env.MONGO_URL)
  .catch(err => console.error("DB connection error:", err));

// ── Performance: serve static files with 7-day browser cache ─────────
app.use(express.static(path.join(__dirname, "public"), {
  maxAge: "7d",
  etag: true,
  lastModified: true,
}));

app.use("/user", userRoute);
app.use("/blog", blogRouter);


app.get("/", async (req, res) => {
  try {
    // ── Performance: only select fields needed on home page ────────────
    const Blogs = await Blog.find({})
      .select("title coverImageUrl createdBy")
      .sort({ createdAt: -1 })
      .lean();

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
