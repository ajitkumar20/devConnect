const express = require("express");

const app = express();
const port = 2000;

const {adminAuth, userAuth} = require("./middlewares/auth");

// Handling Auth middleware for all GET, POST, DELETE... (/admin) requets
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully");
});

app.get("/user", userAuth, (req, res) => {
    res.send("Uesr Data Sent!");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data Sent Successfully!");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted Successfully!");
});

app.listen(port, () => {
    console.log(`The server is successfully started at port http://localhost:${port}`);
});