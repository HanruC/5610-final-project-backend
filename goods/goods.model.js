const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
   name: String,
   price: {
      type: Number,
      required: true,
      min: 0
   },
   description: String,
   imageUrls: [String],
   totalSales: {
      type: Number,
      default: 0
   },
   vendor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
