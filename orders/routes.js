const express = require("express");
const OrderController = require("./orders.controller");
const { authenticateUser, authenticateSeller } = require("../middleware/auth");

const orderRouter = express.Router();


orderRouter.get("/", authenticateUser, OrderController.fetchBuyerOrders);
orderRouter.post("/", authenticateUser, OrderController.placeOrder);
orderRouter.post("/cart-items", authenticateUser, OrderController.placeOrdersForCartItems);
orderRouter.put("/ship/:orderId", authenticateSeller, OrderController.sendOrder);
orderRouter.delete("/:orderId", authenticateUser, OrderController.cancelOrder);
orderRouter.get("/seller/orders", authenticateSeller, OrderController.fetchSellerOrders);

module.exports = orderRouter;
