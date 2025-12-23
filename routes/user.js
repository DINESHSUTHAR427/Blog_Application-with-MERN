const { Router } = require("express");
const User = require("../models/user")

const router = Router();
router.get("/signin", (req ,res) => {
    return res.render("signin");
})

router.get("/signup", (req ,res) => {
   return res.render("signup");
})

router.post("/signin",async(req,res) => {
    const {email,password} = await req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error : "Incorrect email and password"
        })
    }

})


router.post("/signup", async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { fullname, email, password } = req.body;
        const user = await User.create({
            fullname,
            email,
            password
        });
        res.redirect("/");
    } catch (err) {
        console.error("Signup error:", err);
        const errorMessage = typeof err.message === 'string' ? err.message : JSON.stringify(err);
        res.status(400).send("Signup failed: " + errorMessage);
    }
});

router.get("/logout",(req,res) => {
   return res.clearCookie("token").redirect("/");
})


module.exports = router;