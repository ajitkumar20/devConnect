//console.log("DevConnect - A platform where developers can connect and hangout.")

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Namaste from the dashboard!");
});

app.get("/hello", (req, res) => {
    res.send("Hello! Hello! Hello!");
});

app.get("/test",(req, res) => {
    res.send("Hello from the server!");
});

app.listen(2000, () => {
    console.log("The server is successfully started at port 2000");
});