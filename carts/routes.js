const express = require("express");
const shoppingCartController = require("./carts.controller");
const { authenticateUser } = require("../middleware/auth");

const shoppingCartRouter = express.Router();

shoppingCartRouter.get("/items", authenticateUser, shoppingCartController.fetchCartItems);
shoppingCartRouter.post("/items", authenticateUser, shoppingCartController.addToCart);
shoppingCartRouter.put("/items/update", authenticateUser, shoppingCartController.updateCart);
shoppingCartRouter.put("/items/remove", authenticateUser, shoppingCartController.removeFromCart);

module.exports = shoppingCartRouter;
