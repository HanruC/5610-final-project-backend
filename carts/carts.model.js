const mongoose = require("mongoose");

const ShoppingCartSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true,
        min: 1
    }
}, {
    timestamps: true
});

const ShoppingCartModel = mongoose.model("ShoppingCart", ShoppingCartSchema);

module.exports = ShoppingCartModel;
