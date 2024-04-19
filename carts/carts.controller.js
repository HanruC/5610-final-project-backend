const shoppingCartService = require("./carst.service");
const mongoose = require("mongoose");

class ShoppingCartController {
    constructor() {}

    addToCart = async (req, res) => {
        try {
            const itemDetails = req.body;
            itemDetails.customerId = req.user.id;
            itemDetails.productId = new mongoose.mongo.ObjectId(itemDetails.goodsId);
            itemDetails.count = itemDetails.quantity;

            await shoppingCartService.addProductToCart(itemDetails);
            res.status(200).json({ message: 'Product added to cart successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    removeFromCart = async (req, res) => {
        try {
            const { productIds } = req.body;
            await shoppingCartService.deleteProductsFromCart(productIds);
            res.status(200).json({ message: 'Products removed from cart.' });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    updateCart = async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            await shoppingCartService.updateProductQuantityInCart(productId, quantity);
            res.status(200).json({ message: 'Cart updated successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    fetchCartItems = async (req, res) => {
        try {
            const customerId = req.user.id;
            const cartItems = await shoppingCartService.fetchCartItems(customerId);
            console.log(cartItems);
            res.status(200).json(cartItems);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}

module.exports = new ShoppingCartController();
