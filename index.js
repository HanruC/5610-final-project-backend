require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })



