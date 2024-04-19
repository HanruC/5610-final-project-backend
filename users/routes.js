const express = require('express');
const UsersController = require("./users.controller");
const {authenticateUser} = require("../middleware/auth");

const router = express.Router();

router.post("/signup", UsersController.signUp);
router.post("/signin", UsersController.signIn);
router.get('/profile', authenticateUser, UsersController.getProfile);
router.get('/profile/:userId', UsersController.getPublicProfile);
router.put('/profile', authenticateUser, UsersController.updateProfile);

module.exports = router;
