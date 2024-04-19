const FavoriteService = require('./favorites.service');

class FavoriteController {
    constructor() {
        this.favoriteService = FavoriteService;
    }

    fetchUserFavorites = async (req, res) => {
        try {
            const userId = req.user.id;
            const favorites = await this.favoriteService.fetchUserFavorites(userId);
            res.json(favorites);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    addFavorite = async (req, res) => {
        try {
            const userId = req.user.id;
            const productId = req.body.productId;
            const favorite = await this.favoriteService.addFavorite(userId, productId);
            res.json(favorite);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    removeFavorite = async (req, res) => {
        try {
            const userId = req.user.id;
            const productId = req.params.productId;
            const favorite = await this.favoriteService.removeFavorite(userId, productId);
            res.json(favorite);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    isFavorite = async (req, res) => {
        try {
            const userId = req.user.id;
            const productId = req.params.productId;
            console.log(userId, productId)
            const isFavorite = await this.favoriteService.isFavorite(userId, productId);
            res.json({ isFavorite });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FavoriteController();
