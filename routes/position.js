"use strict";

const Organization = require("./models/Organization.js");
const User = require("./models/User.js");

module.exports = function (app) {





app.post("/s/admin/addPos", (req, res) => {
    let rb = req.body;
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        if (!org.data.hasOwnProperty("positions"))
            org.data.positions = [];
        
        if (org.data.positions.filter((pos) => pos.id === rb.id).length > 0) {
            console.log("Cannot create two positions with the same ID's");
            res.json({error: "Cannot create two positions with the same ID's"});
        }   
        else {
            org.data.positions.push({
                id: rb.id,
                title: rb.title,
                color: rb.color,
                manager: rb.manager,
                users: []
            });
    
            org.markModified('data');
            org.save((err, data) => {
                if (err) console.error(err);
                console.log(org.data);
            });
        }
    });
});

app.post("/s/admin/getPos", (req, res) => {
    let rb = req.body;

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        res.json(org.data.positions);
    });
});















}