const reviewService = require("./comments.service");
const orderService = require("../orders/orders.service");
class ReviewController {
    constructor() {}

    postReview = async (req, res) => {
        try {
            const reviewer = req.user;
            const { productId, text, rating, orderId } = req.body;
            await orderService.markOrderAsDone(orderId);
            await reviewService.addReview({
                productId,
                text,
                rating,
                customerId: reviewer.id
            });
            res.status(200).json({
                message: 'Review successfully added'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error posting review');
        }
    }
}

module.exports = new ReviewController();
