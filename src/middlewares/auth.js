// Handling Auth middleware for all GET, POST, DELETE... requests
const adminAuth = (req, res, next) => {
    // Logic of checking if the request is authorized
    console.log("Admin auth is getting checked...");
    const token = "xyz";
    const isAdminAuthorized = "xyz" === token;
    if(!isAdminAuthorized){
        res.status(404).send("Unauthorized Admin Access!!!");
    }else {
        next();
    }
};

const userAuth = (req, res, next) => {
    // Logic of checking if the request is authorized
    console.log("User auth is getting checked...");
    const token = "xyza";
    const isUserAuthorized = "xyz" === token;
    if(!isUserAuthorized){
        res.status(404).send("Unauthorized User Access!!!");
    }else {
        next();
    }
};

module.exports = {
    adminAuth,
    userAuth,
};