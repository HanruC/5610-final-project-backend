const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const UsersRoutes = require("./users/routes");
const GoodsRoutes = require("./goods/routes");
const OrdersRoutes = require("./orders/routes");
const CartsRoutes = require("./carts/routes");
const CommentsRoutes = require("./comments/routes");
const FavoritesRoutes = require("./favorites/routes");


const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(express.static("client"));


app.use("/api/users", UsersRoutes);
app.use("/api/goods", GoodsRoutes);
app.use("/api/orders", OrdersRoutes);
app.use("/api/favorites", FavoritesRoutes);
app.use("/api/cart", CartsRoutes);
app.use("/api/comments", CommentsRoutes);

app.use(function (req, res) {
    res.sendFile(path.resolve(__dirname, './client/index.html'));
})

module.exports = app;
