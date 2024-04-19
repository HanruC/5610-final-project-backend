const jwt = require("jsonwebtoken");

const environmentConfig = process.env;

const authenticateSeller = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).send("Authentication token is required");
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).send("Malformed authentication token");
    }
    const token = tokenParts[1];

    try {
        const authenticatedUser = jwt.verify(token, environmentConfig.JWT_SECRET_KEY);
        if (authenticatedUser.role !== 'seller') {
            return res.status(403).send("Access denied. User is not authorized as seller.");
        }
        req.user = authenticatedUser;
    } catch (error) {
        return res.status(401).send("Invalid authentication token");
    }

    next();
};

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).send("Authentication token is required");
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).send("Malformed authentication token");
    }
    const token = tokenParts[1];

    try {
        const user = jwt.verify(token, environmentConfig.JWT_SECRET_KEY);
        req.user = user;
    } catch (error) {
        return res.status(401).send("Invalid authentication token");
    }

    next();
};

module.exports = {
    authenticateSeller,
    authenticateUser
};
