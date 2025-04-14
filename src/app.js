const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 2000;

app.use(express.json());

// Create a new user
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

// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(404).send("User not found!!!");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// Delete a user by ID
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete({_id: userId});
        //const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully:");
    } catch (err) {
        res.status(400).send("Something went wrong!");
    }
});

// Update a user by ID
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const user = await User.findByIdAndUpdate({_id: userId}, data);
        res.send("User updated successfully!")
    } catch (err) {
        res.status(400).send("Something went wrong!");
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