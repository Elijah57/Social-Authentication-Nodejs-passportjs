const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user_id)=>{
    return jwt.sign({user_id}, process.env.JWTSECRET, {expiresIn:"5m"})
}

module.exports = {generateToken}