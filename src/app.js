//console.log("DevConnect - A platform where developers can connect and hangout.")

const express = require("express");

const app = express();

// This will only handle GET call to /user only.
app.get("/user", (req, res) => {
    res.send({firstName: "Ajit", lastName: "Kumar"});
});

app.post("/user", (req, res) => {
    //logic for saving data to database
    res.send("Data successfully saved to database.");
});

app.delete("/user", (req, res) => {
    res.send("Data deleted successfully.");
});

// This will match all the HTTP method API calls to /test.
app.use("/test",(req, res) => {
    res.send("Hello from the server!");
});

app.listen(2000, () => {
    console.log("The server is successfully started at port 2000");
});