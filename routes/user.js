const { Router } = require("express");
const User = require("../models/user");
const { requireAuth } = require("../middlewares/authentication");
const upload = require("../middlewares/multer");


const router = Router();

/* ================= SIGNIN ================= */

router.get("/signin", (req ,res) => {
    return res.render("signin");
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect email or password",
    });
  }
});


/* ================= SIGNUP ================= */

router.get("/signup", (req ,res) => {
   return res.render("signup");
})

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.render("signup", {
    error: "Username already taken"
  });
  }
  

  try {
    await User.create({
      username,
      email,
      password,
    });

    return res.redirect("/user/signin");
  } catch (err) {
    console.error("Signup error:", err);

    // Duplicate key error (email or username)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.render("signup", {
        error: `${field} already exists. Please use another.`,
      });
    }

    return res.status(400).render("signup", {
      error: "Something went wrong. Please try again.",
    });
  }
});

/* ================= LOGOUT ================= */
router.get("/logout",(req,res) => {
   return res.clearCookie("token").redirect("/");
})


router.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { user: req.user });
});

/* ================= PROFILE ================= */
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.redirect("/");
    return res.render("profile", { user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return res.status(400).send("Error loading profile");
  }
});

router.post("/profile", requireAuth, upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { username, email } = req.body;
    const updateData = { username, email };
    if (typeof fullname !== 'undefined') updateData.username = username;

    if (req.file) {
      const cloudinary = require("../utils/cloudinary.js");
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.userImageUrl = result.secure_url;
    }

    await User.findByIdAndUpdate(userId, updateData, { new: true });
    return res.redirect("/user/profile");
  } catch (err) {
    console.error("Profile update error:", err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || 'field';
      return res.status(400).render("profile", { user: req.user, error: `${field} already exists.` });
    }
    return res.status(400).render("profile", { user: req.user, error: "Failed to update profile" });
  }
});

module.exports = router;