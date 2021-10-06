"use strict";

const uid = require("uniqid");
const { DateTime } = require("luxon");

const FunnelUser = require("./models/FunnelUser.js");

module.exports = function (app) {

app.get("/ws", (req, res) => {
    res.json({"message": "willstyle entry complete"});
});

app.get("/ws/users", (req, res) => {
    FunnelUser.find({}, (err, users) => {
        if (err) console.error(err);
        if (users.length === 0)
            res.json({error: "No users found."});
        else {
            let userList = users.map(u => {
                return {
                    id: u._id,
                    dc: u.dc,
                    source: u.source,
                    email: u.email,
                    data: u.data
                }
            });
            res.json({
                info: `${users.length} users found in site #${req.session.orgID}!`,
                userData: userList
            })
        }
    });
});

app.post("/ws/users/create", (req, res) => {
    let rb = req.body.data;
    let newUser = new FunnelUser({
        _id: req.body.sessionID,
        dc: DateTime.fromISO(date).toLocaleString(),
        source: req.body.source,
        email: "",
        data: { allCookieData: req.body.cookieDump }
    });

    // Save new owner to db
    newUser.save((err, data) => {
        if (err) return console.error(err);
        res.json({info: `A new user, ${newUser._id}, has been created successfully.`});
    });
});


}