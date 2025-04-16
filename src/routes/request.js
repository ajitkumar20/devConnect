const express = require("express");
const {userAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

//Sending a connection request after logging
requestRouter.post("/sendConnectionRequest",userAuth, async (req, res) => {
    const user = req.user;
    // Logic of sending a connection request
    console.log("Seending a connection request...");

    res.send(user.firstName+" sent you connection request");
});

module.exports = requestRouter;