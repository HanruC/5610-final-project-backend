const express = require("express");
const { authenticateUser } = require("../middleware/auth");
const reviewController = require("./comments.controller");

const reviewRouter = express.Router();


reviewRouter.post("/review", authenticateUser, reviewController.postReview);

module.exports = reviewRouter;
