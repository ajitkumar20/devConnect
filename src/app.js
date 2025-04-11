//console.log("DevConnect - A platform where developers can connect and hangout.")

const express = require("express");

const app = express();
const port = 2000;

//app.use("/route", rH1, [rH2, rH3], rH4, rH5); - you can group with it array also and it worked the same

app.get("/user", (req, res, next) => {
    console.log("Handling the route user 1!");
    //res.send("1st Response");
    next();
}, (req, res, next) => {
    console.log("Handling the route user 2!");
    //res.send("2nd Response");
    next();
}, (req, res, next) => {
    console.log("Handling the route user 3!");
    //res.send("3rd Response");
    next();
}, (req, res, next) => {
    console.log("Handling the route user 4!");
    //res.send("4th Response");
    next();
}, (req, res, next) => {
    console.log("Handling the route user 5!");
    res.send("5th Response");
});

app.listen(port, () => {
    console.log(`The server is successfully started at port http://localhost:${port}`);
});