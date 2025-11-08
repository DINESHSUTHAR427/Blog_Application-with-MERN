const JWT = require("jsonwebtoken");
const secret = "dineshsuthar";

function createTokenforUser (user){
    try {
        const payload = {
            _id: user._id,
            email : user.email,
            userImageUrl : user.userImageUrl,
            role : user.role    
        };
        const token = JWT.sign(payload,secret);
        return token;
    } catch (error) {
        console.error("Token creation error:", error);
        throw new Error("Failed to create authentication token");
    }
}

function validateToken (token){
    try {
        const payload = JWT.verify(token,secret);
        return payload;
    } catch (error) {
        console.error("Token validation error:", error);
        throw new Error("Invalid or expired token");
    }
}

module.exports = {
    createTokenforUser,
    validateToken
}