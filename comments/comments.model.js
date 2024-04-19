const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
