"use strict";

const Organization = require("./models/Organization.js");
const User = require("./models/User.js");

module.exports = function (app) {

function getPositionUserData (id, positionRegister, users) {

    const userIDsOfThisPosition = positionRegister.filter(posRegUser => posRegUser[1] == id).map(posRegUser => posRegUser[0]);
    const userIDsWithNoPosition = positionRegister.filter(posRegUser => posRegUser[1] == null).map(posRegUser => posRegUser[0]);
    console.log(userIDsOfThisPosition);
    console.log(userIDsWithNoPosition);

    const usersOfThisPosition = userIDsOfThisPosition.map(userID => {
        const temp = users.find(user => user._id == userID);
        return {
            _id: temp._id,
            firstName: temp.firstName,
            lastName: temp.lastName,
            username: temp.username
        };
    });

    const usersWithNoPosition = userIDsWithNoPosition.map(userID => {
        const temp = users.find(user => user._id == userID);
        return {
            _id: temp._id,
            firstName: temp.firstName,
            lastName: temp.lastName,
            username: temp.username
        };
    });

    return { usersOfThisPosition, usersWithNoPosition };
}






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

        if (!org.data.hasOwnProperty("positionRegister")) {
            User.find({orgID: req.session.orgID}, (err, users) => {
                if (err) console.error(err);
                if (users.length == 0) {
                    org.data.positionRegister = [];
                }
                else {
                    org.data.positionRegister = users.map(user => [user._id, null]);
                }
                org.markModified('data');
                org.save((err) => {
                    if (err) console.error(err);
                });
            });
        }
        else {
            User.find({orgID: req.session.orgID}, (err, users) => {
                if (err) console.error(err);
                
                users.forEach(user => {
                    if (org.data.positionRegister.findIndex(posRegUser => posRegUser[0] == user._id) == -1) {
                        org.data.positionRegister.push([user._id, null]);
                    }
                })
                org.data.positionRegister = org.data.positionRegister.filter(posRegUser => users.findIndex(user => user._id == posRegUser[0]) != -1);

                org.markModified('data');
                org.save((err) => {
                    if (err) console.error(err);
                });
            });
        }
        res.json(org.data.positions);
    });
});

app.get("/s/admin/positions/:posID", (req, res) => {
    let id = parseInt(req.params.posID);

    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        const positionIndex = org.data.positions.findIndex(pos => pos.id == id);

        User.find({orgID: req.session.orgID}, (err, users) => {
            if (err) console.error(err);

            let positionUserData = getPositionUserData(id, org.data.positionRegister, users);

            res.json({
                position: org.data.positions[positionIndex],
                users: positionUserData.usersOfThisPosition,
                usersNA: positionUserData.usersWithNoPosition
            });
        });
    });
});

app.post("/s/admin/positions/:posID/assign", (req, res) => {
    const userID = req.body.id;
    const positionID = parseInt(req.params.posID);
    const alreadyAssigned = req.body.alreadyAssigned;

    console.log(userID);
    console.log(`Is already assigned? ${alreadyAssigned}`);
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);

        User.find({orgID: req.session.orgID}, (err, users) => {
            if (err) console.error(err);

            const userIndex = org.data.positionRegister.findIndex(posRegUser => posRegUser[0] == userID);
            console.log(userIndex);
            org.data.positionRegister[userIndex][1] = alreadyAssigned ? null : positionID;
            org.markModified('data');
            org.save((err) => {
                if (err) console.error(err);
                let positionUserData = getPositionUserData(positionID, org.data.positionRegister, users);
                res.json({
                    users: positionUserData.usersOfThisPosition,
                    usersNA: positionUserData.usersWithNoPosition
                });
            });
        });
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

        org.data.positionRegister.forEach(user => {
            if (user[1] == id) user[1] = null;
        });

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