const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            throw new Error("Token Missing");
        }
        const decode = jwt.verify(token, process.env.secret_key);
        req.userId = decode.id;
        next();
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = auth;