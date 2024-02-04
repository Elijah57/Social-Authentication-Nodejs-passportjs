const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    emails: {
        value: {
            required: true,
            type: String
            
        },
        isVerified: {
            type: Boolean
        }
    },
    password: {
        type: String
    }
    
},
{
    timestamps: true
})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

module.exports = mongoose.model("User", userSchema)