const express = require('express');

const { authenticateSeller, authenticateUser } = require("../middleware/auth");
const ProductController = require("./goods.controller");

const productRouter = express.Router();

productRouter.post("/", authenticateSeller, ProductController.createGoods);

productRouter.get("/", ProductController.getAllGoods);

productRouter.get("/search/:query", ProductController.searchGoods);

productRouter.get("/:id", ProductController.getGoodsDetail);

productRouter.put("/:id", authenticateSeller, ProductController.updateGoods);

productRouter.delete("/:id", authenticateSeller, ProductController.removeGoods);

productRouter.get("/seller/products", authenticateSeller, ProductController.getGoodsOfSeller);

productRouter.get('/vendor/:id', ProductController.getGoodsOfSeller);

module.exports = productRouter;
