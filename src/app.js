const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 2000;

app.use(express.json());

app.post("/signup", async (req, res) => {

    //console.log(req.body);

    // const userObj = {
    //     firstName: "Aniket",
    //     lastName: "Kumar",
    //     emailId: "aniketkumar@gmail.com",
    //     password: "Aniket@123",
    // };

    // Creating a new instance of the User model
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully!");
    } catch(err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

connectDB().then(() => {
    console.log("Database connected successfully!");

    app.listen(port, () => {
        console.log(`The server is successfully started at port http://localhost:${port}`);
    });

}).catch((err) => {
    console.log("Database connection error!!!");
});