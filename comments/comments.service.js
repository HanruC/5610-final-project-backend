const reviewModel = require("./comments.model");
const mongoose = require("mongoose");

class ReviewService {
    constructor() {}

    addReview = async (reviewDetails) => {
        return reviewModel.create(reviewDetails);
    }

    fetchProductReviews = async (productId) => {
        console.log(productId)
        return reviewModel.find({ productId: new mongoose.mongo.ObjectId(productId) }).populate('customerId');
    }
}

module.exports = new ReviewService();
