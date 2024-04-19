const FavoriteModel = require("./favorites.model");
const UserModel = require("../users/users.model");
const ProductModel = require("../goods/goods.model");
const mongoose = require("mongoose");

class FavoriteService {
    constructor() {
    }

    fetchUserFavorites = async (userId) => {
        const objectId = new mongoose.mongo.ObjectId(userId);
        return FavoriteModel.find({ user: objectId }).populate('product');
    }

    addFavorite = async (userId, productId) => {
        const userObjectId = new mongoose.mongo.ObjectId(userId);
        const productObjectId = new mongoose.mongo.ObjectId(productId);

        const existingFavorite = await FavoriteModel.findOne({ user: userObjectId, product: productObjectId });
        if (existingFavorite) {
            throw new Error("Product is already in favorites.");
        }

        return FavoriteModel.create({ user: userObjectId, product: productObjectId });
    }

    removeFavorite = async (userId, productId) => {
        const userObjectId = new mongoose.mongo.ObjectId(userId);
        const productObjectId = new mongoose.mongo.ObjectId(productId);
        return FavoriteModel.findOneAndDelete({ user: userObjectId, product: productObjectId });
    }

    isFavorite = async (userId, productId) => {
        const userObjectId = new mongoose.mongo.ObjectId(userId);
        const productObjectId = new mongoose.mongo.ObjectId(productId);

        const favorite = await FavoriteModel.findOne({ user: userObjectId, product: productObjectId });
        return favorite !== null;
    }
}

module.exports = new FavoriteService();
