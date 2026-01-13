// ...existing code...
const express = require("express");
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkAuth("token"));
app.use(user_update_global);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(process.env.MONGO_URL).then(async() => {
  // List all indexes on the users collection
  try {
    const indexes = await mongoose.connection.collection('users').getIndexes();
    console.log('Current indexes:', indexes);
    
    // List of valid index names that should exist
    const validIndexes = ['_id_', 'username_1', 'email_1'];
    
    // Drop any indexes not in the valid list
    for (const indexName of Object.keys(indexes)) {
      if (!validIndexes.includes(indexName)) {
        try {
          await mongoose.connection.collection('users').dropIndex(indexName);
          console.log(`✓ Dropped orphaned index: ${indexName}`);
        } catch (err) {
          console.log(`Could not drop ${indexName}:`, err.message);
        }
      }
    }

    // List indexes after dropping
    const updatedIndexes = await mongoose.connection.collection('users').getIndexes();
    console.log('Updated indexes:', updatedIndexes);
  } catch (error) {
    console.error('Error:', error.message);
  }

    
})
.catch( err => console.error('Connected error',err)) 


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

