"use strict";


const bcrypt = require("bcrypt");
const uid = require("uniqid");

const hashRate = 10;

const Organization = require("./models/Organization.js");
const User = require("./models/User.js");

module.exports = function (app) {



app.get("/s/admin/users", (req, res) => {
    User.find({orgID: req.session.orgID}, (err, users) => {
        if (err) console.error(err);
        if (users.length === 0)
            res.json({error: "No users found in organization"});
        else {
            let userList = users.map(u => {
                return {
                    id: u.id,
                    name: `${u.lastName}, ${u.firstName}`,
                    username: u.username,
                    email: u.email
                }
            });
            res.json({
                info: `${users.length} users found in organization #${req.session.orgID}!`,
                userData: userList
            })
        }
    });
});

app.post("/s/admin/users/create", (req, res) => {
    let rb = req.body.data;
    let newUser = new User({
        _id: uid.time(),
        orgID: req.session.orgID,
        email: rb.email,
        username: rb.username,
        password: bcrypt.hashSync(rb.password, hashRate),
        firstName: rb.firstName,
        lastName: rb.lastName,
        data: { exist: "true" },
        settings: { exist: "true" }
    });

    // Save new owner to db
    newUser.save((err, data) => {
        if (err) return console.error(err);
        res.json({info: `A new user, ${newUser.firstName} ${newUser.lastName}, has been created successfully.`});
    });
});

app.delete("/s/admin/users/delete/", (req, res) => {
    Organization.findById(req.session.orgID, (err, org) => {
        if (err) console.error(err);
        if (org.adminList.includes(req.body.id)) 
            res.json({error: "Cannot delete admin user."});
        else {
            User.deleteOne({_id: req.body.id }, (err) => {
                if (err) console.error(err);
                User.find({orgID: req.session.orgID}, (err, users) => {
                    if (err) console.error(err);
                    let userList = users.map(u => {
                        return {
                            id: u.id,
                            name: `${u.lastName}, ${u.firstName}`,
                            username: u.username,
                            email: u.email
                        }
                    });
                    res.json({
                        info:  `Successfully deleted user with ID ${req.body.id}.`,
                        userData: userList
                    })
                });
            });
        }
    })
    
});


}