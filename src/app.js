//console.log("DevConnect - A platform where developers can connect and hangout.")

const express = require("express");

const app = express();
const port = 2000;

app.get("/user/:userId/:userName", (req, res) => {
    console.log(req.params);
    res.send({firstName: "Ajit", lastName: "Kumar"});
});

app.listen(port, () => {
    console.log(`The server is successfully started at port http://localhost:${port}`);
});