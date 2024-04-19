const orderService = require("./orders.service");
const cartService = require("../carts/carst.service");

class OrderController {
    constructor() {}

    cancelOrder = async (req, res) => {
        try {
            const { orderId } = req.params;
            const order = await orderService.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found.' });
            }
            if (order.isShipped) {
                return res.status(400).json({ message: 'Cannot cancel order that has been shipped.' });
            }
            await orderService.deleteOrder(orderId);
            res.status(200).json({ message: 'Order cancelled successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to cancel order.');
        }
    }
    sendOrder = async (req, res) => {
        try {
            const { orderId } = req.params;
            await orderService.markOrderAsShipped(orderId);
            res.status(200).json({ message: 'Order marked as shipped successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send order.');
        }
    }

    fetchSellerOrders = async (req, res) => {
        try {
            const sellerId = req.user.id;
            const orders = await orderService.fetchOrdersByVendor(sellerId);
            orders.sort((a, b) => b.isShipped - a.isShipped);
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to retrieve seller orders.');
        }
    }

    fetchBuyerOrders = async (req, res) => {
        try {
            const buyerId = req.user.id;
            const orders = await orderService.fetchOrdersByCustomer(buyerId);
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to retrieve buyer orders.');
        }
    }

    placeOrder = async (req, res) => {
        try {
            const buyerId = req.user.id;
            const orderDetails = req.body;
            orderDetails.customerId = buyerId;
            await orderService.createOrder(orderDetails);
            res.status(200).json({ message: 'Order placed successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to place order.');
        }
    }

    placeOrdersForCartItems = async (req, res) => {
        try {
            const buyerId = req.user.id;
            const { cartItems, userInfo } = req.body;
            const orderIds = await orderService.createOrdersFromCart(cartItems, userInfo, buyerId);
            await cartService.removeCartItems(cartItems.map(item => item._id));
            res.status(200).json({ message: 'Cart items ordered and cart emptied successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to order cart items.');
        }
    }
}

module.exports = new OrderController();
