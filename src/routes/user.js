const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

// Get all the pending connection requests for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills");
        //}).populate("fromUserId", ["firstName", "lastName"]);

        res.json({message: "Data fetched successfully", data: connectionRequests});
    } catch(err) {
        res.status(400).send("ERROR: "+ err.message);
    }
});

module.exports = userRouter;