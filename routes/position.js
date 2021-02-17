"use strict";

const Organization = require("./models/Organization.js");
const User = require("./models/User.js");

module.exports = function (app) {



app.get("/s/admin/positions", (req, res) => {

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        if (!org.data.hasOwnProperty("positions")) {
            org.data.positions = [];
            org.markModified('data');
            org.save((err) => {
                if (err) console.error(err);
            });
        }
        res.json(org.data.positions);
    });
});

app.post("/s/admin/positions/add", (req, res) => {
    let rb = req.body;
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        console.log(org);
        if (!org.data.hasOwnProperty("positions"))
            org.data.positions = [];
        
        if (org.data.positions.filter((pos) => pos.id == rb.id).length > 0) {
            res.json({error: "Cannot create two positions with the same ID's"});
        }
        else if(rb.id <= 0) {
            res.json({error: "Cannot create position with ID less than 1!"});
        }
        else {
            org.data.positions.push({
                id: parseInt(rb.id),
                title: rb.title,
                color: rb.color,
                users: []
            });
    
            org.markModified('data');
            org.save((err, data) => {
                if (err) console.error(err);
                res.json({info: `A new position has been created successfully.`});
            });
        }
    });
});

app.delete("/s/admin/positions/delete/", (req, res) => {
    let id = parseInt(req.body.id);
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        const i = org.data.positions.map((pos) => pos.id).indexOf(id);
        if (i === -1) {
            res.json({ error: `Cannot find position with ID ${id}.`});
        }

        for(let i = 0; i < org.data.departments.length; i++) {
            if (org.data.departments[i].manager.id == id) {
                org.data.departments[i].manager = null;
            }
            for (let j = 0; j < org.data.departments[i].positions.length; j++) {
                if (org.data.departments[i].positions[j].id == id)
                    org.data.departments[i].positions.splice(j, 1);
            }
        }

        org.data.positions.splice(i, 1);

        org.markModified('data');
        org.save((err, data) => {
            if (err) console.error(err);
            res.json({ 
                info: `Successfully deleted position with ID ${id}.`,
                positionData: org.data.positions
            });
        });
    })
});

app.get("/s/admin/positions/:posID", (req, res) => {
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        
    });
})













}