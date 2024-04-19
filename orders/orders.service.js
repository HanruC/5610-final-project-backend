const OrderModel = require("./orders.model");
const { Types } = require("mongoose");
const mongoose = require("mongoose");

class OrderService {
    constructor() {}

    fetchOrdersByVendor = async (vendorId) => {
        return OrderModel.aggregate([
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
            },
            {
                $match: {
                    'productDetails.vendor': new mongoose.mongo.ObjectId(vendorId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customerDetails'
                }
            },
            {
                $unwind: '$customerDetails'
            }
        ]);
    }

    markOrderAsShipped = async (orderId) => {
        return OrderModel.findByIdAndUpdate(orderId, { isShipped: true }, { new: true });
    }

    markOrderAsDone = async (orderId) => {
        return OrderModel.findByIdAndUpdate(orderId, { isDone: true }, { new: true });
    }

    getOrderById = async (orderId) => {
        return OrderModel.findById(orderId);
    }

    deleteOrder = async (orderId) => {
        return OrderModel.findByIdAndDelete(orderId);
    }

    createOrder = async (orderDetails) => {
        return OrderModel.create(orderDetails);
    }

    createOrdersFromCart = async (cartItems, customerInfo, customerId) => {
        const orderPromises = cartItems.map(item => {
            return this.createOrder({
                productId: new mongoose.mongo.ObjectId(item.productDetails._id),
                quantity: item.count,
                customerId: new mongoose.mongo.ObjectId(customerId.toString()),
                deliveryAddress: customerInfo.address,
                contactNumber: customerInfo.phone,
                price: item.productDetails.price
            });
        });
        return Promise.all(orderPromises);
    }

    fetchOrdersByCustomer = async (customerId) => {
        return OrderModel.aggregate([
            {
                $match: { customerId: new mongoose.mongo.ObjectId(customerId) }
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

module.exports = new OrderService();
