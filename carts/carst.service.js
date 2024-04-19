const CartModel = require("./carts.model");
const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

class ShoppingCartService {
    constructor() {}

    removeCartItems = async (cartItemIds) => {
        return CartModel.deleteMany({
            _id: { $in: cartItemIds.map(id => new mongoose.mongo.ObjectId(id)) }
        })
    }

    addProductToCart = async (cartDetails) => {
        return CartModel.create(cartDetails);
    }

    deleteProductsFromCart = async (productIds) => {
        return CartModel.deleteMany({
            _id: { $in: productIds }
        });
    }

    updateProductQuantityInCart = async (productId, quantity) => {
        return CartModel.findByIdAndUpdate(productId, { quantity });
    }

    fetchCartItems = async (customerId) => {
        return CartModel.aggregate([
            {
                $match: {
                    customerId: new mongoose.mongo.ObjectId(customerId)
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails'
            }
        ]);
    }
}

module.exports = new ShoppingCartService();
