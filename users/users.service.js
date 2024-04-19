const UsersModel = require("./users.model");
const GoodsService = require("../goods/goods.service");
const FavoriteService = require("../favorites/favorites.service");
class UsersService {
    constructor() {
    }

    createUser = async (user) => {
        return UsersModel.create(user);
    }

    findUser = async (email) => {
        return UsersModel.findOne({ email });
    }

    getUser = async (userId) => {
        return UsersModel.findById(userId);
    }

    updateUser = async (userId, userDetails) => {
        return UsersModel.findByIdAndUpdate(userId, userDetails, { new: true })
    }

    getPublicUser = async (userId) => {
        const user = await UsersModel.findById(userId, { password: 0, email: 0 }).lean();
        if (user.role === 'seller') {
            const products = await GoodsService.getProductOfVendor(user._id);
            user.products = products;
        }
        if (user.shareFavorites) {
            const favorites = await FavoriteService.fetchUserFavorites(userId);
            user.favorites = favorites;
        }
        return user;
    }
}

module.exports = new UsersService();
