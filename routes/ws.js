"use strict";

const uid = require("uniqid");
const { DateTime } = require("luxon");

const FunnelUser = require("./models/FunnelUser.js");
const Partial = require("./models/Partial.js");

module.exports = function (app) {

app.get("/ws", (req, res) => {
    res.json({"message": "willstyle entry complete"});
});

app.get("/ws/st", (req, res) => {
    FunnelUser.find({}, (err, users) => {
        if (err) console.error(err);
        
        let stData = {
            a: {
                total: 0,
                wentToCheckout: 0,
                stress1: 0,
                stress3: 0,
                stress6: 0
            },
            b: {
                total: 0,
                wentToCheckout: 0,
                stress1: 0,
                stress3: 0,
                stress6: 0
            },
            corruptUsers: 0
        }

        users.forEach(u =>{

            if (u.data.splitVersion != "a" && u.data.splitVersion != "b") {
                stData.corruptUsers++;
                return;
            }
            else {
                stData[u.data.splitVersion].total = stData[u.data.splitVersion].total + 1;
                if (u.data.wentToCheckout) { 
                    stData[u.data.splitVersion].wentToCheckout = stData[u.data.splitVersion].wentToCheckout + 1;
                    stData[u.data.splitVersion][u.data.checkoutOption] = stData[u.data.splitVersion][u.data.checkoutOption] + 1;
                }
            }
        });

        res.json(stData);
    });
});

app.post("/ws/users/create", (req, res) => {
    let rb = req.body;
    FunnelUser.findById(rb.sessionID, (err, user) => {
        if (err) console.error(err);
        if (!user) {
            let newUser = new FunnelUser({
                _id: rb.sessionID,
                dc: DateTime.now().toLocaleString(),
                source: rb.source,
                email: "unknown",
                data: { allCookieData: rb.cookieData, splitVersion: rb.splitVersion, wentToCheckout: false, checkoutOption: "none"}
            });
        
            // Save new user to db
            newUser.save((err, data) => {
                if (err) return console.error(err);
                res.json({info: `A new user, ${newUser._id}, has been created successfully.`});
            });
        }
        else {
            res.json({ "info": "User has already been created" });
        }
    })
});

app.post("/ws/users/checkout", (req, res) => {
    let rb = req.body;
    FunnelUser.findById(rb.sessionID, (err, user) => {
        if (err) console.error(err);
        if (user) {
            user.data.wentToCheckout = true;
            user.data.checkoutOption = rb.checkoutOption;
        
            // Save checkout event
            user.markModified('data');
            user.save((err, data) => {
                if (err) return console.error(err);
                res.json({info: `User ${user._id}, went to checkout.`});
            });
        }
        else {
            res.json({ "info": "User not found." });
        }
    })
});

app.post("/ws/partials/create", (req, res) => {
    let rb = req.body;
    Partial.findById(rb.sessionID, (err, partial) => {
        if (err) console.error(err);
        if (!partial) {
            let newPartial = new Partial({
                fn: rb.type == "fn" ? rb.args : "unknown",
                ln: rb.type == "ln" ? rb.args : "unknown",
                em: rb.type == "em" ? rb.args : "unknown"
            });
        
            // Save new partial to db
            newPartial.save((err, data) => {
                if (err) return console.error(err);
                res.json({ "info": `A new partial has been created successfully.`, id: newPartial._id });
            });
        }
        else {
            res.json({ "info": "Partial has already been created" });
        }
    })
});

app.post("/ws/partials/modify", (req, res) => {
    let rb = req.body;
    Partial.findById(rb.sessionID, (err, partial) => {
        if (err) console.error(err);
        if (partial) {
            partial[rb.type] = rb.args;
        
            // Save partial modification event
            partial.save((err, data) => {
                if (err) return console.error(err);
                res.json({ "info": `Partial ${partial._id}, has been modified.`});
            });
        }
        else {
            res.json({ "info": "Partial not found." });
        }
    })
});

}