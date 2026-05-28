const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAccount = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.send("User already exists");
        }

        const hashpassword = await bcrypt.hash(password,10);

        const userdata = await User.create({
            name,
            email,
            password:hashpassword

        })

        res.json({
            message:"Account Created",
            userdata
        })

    } catch (e) {
        res.send(e.message);
    }
}

const login = async (req,res) => {

    try {
        const {email,password} = req.body;
        const userdata = await User.findOne({email});
        if(!userdata){
            throw new Error("User Not Found");
        }
        const comparePassword = await bcrypt.compare(
            password,
            userdata.password
        );
        if(!comparePassword){
            throw new Error("Password Incorrect");
        }
        const token = jwt.sign(
            {id:userdata._id},
            process.env.secret_key,
            {expiresIn:"10h"}
        )
        res.json({
            message:"Login Success",
            token
        })

    } catch (e) {
        res.send(e.message);
    }
}

const logout = async (req,res) => {
    try {
        res.json({
            message:"Logout Success"
        })
    } catch (e) {
        res.send(e.message);
    }
}

module.exports = {createAccount,login,logout}