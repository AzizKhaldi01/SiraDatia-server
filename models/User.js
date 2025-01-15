const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,},
    isEmailConfirmed:{type:Boolean , default:false },
    picture: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQg-lr5__zRqY3mRg6erzAD9n4BGp3G8VfA&s" },
    provider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
    googleId: { type: String },
    facebookId: { type: String }
},
{ timestamps: true });
module.exports = mongoose.model("User", UserSchema)