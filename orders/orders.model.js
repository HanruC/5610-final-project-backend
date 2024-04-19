const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    isShipped: {
        type: Boolean,
        default: false
    },
    isDone: {
        type: Boolean,
        default: false
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    price: Number
}, {
    timestamps: true
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
