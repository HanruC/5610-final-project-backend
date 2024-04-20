const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UsersService = require("./users.service");
const path = require("path");

class UsersController {
    constructor() {
    }

    getPublicProfile = async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await UsersService.getPublicUser(userId);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    getProfile = async (req, res) => {
        try {
            const { user } = req;
            const profile = await UsersService.getUser(user.id);
            res.status(200).json(profile);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    updateProfile = async (req, res) => {
        try {
            const { user } = req;
            const { body } = req;
            const avatarFile = req.files?.avatar;
            if (avatarFile) {
                let filename = Date.now() + '.jpg';
                let mvPath = path.resolve(__dirname, '../public/images/' + filename);
                await new Promise((resolve, reject) => {
                    avatarFile.mv(mvPath, (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                })
                body.avatar = '/images/' + filename;
            } else {
                delete body.avatar;
            }
            await UsersService.updateUser(user.id, body);
            res.status(204).send("No Content");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    signUp = async (req, res) => {
        try {
            const { body } = req;
            const existingUser = await UsersService.findUser(body.email);

            // Verify if user already exists
            if (existingUser) {
                return res.status(409).send("User already exist. Please login.");
            }

            // Encrypt password and create new user
            body.password = await bcrypt.hash(body.password, 10);
            const createdUser = await UsersService.createUser(body);

            res.status(204).send("No Content");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            let user = await UsersService.findUser(email);
            // Validate user existence
            if (!user) {
                return res.status(400).send("Invalid Credentials");
            }

            // Validate password correctness
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({
                    email: user.email,
                    username: user.username,
                    id: user._id,
                    role: user.role
                }, process.env.JWT_SECRET_KEY);

                res.status(200).json({ token, role: user.role });
            } else {
                return res.status(400).send("Invalid Credentials");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
}

module.exports = new UsersController();
