const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../models/User");

function authverify(req, res, next) {
    const incomimg_token = req.cookies;
    if (!incomimg_token) {
        res.send("Login First");
        return;
    }
    if (!incomimg_token['X-Auth-Token']) {
        res.send("Login First");
        return;
    }
    jsonwebtoken.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY, (err, _decodedtoken) => {
        if (err) {
            res.send("Login First");
            return;
        }
        else {
            next();
        }
    });
    return;
}

async function isAdmin(req, res, next) {
    const incomimg_token = req.cookies;
    const decodedToken = jsonwebtoken.verify(incomimg_token['X-Auth-Token'], process.env.SECRET_KEY);
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

module.exports.authverify = authverify;
module.exports.isAdmin = isAdmin;