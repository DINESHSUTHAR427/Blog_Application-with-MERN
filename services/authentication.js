const JWT = require("jsonwebtoken");
const secret = "dineshsuthar";

function createTokenforUser (user){
    const payload = {
        _id: user._id,
        email : user.email,
        userImageUrl : user.userImageUrl,
        role : user.role    
    };
    const token = JWT.sign(payload,secret);
    return token;
}

function validateToken (token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenforUser,
    validateToken
}