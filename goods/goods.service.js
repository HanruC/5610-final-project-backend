const ProductModel = require("./goods.model"); // Assuming this file still contains the updated product model
const mongoose = require("mongoose");

class ProductService {
    constructor() {
        this.reviewService = require("../comments/comments.service");
    }

    fetchVendorProducts = async (vendorId) => {
        const objectId = new mongoose.mongo.ObjectId(vendorId);
        return ProductModel.find({ vendor: objectId });
    }

    searchProducts = async (searchQuery = '') => {
        const searchRegex = new RegExp(`.*${searchQuery}.*`, 'i');
        return ProductModel.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex }
            ]

        }).populate('vendor');
    }

    getProductDetails = async (productId) => {
        const product = await ProductModel.findById(productId).populate('vendor').lean();
        const reviews = await this.reviewService.fetchProductReviews(productId);
        product.reviews = reviews;
        return product;
    }

    createProduct = async (productDetails) => {
        return ProductModel.create(productDetails);
    }

    getProductOfVendor = async (vendorId) => {
        console.log(vendorId)
        return ProductModel.find({ vendor: vendorId });
    }

    updateProduct = async (productId, productDetails) => {
        return ProductModel.findByIdAndUpdate(productId, productDetails, { new: true });
    }

    deleteProduct = async (productId) => {
        return ProductModel.findByIdAndDelete(productId);
    }
}

module.exports = new ProductService();
