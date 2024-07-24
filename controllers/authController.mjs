import User from "../models/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

export async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }).exec();
    console.log(user);
    if (!user) {
        res.status(404).send("User Doesn't Exists");
        return;
    }
    const loggingUser = await bcrypt.compare(password, user.password);
    if (!loggingUser) {
        res.status(401).send("Incorrect Password");
        return;
    }
    console.log(loggingUser);
    const user_id = user._id;
    const token = jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: '180d' });
    res.cookie('X-Auth-Token', token, { maxAge: 86400000 });
    res.send({ token, user_id });
}
export function logout(_req, res) {
    res.cookie('X-Auth-Token', '', { maxAge: 1 });
    res.send("Logout Successful");
}
export async function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const description = req.body.description;
    const admin = (req.body.admin) ? true : false;
    const adminedAt = (admin) ? new Date() : null;
    const createdAt = new Date();
    const updatedAt = new Date();
    console.log(req.body);
    if (await User.exists({ email })) {
        res.status(400).send("User Already Exists");
    }
    else {
        try {
            const usr = await User.create({
                username,
                password,
                email,
                description,
                createdAt,
                updatedAt,
                admin,
                adminedAt
            });
            const user_id = usr._id;
            const token = jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: '180d' });
            res.cookie('X-Auth-Token', token, { maxAge: 86400000 });
            res.status(201).json({ token, usr });
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
}
