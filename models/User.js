const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
    user: {
        type: String,
        require: [true, "please enter a user"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: [true, "please enter a password"],
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async (user, password) => {
    const userData = await User.findOne({ user })
    if (userData) {
        const auth = await bcrypt.compare(password, userData.password) 
        if (auth) {
            return userData
        }
    }
    throw Error("user or password incorrect")
}

const User = mongoose.model("user", userSchema)

module.exports = User