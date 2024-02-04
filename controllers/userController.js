const asyncHandler = require("express-async-handler");
const { activateToken }  = require("../utils/activationCode")
const User = require("../models/userModel")
const {generateToken} = require("../utils/jwthelper")


const registerUser = asyncHandler(async (req, res)=>{
    const { firstname, lastname, email, password } = req.body;
    const isUser = await User.findOne({email: email})
    if(isUser){
        return res.status(400).json({
            status: false,
            message: "User with Email already Exists"
        })
    }
    try{
        const newUser = await User.create({firstname, lastname, email, password})
        newUser.activationCode = activateToken();

        // try{
        //      sendMail( for activation code)
        // }catch(error){
        //     throw new Error("Something went wrong")
        // }

        return res.status(201).json({
            status: true,
            message: "User successfully Created"
        })

    }catch(error){
        throw new Error(error)
    }
})

const loginUser = asyncHandler(async (req, res)=>{
    const { email, password } = req.body;

    if (email === null) return;
    if (password === null) return;
 
    try {
        const findUser = await User.findOne({email: email})
        if (findUser && (await findUser.isPasswordMatched(pasword))){
            res.status(200).json({
                status:true,
                message: "Logged in Successfully",
                token: generateToken(findUser?._id),
                username: findUser?.firstname +" "+ findUser?.lastname,
                user_image: findUser?.user_image,     
              })   
        }

    }catch(error){
        throw new Error(error)
    }

})
module.exports = { registerUser }