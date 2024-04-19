const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
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
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model("User", userSchema);
