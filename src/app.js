const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();
const port = 2000;

app.use(express.json());

// Create a new user (SignUp)
app.post("/signup", async (req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        // Creating a new instance of the User model
        const user = new User({firstName, lastName, emailId, password: passwordHash});

        await user.save();
        res.send("User added successfully!");
    } catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

// Login the user after registering
app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        // Check email is valid or not
        if(!validator.isEmail(emailId)){
            throw new Error("Email is not valid");
        }

        // Check email is present in DB or not
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials!");
        }

        // Check password is valid or not
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login Successful!");
        } else {
            throw new Error("Invalid credentials!");
        }

    } catch(err) {
        res.status(400).send("ERROR: "+ err.message);
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
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

       const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

       if(!isUpdateAllowed){
        throw new Error("Update not allowed!");
       }

       if(data?.skills.length > 15){
        throw new Error("Skills cannot be more than 15");
       }

        const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after", runValidators: true});
        //console.log(user) - return the document after/before changes made
        res.send("User updated successfully!")
    } catch (err) {
        res.status(400).send("Something went wrong: "+ err.message);
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