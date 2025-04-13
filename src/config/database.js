const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ajsingh56:kpLp8cL8crUV5jRR@ajscluster0.p0qvzf9.mongodb.net/devConnect");
};

module.exports = connectDB;