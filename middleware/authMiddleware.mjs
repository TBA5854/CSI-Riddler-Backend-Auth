// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
export function authverify(req, res, next) {
    const incomimg_token = req.cookies;
    if (!incomimg_token) {
        res.send("Login First");
        // res.redirect("/signup");
        return;
    }
    if (!incomimg_token['X-Auth-Token']) {
        res.send("Login First");
        // res.redirect("/login");
        return;
    }
    jwt.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY, (err, _decodedtoken) => {
        if (err) {
            res.send("Login First");
            // res.redirect("/login");
            return;
        }
        else {
            next();
        }
    });
    return;
}

export async function isAdmin(req, res, next) {
    const incomimg_token = req.cookies;
    const decodedToken = jwt.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.user_id);
    if (user?.admin) {
        console.log(user);
        next();
    }
    else {
        res.send("Not Authorised");
    }
}
