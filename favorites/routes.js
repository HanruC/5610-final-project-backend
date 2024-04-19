const express = require('express');
const router = express.Router();
const FavoriteController = require('./favorites.controller');
const {authenticateUser} = require("../middleware/auth");


router.get('/', authenticateUser, FavoriteController.fetchUserFavorites);
router.post('/', authenticateUser, FavoriteController.addFavorite);


router.delete('/:productId', authenticateUser, FavoriteController.removeFavorite);


router.get('/:productId', authenticateUser, FavoriteController.isFavorite);

module.exports = router;
