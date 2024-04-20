const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    avatar: {
      type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    },
    shareFavorites: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true  
});

module.exports = mongoose.model("User", userSchema);
