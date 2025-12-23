const {Schema,model} = require("mongoose");
const { error } = require("node:console");
const{ createTokenforUser }  = require("../services/authentication")
const {
  createHmac,
  randomBytes,
} = require("node:crypto");

const userSchema = new Schema({
 fullname : {
    type: String,
    required: true,
 },
 email: {
    type : String,
    required : true,
    unique: true,
 },
 salt: {
    type : String
 },
 password : {
    type : String,
    required : true
   
   },
    
 userImageUrl : {
    type: String,
    default: "../public/user.jpg"
 },
 role:{
    type: String,
    enum : ["USER","ADMIN"],
    default: "USER",
 }
} ,{
    timestamps: true
})

userSchema.pre("save", function(next) {
    const user = this;
    
    // Only hash if password is new or modified
    if (user.isNew || user.isModified("password")) {
        const salt = randomBytes(16).toString('hex');
        const hashPassword = createHmac('sha256', salt).update(user.password).digest("hex");
        user.salt = salt;
        user.password = hashPassword;
    }
    next();
});

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
   try {
     const user = await this.findOne({email});
     if(!user) throw new Error("user not found");

     const salt = user.salt;
     //this password come from when user signup
     const hashPassword = user.password;
     //from user enter password when user is signup
     const userProvidedHash = createHmac('sha256', salt).update(password).digest("hex");
     if(hashPassword !== userProvidedHash )
        throw new Error("Wrong Password please enter right password");
     const token = await createTokenforUser(user);
     console.log("token :" ,token)
     return token;
   } catch (error) {
     console.error("Password matching error:", error);
     throw error; // Re-throw to be handled by the calling function
   }
})

const User = model("user",userSchema);
module.exports = User;