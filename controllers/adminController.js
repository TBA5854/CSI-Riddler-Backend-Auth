const {User} = require("../models/User");
async function makeUserAdmin(req, res) {
    const username = req.query.username;
    const user = await User.findOneAndUpdate({ username }, { admin: true, adminedAt: new Date() });
    if (!user) {
        res.send("User Not Found");
        return;
    }
    else {
        res.send("Successfully Adminified");
        return;
    }
}
async function revokeAdmin(req, res) {
    const username = req.query.username;
    const user = await User.findOneAndUpdate({ username }, { admin: false, adminedAt: null });
    if (!user) {
        res.send("User Not Found");
        return;
    }
    else {
        res.send("Successfully DeAdminified");
        return;
    }
}

module.exports.makeUserAdmin = makeUserAdmin;
module.exports.revokeAdmin = revokeAdmin;