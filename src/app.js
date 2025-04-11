const express = require("express");

const app = express();
const port = 2000;

app.get("/getUserData", (req, res) => {
    // Logic of DB call to get user data

    throw new Error("Error!!!!!!!");
    res.send("Uesr Data Sent!");
});

app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong!!!");
    }
});

app.listen(port, () => {
    console.log(`The server is successfully started at port http://localhost:${port}`);
});